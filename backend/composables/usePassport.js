import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import env from '../config/env.js';

export default function () {
    const init = () => {
        passport.initialize();
        passport.session();

        passport.use(new GitHubStrategy({
            clientID: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
            callbackURL: `${env.APP_URL}/auth/github/callback`
        }, async (accessToken, refreshToken, profile, done) => {
           console.log({accessToken, profile});
        }));

        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((obj, done) => done(null, obj));
    }

    return { init }
};