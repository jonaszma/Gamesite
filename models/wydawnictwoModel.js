const db = require('../db');


class WydawnictwoModel {
    constructor(nazwa,opis,rok_zalozenia) {
        this.nazwa = nazwa;
        this.opis = opis;
        this.rok_zalozenia=rok_zalozenia;
    }

    static fetchAll() {
        return db.query('SELECT * FROM wydawnictwo');


    }

    save() {
        return db.execute('INSERT INTO wydawnictwo (nazwa,opis,rok_powstania) VALUES ( ?,?, ?)', [this.nazwa,this.opis,this.rok_zalozenia]);
    }

    static fetchByName(name) {
        return db.query('SELECT * FROM wydawnictwo WHERE nazwa LIKE ?', ["%"+name+"%"]);
    }
    static delete(id) {
        return db.execute('DELETE FROM wydawnictwo WHERE id = ?', [id]);
    }
    static findbyId(id){
        return db.query('SELECT * FROM wydawnictwo WHERE id = ?', [id]);
    }
    static update(id,nazwa,opis,rok){
        return db.execute('UPDATE wydawnictwo SET nazwa = ? , opis = ?, rok_powstania = ? WHERE id = ?', [nazwa,opis,rok,id]);
    }

    static findByName(nazwa){
        return db.query('SELECT * FROM wydawnictwo WHERE nazwa Like ?', [nazwa]);
    }

}
module.exports = WydawnictwoModel;