var sqlite3 = require('sqlite3').verbose(),
  path = require('path');

var Alters = function(){
  var db = new sqlite3.Database('v1.db');


    db.serialize(function() {
    db.run("ALTER TABLE migrate ADD messagesTo NULL;");

  });

  db.close();
}

module.exports = Alters;
