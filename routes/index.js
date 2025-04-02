var express = require('express');
var router = express.Router();
var webcontroller = require('../controllers/webController');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

var passport = require('passport');
var LocalStrategy = require('passport-local');


router.get('/', webcontroller.index);
router.get('/logowanie', webcontroller.login);
router.get('/powstanie', webcontroller.powstanie);
router.post('/auth',webcontroller.loginin );
router.get('/rejestracja',webcontroller.rejestracja );
router.post('/rejestr',webcontroller.rejestr);
//router.get('/admin',isAuthenticated, webcontroller.admin);
router.get('/blad', webcontroller.blad);



module.exports = router;

function isAuthenticated(req, res, next) {
    if (req.cookies.username) {
        console.log(req.cookies.username);
        //console.log(req.cookies.)
        next(); // Jeśli ciasteczko istnieje, kontynuujemy
    } else {
        res.status(401).send('Nie jesteś zalogowany!');
    }
}