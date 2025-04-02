var express = require('express');
var router = express.Router();
var admincontroller = require('../controllers/adminController');




router.get('/',isAuthenticated, admincontroller.admin);





function isAuthenticated(req, res, next) {
    if (req.cookies.username) {
        console.log(req.cookies.username);
        //console.log(req.cookies.)
        next(); // Jeśli ciasteczko istnieje, kontynuujemy
    } else {
        res.status(401).send('Nie jesteś zalogowany!');
    }
}




module.exports = router;