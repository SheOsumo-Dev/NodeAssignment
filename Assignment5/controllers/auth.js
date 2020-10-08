exports.getLogin = (req,res,next) =>{
    // const isLoggedIn = req
    // .get('Cookie')
    // .split('=')[1];
        res.render('./auth/login',{
        path: '/login',
        title: 'Login',
        isAuthenticated: req.session.isLoggedIn,
        userEmail: req.session.userEmail,
        userPassword: req.session.userPassword
    });
};

exports.postLogin = (req,res,next) =>{
    
    //res.setHeader('Set-Cookie','loggedIn = true');
    req.session.userEmail = req.body.email;
    req.session.userPassword = req.body.password;
    req.session.isLoggedIn = true;
    res.redirect('/');
};