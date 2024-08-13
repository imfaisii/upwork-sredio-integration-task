import express from 'express';
import cors from 'cors';
import session from 'express-session';

import AuthRoutes from "./routes/auth.js";
import IntegrationRoutes from "./routes/integrations.js";

import useDBClient from './composables/useDBClient.js';
import usePassport from './composables/usePassport.js';

import env from './config/env.js';
import { PORT } from './constants/global.js';

const app = express();

// middleware(s)
app.use(cors());
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
app.use('/auth', AuthRoutes)
app.use('/integrations', IntegrationRoutes)

app.listen(PORT, () => {
    console.log(`Listening:: http://localhost:${PORT} 🚀`);
});
