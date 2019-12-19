var sqlite3 = require('sqlite3').verbose();
path = require('path');

module.exports = {
  myFunc2: function() {
    var db = new sqlite3.Database('v2.db');


    db.serialize(function() {
      db.run("CREATE TABLE auth_user (id integer NOT NULL PRIMARY KEY AUTOINCREMENT, password varchar(128) NOT NULL, last_login datetime NULL, is_superuser bool NOT NULL, first_name varchar(30) NOT NULL, last_name varchar(30) NOT NULL, email varchar(254) NOT NULL, is_staff bool NOT NULL, is_active bool NOT NULL, date_joined datetime NOT NULL, username varchar(150) NOT NULL UNIQUE)");

    });

    db.close();
  }
}
