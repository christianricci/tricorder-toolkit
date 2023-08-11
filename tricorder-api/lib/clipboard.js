const ClipboardListener = require('clipboard-listener');
const sqlite3 = require('sqlite3');

class DBStore {
    constructor(debug) {
        this.debug = debug;
        this.db = new sqlite3.Database(":memory:" , (err) => {
            if(err) {
                this.debug("Error Occurred - " + err.message);
            }
            else {
                this.debug("DataBase Connected");
            }
        });
        var createStmt = 'CREATE TABLE CLIPS (NAME VARCHAR(2000));'
        this.db.run(createStmt , (err) => {
            if(err) {
                this.debug("Error Occurred - " + err.message);
            }
            else {
                this.debug("Table CLIPS Created");
            }      
        });
    }

    add(value) {
        var insertStmt = 'INSERT INTO CLIPS VALUES (?);'
        this.db.prepare(insertStmt , (err) => {
            if(err) {
                this.debug("Error Occurred - " + err.message);
            }
        });          
        this.db.run(insertStmt, value, (err) => {
            if(err) {
                this.debug("Error Occurred - " + err.message);
            }
        });          
    }

    get(response) {
        var selectStmt = 'SELECT NAME FROM CLIPS ORDER BY ROWID DESC LIMIT 100;'
        return this.db.all(selectStmt , (err, rows) => {
            if(err) {
                this.debug("Error Occurred - " + err.message);
            } else {
                // this.debug(rows);
                response.send(rows);
            }
        });
    }
    remove(response) {
        var deleteStmt = 'DELETE FROM CLIPS;'
        this.db.run(deleteStmt, (err) => {
            if(err) {
                this.debug("Error Occurred - " + err.message);
            }
        });
        return response.send("[]")
    }
}

class Clipboard extends DBStore {
    constructor(debug) {
        super(debug);
        this.debug = debug;
    }

    start() {
        const listener = new ClipboardListener({
            timeInterval: 100, // Default to 250
            immediate: true, // Default to false
        });

        listener.on('change', value => {
            this.add(value);
            // this.debug(value);
        });
    }

    history(response) {
        return this.get(response);
    }

    clear(response) {
        return this.remove(response);
    }    
}

module.exports = function(debug) {
    return new Clipboard(debug);
};
