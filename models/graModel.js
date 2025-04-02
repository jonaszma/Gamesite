const db = require('../db');

class Gra {
    constructor(name,opis) {
        this.name = name;

        this.opis = opis;
    }

    static fetchAll() {
        //return db.execute('SELECT * FROM gry');
        return db.query('SELECT gry.id AS gra_id ,gry.nazwa AS gra, gry.opis AS gra_opis, \n' +
            'wydawnictwo.id AS wydawnictwo_id, wydawnictwo.nazwa AS wydawnictwo, wydawnictwo.opis AS wydawnictwo_opis, \n' +
            '               gry_wydawnictwo.rok_powstania FROM gry JOIN gry_wydawnictwo ON gry.id = gry_wydawnictwo.gra_id JOIN wydawnictwo ON wydawnictwo.id = gry_wydawnictwo.wydawnictwo_id');
    }

    static findById(id) {
        return db.execute('SELECT gry.id AS gra_id ,gry.nazwa AS gra, gry.opis AS gra_opis, \n' +
            'wydawnictwo.id AS wydawnictwo_id, wydawnictwo.nazwa AS wydawnictwo, wydawnictwo.opis AS wydawnictwo_opis, \n' +
            '               gry_wydawnictwo.rok_powstania FROM gry JOIN gry_wydawnictwo ON gry.id = gry_wydawnictwo.gra_id JOIN wydawnictwo ON wydawnictwo.id = gry_wydawnictwo.wydawnictwo_id \n'+
        'WHERE gry.id = ?', [id]);
    }

    save() {
        //console.log(this.name+" "+this.opis);
        return db.execute('INSERT INTO gry (nazwa,opis) VALUES (?, ?)', [this.name, this.opis]);
    }

    static deleteById(id){
        return db.execute('DELETE FROM gry WHERE id = ?', [id]);
    }

    static updateById(id,nazwa1,rok1,opis1){
        return db.execute('UPDATE gry SET nazwa = ? , opis = ? WHERE id = ?',[nazwa1,opis1,id]);
    }

    static FindBySort(nazwa,wydawnictwo,rok){
        let query= ' SELECT gry.id AS gra_id ,\n' +
            '                gry.nazwa AS gra,\n' +
            '               gry.opis AS gra_opis, \n' +
            '               wydawnictwo.nazwa AS wydawnictwo,\n' +
            '                wydawnictwo.opis AS wydawnictwo_opis, \n' +
            '               gry_wydawnictwo.rok_powstania \n' +
            '        FROM gry\n' +
            '        JOIN gry_wydawnictwo ON gry.id = gry_wydawnictwo.gra_id\n' +
            '        JOIN wydawnictwo ON wydawnictwo.id = gry_wydawnictwo.wydawnictwo_id \n' +
            '        WHERE 1=1';



        const params = [];
        if (nazwa){
            query += ' AND gry.nazwa LIKE ?';
            params.push('%'+nazwa+'%');
        }
        if (wydawnictwo){
            query += ' AND wydawnictwo.nazwa LIKE ?';
            params.push('%'+wydawnictwo+'%');
        }
        if (rok){
            query += ' AND gry_wydawnictwo.rok_powstania = ?';
            let rok1=new Date(rok).getFullYear()
            params.push(rok1);
            console.log(new Date(rok).getFullYear());
        }



        return db.query(query,params);

    }




}

module.exports = Gra;
