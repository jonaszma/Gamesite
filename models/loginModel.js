const db = require('../db');


class LoginModel {
    constructor(username,password) {
        this.username = username;
        this.password = password;
    }

    static LoginIn(username, password) {
        return db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password]);


    }

    save() {
        return db.execute('INSERT INTO accounts (username,password) VALUES ( ?, ?)', [this.username,this.password]);
    }

    static checkUsername(username) {
        return db.query('SELECT * FROM accounts WHERE username = ? ', [username]);
    }

}

module.exports = LoginModel;