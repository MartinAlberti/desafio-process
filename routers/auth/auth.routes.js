const express = require('express');
const passport = require('../../middlewares/passport');
const router = express.Router();
const path = require('path')

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/loginError', successRedirect: '/home' }));
router.post('/register', passport.authenticate('signup', { failureRedirect: '/signupError', successRedirect: '/home' }));

router.post('/logout', async (req, res) => {
    const user = req.user
    if (user.email) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), 'Public/views/pages/logout.ejs'), { email: user.email })

            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
});

router.get('/logout', async (req, res) => {
    res.redirect('/')
});


module.exports = router;