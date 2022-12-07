let webAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/home')
    }
}

let homeAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    } else {
        next()
    }
}

let apiAuth = (req, res, next) => {
    if (req.session?.user) {
        next()
    } else {
        res.status(401).json({ error: 'no autorizado!' })
    }
}

module.exports = {
    webAuth,
    apiAuth,
    homeAuth
}