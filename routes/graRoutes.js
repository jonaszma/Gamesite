const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');



// router.get("/",(req,res)=>{
//     res.send("Welcome");
// })

router.get('/', gameController.getAllGames);
//router.get('/new', gameController.getAddGameForm);
router.post('/add',isAuthenticated, gameController.addGame);
router.get('/wydawnictwa/delete/:id',isAuthenticated,gameController.deleteGryWydawnictwo)
router.post('/search',gameController.getGamesBySort);
router.get('/updateform/:id',isAuthenticated, gameController.getUpdateform);
router.get('/wydawnictwa/:id',isAuthenticated, gameController.getWydawnictwaForm);
router.post('/wydawnictwa/:id',isAuthenticated, gameController.addWydawnictwa);
router.get('/:id', gameController.getGameDetails);
//router.post('/:id', gameController.getAllGames);
router.post('/:id',isAuthenticated, gameController.deleteGame);
router.post('/update/:id',isAuthenticated, gameController.updateGame);

router.get('/admin', gameController.getGameDetails);

module.exports = router;


function isAuthenticated(req, res, next) {
    if (req.cookies.username) {
        console.log(req.cookies.username);
        //console.log(req.cookies.)
        next(); // Jeśli ciasteczko istnieje, kontynuujemy
    } else {
        res.status(401).render('blad',{blad:'Nie jesteś zalogowany!'});
    }
}