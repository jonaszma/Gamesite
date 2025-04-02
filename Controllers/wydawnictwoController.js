

const Wydawnictwo = require('../models/wydawnictwoModel');
const url=require('url');
const Gra = require("../models/graModel");
const grawydawnictwo = require("../models/gra_wydawnictwoModel");



// module.exports = {
//     getAllGames: (req, res) => {
//         res.send("got it!!!");
//     }
// }
const ITEMS_PER_PAGE = 10;


exports.getWydawnictwoDetails=async (req, res) => {
    try{
        const [rows]= await Wydawnictwo.findbyId(req.params.id)
        //res.status(200).render('gameDetails', { gra: rows[0] });
        //console.log(rows)
        let idid={id:req.params.id};
        let wydawnictwa=[];
        console.log(rows);
        for(let i=0;i<rows.length;i++){
            wydawnictwa.push(rows[i].wydawnictwo);
        }
        //console.log(wydawnictwa);
        res.status(200).render('WydawnictwoDetail',{gra:rows[0],id:idid}   );
    }catch(err){
        console.log(err)
        //wynik="gra nie została dodana";
        res.status(404).json('Gra nie znaleziony');
    }
}

exports.getAllWydawnictwo =async (req, res) => {
    //res.send("got it!");

    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;



    try{
        const [rows]= await Wydawnictwo.fetchAll();
        console.log(rows);
        const totalItems=rows.length;
        const newrows= rows.slice(offset, offset + ITEMS_PER_PAGE);

        //res.status(200).render('gameList', { games: JSON.stringify(rows) });
        res.status(200).render('Wydawnictwo', {games: newrows,currentPage: page, totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE)  })   ;
    }catch(err){
        console.error('Error fetching wydawnictw:', err.message);
        res.status(500).send('Server error');
    }

};

exports.getAddwydawnictwoForm =async (req, res) => {
    res.render('AddWydawnictwoForm');
};

exports.getUpdateform=async (req,res)=>{

    let id ={id: req.params.id};

    console.log(id.id);
    //res.render('UpdateWydawnictwoForm',{id:id});



    const [rows]=await Wydawnictwo.findbyId(id.id);
    const [rows2]=await grawydawnictwo.findbygryId(req.params.id);

    console.log(rows[0].rok_powstania.toISOString().split('T')[0]);
    //console.log(rows2);
    //console.log(id.id);
    console.log(rows);
    res.render('UpdateWydawnictwoForm',{game:rows[0]});
}



exports.addGame =async (req, res) => {
    const { nazwa, opis, rok_powstania } = req.body;
    if (nazwa.length<5 || opis.length<5 ){
        return res.status(400).render('blad',{blad:'niepoprawnie wspisane dane. (za krótkie).'});
    }
    console.log(nazwa,opis,rok_powstania);

    if (!nazwa || !opis || !rok_powstania) {
        return res.status(400).render('blad',{blad:'Wszystkie pola są wymagane.'});
    }


    var newWydawnictwo= new Wydawnictwo(nazwa, opis,rok_powstania );
    try{
        const [rows]= await newWydawnictwo.save();
        res.status(200).render('index');
    }catch(err){
        console.log(err)
        //wynik="gra nie została dodana";
        res.status(500).render('blad', {blad:"gra nie została dodana"});
    }


};
exports.deletewydawnictwo= async (req,res)=>{
    try{
        const [rows]= await Wydawnictwo.delete(req.params.id)
        console.log(rows.affectedRows);
        //res.status(200).render('gameDetails', { gra: rows[0] });
        if (rows.affectedRows>0){
            res.status(204).redirect('/');
        } else {
            res.status(404).render('blad',{blad:"Gra z takim id nie istnieje"});
        }

    }catch(err){
        console.log(err)
        //wynik="gra nie została dodana";
        res.status(404).json('Wystapił błąd podczas usuwania gry');
    }
    //res.status(204).json("gra została usunieta")
}
exports.updatewydawnictwo=async (req,res)=>{
    try{
        const { nazwa, opis, rok_powstania } = req.body;
        if (nazwa.length<5 || opis.length<5){
            res.render(blad,{blad:"niepoprawnie wspisane dane"});
        }
        const [rows]= await Wydawnictwo.update(req.params.id,nazwa,opis,rok_powstania)
        //const [rows1] = await
        //console.log(rows.affectedRows);
        //res.status(200).render('gameDetails', { gra: rows[0] });
        if (rows.affectedRows>0){
            res.status(204).redirect('/');
        } else {
            res.status(404).render('blad',{blad:"Gra z takim id nie istnieje"});
        }

    }catch(err){
        console.log(err)
        //wynik="gra nie została dodana";
        res.status(404).json('Wystapił błąd podczas usuwania gry');
    }
}
exports.getGameDetails =async (req, res) => {

    try{
        const [rows]= await Gra.findById(req.params.id)
        //res.status(200).render('gameDetails', { gra: rows[0] });
        res.status(200).json(rows[0]);
    }catch(err){
        console.log(err)
        //wynik="gra nie została dodana";
        res.status(404).json('Gra nie znaleziony');
    }



};

exports.getGamesBySort=async (req,res)=>{
    const { NazwaGry, NazwaWydawnictwa, RokWydania } = req.body;


    try {
        const [rows]= await Gra.FindBySort(NazwaGry,NazwaWydawnictwa,RokWydania);

        res.status(200).render('Gry', {games: rows})   ;
    }catch (err){
        console.log(err)
    }






}
