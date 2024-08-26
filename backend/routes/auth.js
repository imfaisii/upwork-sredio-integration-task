import express from 'express';
import passport from 'passport';

const router = express.Router();

const providers = [{ name: 'github', scope: ['repo', 'admin:repo_hook', 'admin:org', 'user'] }]

providers.map((p) => {
    router.get(`/${p.name}`, passport.authenticate(p.name, { scope: p.scope }));

    router.get(`/${p.name}/callback`,
        passport.authenticate(`${p.name}`, { failureRedirect: '/' }),
        (req, res) => res.redirect(`${process.env.FRONTEND_APP_URL}/#/admin-settings`)
    );
})

export default router;
