const Gra = require('../models/graModel');

const url=require('url');
const Wydawnictwo = require("../models/wydawnictwoModel");



exports.admin=async (req, res) => {
    let user=req.cookies.username;

    const [rows]= await Wydawnictwo.fetchAll();
    if(user !=""){
        //console.log(rows);
        res.render('AddGameForm', {wydawnictwa: rows });

    }else res.send('You are not logged in');
}