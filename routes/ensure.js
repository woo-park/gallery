module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) { //passport is giving all these stuff, i.e. isAuthenticated
            next();

        }
        // req.flash('error','Please log in to view this resource');
        else {
          res.redirect('/login');
        }
    }   //any route that needs to be protected, we can just add this module
}
