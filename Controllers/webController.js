
const url=require('url');
const LOG = require("../models/loginModel");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../db');

exports.index=(req, res)=>{

    res.render('index');
}

exports.rejestracja=(req,res)=>{
    res.render('rejestracja');
}
exports.blad=(req,res)=>{
    res.render('blad');
}

exports.rejestr= async (req, res)=>{
    let username = req.body.username;
    let password1 = req.body.password1;
    let password2 = req.body.password2;
    //console.log(username);
    //console.log(password1);
    //console.log(password2);



    if (username.length>7 &&( password1=== password2) && password1.length>8){

        res.render('blad',{blad: "użytkownik o takim username juz istnieje"});
        const [rows1] = await LOG.checkUsername(username);
        if(rows1.affectedRows>0) {
            const rejestr= new LOG(username,password1);
            const [rows]= await rejestr.save();
            if (rows.affectedRows>0){
                res.render('index');
            }else{
                res.status(500).send('Error with a server');
            }


    }




    }else res.status(400).render('blad',{blad: "Niepoprawny username albo password"});


}

exports.loginin=async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;


    //console.log(password);
    //res.render('index');






    if (username.length>7 && password.length>8) {

        const [rows] = await LOG.LoginIn(username, password);

        console.log(req.cookies);
        console.log("name"+req.cookies.name);
        console.log(req.cookies);
        console.log(req.cookies);
        console.log(rows);
        if (rows.affectedRows!==0) {
            console.log("rows affected"+rows.affectedRows!==0);
            console.log("blblblb");


            const d = new Date();
            d.setTime(d.getTime() + (30*24*60*60*1000));
            let expires = "expires=" + d.toUTCString();
            //document.cookie= "username"+username+"=" + expires + ";path=/";
            res.cookie('username',username,{
                maxAge: 60*60*1000,
                httpOnly: true,
                path: '/'
            });

            res.status(200).render('index');
        } else {
            res.send('Incorrect Username and/or Password!');
        }


    } else {
        res.send('Please enter corect Username and Password!');

    }


}
exports.logout=(req, res) => {
    res.render('Logowanie');
}
exports.powstanie=(req, res) => {
    res.render('powstanie');
}
exports.kontakt=(req, res) => {
    res.render('kontakt');
}
exports.login=async (req, res) => {
    res.render('logowanie');
}
exports.admin=async (req, res) => {
    let user=req.cookies.username;
    if(user !=""){
        res.render('admin');

    }else res.send('You are not logged in');
}


