const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const fetch = require('node-fetch');

class OAuth2Login {
    constructor() {
        // Inicialização do Express
        this.app = express();

        // Conexão com o MongoDB
        mongoose.connect('mongodb://localhost:27017/seu_banco_de_dados', { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = mongoose.connection;

        // Definição do modelo do usuário
        this.User = mongoose.model('User', {
            username: String,
            oauthId: String,
            oauthProvider: String
        });

        // Configuração de sessão
        this.app.use(session({
            secret: 'sua_chave_secreta',
            resave: true,
            saveUninitialized: true
        }));

        // Rota de login
        this.app.get('/auth/login', this.login.bind(this));

        // Rota de callback após a autenticação
        this.app.get('/auth/callback', this.callback.bind(this));

        // Rota protegida
        this.app.get('/', this.protectedRoute.bind(this));
    }

    async login(req, res) {
        // URL do provedor de login
        const authURL = 'URL_de_Autorização_do_Provedor';

        // Redireciona o usuário para a página de autenticação do provedor OAuth2
        res.redirect(authURL);
    }

    async callback(req, res) {
        // Recupera o código de autorização do query string
        const code = req.query.code;

        // Troca o código de autorização por um token de acesso
        const tokenURL = 'URL_do_Token_do_Provedor';
        const tokenParams = {
            client_id: 'Seu_Client_ID',
            client_secret: 'Seu_Client_Secret',
            code: code,
            redirect_uri: 'http://localhost:3000/auth/callback',
            grant_type: 'authorization_code'
        };

        // Faz uma requisição para obter o token de acesso
        const tokenResponse = await fetch(tokenURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(tokenParams)
        });

        // Extrai o token de acesso da resposta
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Use o token de acesso para recuperar informações do usuário
        const userInfoURL = 'URL_para_Obtener_Informações_do_Usuário';
        const userInfoResponse = await fetch(userInfoURL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Extrai as informações do usuário da resposta
        const userInfo = await userInfoResponse.json();

        // Verifica se o usuário já está registrado no banco de dados
        let user = await this.User.findOne({ oauthId: userInfo.id });
        if (!user) {
            // Se o usuário não existir, cria um novo registro no banco de dados
            user = await this.User.create({
                username: userInfo.username,
                oauthId: userInfo.id,
                oauthProvider: 'OAuth2' // Personalize conforme necessário
            });
        }

        // Salva o usuário na sessão
        req.session.user = user;

        // Redireciona para a página principal após o login bem-sucedido
        res.redirect('/');
    }

    async protectedRoute(req, res) {
        // Verifica se o usuário está autenticado
        if (req.session.user) {
            res.send(`Olá, ${req.session.user.username}! Você está logado.`);
        } else {
            res.send('Você não está autenticado.');
        }
    }

    startServer(port = 3000) {
        this.app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    }
}

// Inicia o servidor
const oauth2Login = new OAuth2Login();
oauth2Login.startServer();