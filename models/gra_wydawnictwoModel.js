const db = require('../db');


class Gra_wydawnictwoModel {
    constructor(gra_id, wydawnictwo_id, data) {
        this.gra_id = gra_id;
        this.wydawnictwo_id = wydawnictwo_id;
        this.data = data;
    }


    static fetchAll() {
        return db.query('SELECT * FROM wydawnictwo');


    }


    save() {





        return db.execute('INSERT INTO gry_wydawnictwo (gra_id,wydawnictwo_id,rok_powstania) VALUES (?, ?, ?)', [this.gra_id, this.wydawnictwo_id,new Date(this.data).getFullYear() ]);
    }

    static delete(gra_id,wydawnictwo_id) {
        return db.execute('DELETE FROM gry_wydawnictwo WHERE gra_id = ? AND wydawnictwo_id=?', [gra_id,wydawnictwo_id] );
    }

    static findbyGryIdAndWydawnictwoId(gra_id,wydawnictwo_id) {
        return db.query('SELECT * FROM gry_wydawnictwo JOIN wydawnictwo ON gry_wydawnictwo.wydawnictwo_id = wydawnictwo.id\n' +
            '                WHERE gry_wydawnictwo.gra_id = ? AND gry_wydawnictwo.wydawnictwo_id= ?', [gra_id,wydawnictwo_id]);
    }


    static deleteBygryid(gra_id) {

    }
    static findbygryId(id){
        return db.query('SELECT * FROM gry_wydawnictwo JOIN wydawnictwo ON gry_wydawnictwo.wydawnictwo_id = wydawnictwo.id\n' +
            '                WHERE gry_wydawnictwo.gra_id = ? ', [id]);

    }

}

module.exports = Gra_wydawnictwoModel;