
const wydawnictwo=require('../models/wydawnictwoModel')
const Gra = require('../models/graModel');
const url=require('url');
const Wydawnictwo = require("../models/wydawnictwoModel");
const grawydawnictwo= require('../models/gra_wydawnictwoModel');

const ITEMS_PER_PAGE = 10;

// module.exports = {
//     getAllGames: (req, res) => {
//         res.send("got it!!!");
//     }
// }



exports.getAllGames =async (req, res) => {



    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;



    try{
        const [rows]= await Gra.fetchAll();
        const totalItems=rows.length;
        const newrows= rows.slice(offset, offset + ITEMS_PER_PAGE);


        //const [rows]= await Gra.fetchAll();
        //console.log(rows);
        for (const rowsKey in rows) {
            //console.log(rows[rowsKey]);
        }
        //console.log("jsonstring"+JSON.stringify(rows)) ;

        //res.status(200).render('gameList', { games: JSON.stringify(rows) });
        res.status(200).render('Gry', {games: newrows,currentPage: page, totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE)  }) ;
    }catch(err){
        console.error('Error fetching games:', err.message);
        res.status(500).send('Server error');
    }

};



exports.addGame =async (req, res) => {
    const { nazwa, opis, rok_powstania, wydawnictwo } = req.body;

    if (!nazwa || !opis || !rok_powstania || !wydawnictwo) {
        return res.status(400).send('Wszystkie pola są wymagane.');
    }

    if (nazwa.length<5 || opis.length<5 ){
        return res.status(400).send('Niepoprawnie wspisane dane. (za krótkie)');
    }

    const [rows]= await Wydawnictwo.fetchByName(wydawnictwo);
    const totalItems=rows.length;
    if (!rows || !rows.length) {
        res.status(500).render('blad',{blad:"nie isnieje wydawnictwo"});
    }

    const wydawnictwoid=rows[0].id;
    //console.log(rows[0])
    //console.log(nazwa+" "+ opis)
    const newGame = new Gra(nazwa , opis);


    //console.log("games:"+  name+" "+ rok_wydania+" " +opis );

    try{
        const [rows1]= await newGame.save();
        //console.log(rows1)
        const newgrawydawnictwo= new grawydawnictwo(rows1.insertId,wydawnictwoid,rok_powstania);
        const [rows2]= await newgrawydawnictwo.save();

        res.status(200).render('index');
    }catch(err){
        console.log(err)
        //wynik="gra nie została dodana";
        res.status(500).render('blad', {blad:"gra nie została dodana"});
    }


};
exports.deleteGame= async (req,res)=>{
    //console.log(req);
    try{
        const [rows]= await Gra.deleteById(req.params.id)
        console.log(rows.affectedRows);
        //res.status(200).render('gameDetails', { gra: rows[0] });
        if (rows.affectedRows>0){
            console.log("usuniete");
            res.status(204).redirect("../");
        } else {
            res.status(404).render('blad',{blad:"Gra z takim id nie istnieje" });
        }

    }catch(err){
        console.log(err)
        //wynik="gra nie została dodana";
        res.status(404).json('Wystapił błąd podczas usuwania gry');
    }
    //res.status(204).json("gra została usunieta")
}
exports.updateGame=async (req,res)=>{
    try{
        let { nazwa, opis, rok_powstania, wydawnictwo } = req.body;

        const [rows4]=await Gra.findById(req.params.id)
        if (nazwa.length<5|| opis.length<5  ){
            res.render(blad,{blad:"niepoprwane dane"});
        }
        if (nazwa.length===0  ){
            nazwa=rows4.nazwa;
        }
        //console.log(req.body);
        //console.log(nazwa,opis,rok_powstania,wydawnictwo);
        let wydawnictwa=wydawnictwo.split("_");
        //console.log(wydawnictwa);
        const [rows]= await Gra.updateById(req.params.id,nazwa,rok_powstania,opis);


        //const [rows1]= await Wydawnictwo.fetchByName(wydawnictwa);

        //const [rows1] = await
        //console.log(rows.affectedRows);
        //res.status(200).render('gameDetails', { gra: rows[0] });
        if (rows.affectedRows>0){
            res.status(204).render('index');
        } else {
            res.status(404).render('blad',{blad:"Gra z takim id nie istnieje"});
        }

    }catch(err){
        console.log(err)
        //wynik="gra nie została dodana";
        res.status(404).json('Wystapił błąd podczas usuwania gry');
    }
}

exports.getUpdateform=async (req,res)=>{

    let id ={id: req.params.id};
    let [rows]=await Gra.findById(req.params.id)
    const [rows2]=await grawydawnictwo.findbygryId(req.params.id);

    console.log(rows[0].rok_powstania+"-01-01");
    rows[0].rok_powstania=rows[0].rok_powstania+"-01-01";
    //console.log(rows2);
    //console.log(id.id);
    //console.log(rows);
    res.render('UpdateGameForm',{game:rows[0],wydawnictwa:rows2});
}

exports.getWydawnictwaForm=async (req,res)=>{
    const [rows2]=await grawydawnictwo.findbygryId(req.params.id);
    //console.log(rows2);
    let id ={id: req.params.id};
    res.render('GraWydawnictwa',{wydawnictwa:rows2,id:id});
}
exports.addWydawnictwa= async (req,res)=>{
    let id = req.params.id;
    //console.log(id);
    const{nazwa}=req.body;
    //console.log(nazwa);
    const [rows] =await Wydawnictwo.findByName(nazwa);
    //console.log(rows);
    const [rows3]=await Gra.findById(req.params.id);
    //console.log(rows3);
    let newgrawydawnictwo= new grawydawnictwo(id,rows[0].id,rows3[0].rok_powstania);
    //console.log(id,rows[0].id,rows3[0].rok_powstania);
    const [rows2] =await newgrawydawnictwo.save();
    res.redirect(`../${id}`);
}

exports.deleteGryWydawnictwo=async (req,res)=>{
    let id = req.params.id;
    let idid=id.split("_")
    console.log(id.split("_"));
    //console.log(idid[1]);
    const [rows2]=await grawydawnictwo.findbyGryIdAndWydawnictwoId(idid[1],idid[0]);
    const [rows3]=await grawydawnictwo.delete(rows2[0].gra_id,rows2[0].wydawnictwo_id);
    console.log(rows2);
    //const [rows3]=await grawydawnictwo.delete(rows2[0].id);
    //console.log(rows2[0].id);
    //let id ={id: req.params.id};
    //res.render('GraWydawnictwa',{wydawnictwa:rows2,id:idid[1]});
    res.redirect(`../${idid[1]}`);
}




exports.getGameDetails =async (req, res) => {

    try{
        const [rows]= await Gra.findById(req.params.id)
        //res.status(200).render('gameDetails', { gra: rows[0] });
        console.log(rows)
        let wydawnictwa=[];
        console.log(rows);
        for(let i=0;i<rows.length;i++){
            wydawnictwa.push(rows[i].wydawnictwo);
        }
        console.log(wydawnictwa);
        res.status(200).render('gameDetail',{gra:rows[0],wydawnictwa:wydawnictwa}   );
    }catch(err){
        console.log(err)
        //wynik="gra nie została dodana";
        res.status(404).json('Gra nie znaleziony');
    }



};

exports.getGamesBySort=async (req,res)=>{
    const { NazwaGry, NazwaWydawnictwa, RokWydania } = req.body;
    console.log(req.body);
    console.log(NazwaGry,NazwaWydawnictwa,RokWydania);
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    try {
        const [rows]= await Gra.FindBySort(NazwaGry,NazwaWydawnictwa,RokWydania);
        const totalItems=rows.length;
        const newrows= rows.slice(offset, offset + ITEMS_PER_PAGE);
        res.status(200).render('Gry', {games: newrows,currentPage: page, totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE)  })   ;
    }catch (err){
        console.log(err)
    }






}
