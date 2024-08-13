import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => res.redirect(process.env.FRONTEND_APP_URL)
);

export default router;
