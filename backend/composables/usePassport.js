import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

import env from '../config/env.js';
import GithubIntegrationService from '../services/githubIntegration.service.js';

export default function () {
    const init = () => {
        passport.initialize();
        passport.session();

        passport.use(new GitHubStrategy({
            clientID: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
            callbackURL: `${env.APP_URL}/auth/github/callback`
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const { storeIntegration } = GithubIntegrationService();

                const user = await storeIntegration(profile, accessToken);

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }));

        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((obj, done) => done(null, obj));
    }

    return { init }
};