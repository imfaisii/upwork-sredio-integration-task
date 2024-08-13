import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

import env from '../config/env.js';
import GitHubIntegration from '../models/githubintegration.model.js';

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
                const { id, username, displayName } = profile;
                const user = await GitHubIntegration.findOneAndUpdate(
                    { githubId: id },
                    {
                        username,
                        accessToken,
                        displayName,
                        profileUrl: profile.profileUrl,
                    },
                    { new: true, upsert: true }
                );
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