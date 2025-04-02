const express = require('express');
const router = express.Router();

const gameController = require('../controllers/wydawnictwoController');



// router.get("/",(req,res)=>{
//     res.send("Welcome");
// })

router.get('/', gameController.getAllWydawnictwo);
//router.get('/new', gameController.getAddGameForm);
router.post('/',isAuthenticated,gameController.addGame)
router.get('/addform',isAuthenticated, gameController.getAddwydawnictwoForm);
router.get('/updateform/:id',isAuthenticated, gameController.getUpdateform);
router.get('/:id', gameController.getWydawnictwoDetails);
router.post('/:id',isAuthenticated,gameController.deletewydawnictwo);

router.post('/update/:id',isAuthenticated,gameController.updatewydawnictwo);
router.get('/admin', gameController.getGameDetails);
router.post('/search',gameController.getGamesBySort);
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