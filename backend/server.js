import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';

import AuthRoutes from "./routes/auth.js";
import IntegrationRoutes from "./routes/integration.js";
import GithubRoutes from "./routes/github.js";

import useDBClient from './composables/useDBClient.js';
import usePassport from './composables/usePassport.js';

import env from './config/env.js';
import { PORT } from './constants/global.js';

const app = express();

// middleware(s)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true
}));

// passport
const { init: passportInit } = usePassport();
passportInit();

// mongodb connection
const { init: dbInit } = useDBClient();
dbInit();

// routes
app.use('/auth', AuthRoutes);
app.use('/api/integrations', IntegrationRoutes);
app.use('/api/integrations/github', GithubRoutes);

app.listen(PORT, () => {
    console.log(`Listening:: http://localhost:${PORT} 🚀`);
});
