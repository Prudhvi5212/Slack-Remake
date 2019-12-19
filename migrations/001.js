var sqlite3 = require('sqlite3').verbose();
path = require('path');

module.exports = {
  myFunc: function() {
    var db = new sqlite3.Database('v1.db');


    db.serialize(function() {
      db.run("CREATE TABLE if not exists message (id integer NOT NULL PRIMARY KEY AUTOINCREMENT, message varchar(200) NULL, attachment varchar(100) NULL, created datetime NOT NULL, read bool NOT NULL, originator_id integer NULL REFERENCES auth_user(id), user_id integer NOT NULL REFERENCES auth_user(id))");

    });

    db.close();
  }
}
