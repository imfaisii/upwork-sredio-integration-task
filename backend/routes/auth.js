import express from 'express';
import passport from 'passport';

const router = express.Router();

const providers = [{ name: 'github', scope: ['user:email'] }]

providers.map((p) => {
    router.get(`/${p.name}`, passport.authenticate(p.name, { scope: p.scope }));

    router.get(`/${p.name}/callback`,
        passport.authenticate(`${p.name}`, { failureRedirect: '/' }),
        (req, res) => res.redirect(process.env.FRONTEND_APP_URL)
    );
})

export default router;
