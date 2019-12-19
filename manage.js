var sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const path1 = './sqlite3.db';

if (fs.existsSync(path1)) {
  //file exists
  console.log('file exists');
} else {
  var db = new sqlite3.Database(__dirname + '/sqlite3.db', function(err) {
    if (err) {
      console.error(err.msg);
    }
    console.log("connected succesfully");
  });


  db.serialize(function() {
    db.run("CREATE TABLE if not exists migration (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, applied TEXT)");
  });
}
var sqlite3 = require('sqlite3').verbose(),
  path2 = './sqlite3.db';
var db = new sqlite3.Database(path2, 'OPEN_READONLY');
db.serialize(function() {
  console.log("sdknd");
  current = db.get("SELECT * FROM migration ORDER BY id ASC", function(err, row) {
    if (err) {
      console.log(err.message);
    } else {
      console.log(current);
      const directoryPath = path.join(__dirname, 'migrations');
      //passsing directoryPath and callback function
      fs.readdir(directoryPath, function(err, files) {
        //handling error
        if (err) {
          return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function(file, index) {
          if (row != null) {
            console.log("file exists");
          } else {
            var another = require('./migrations/001');
            another.myFunc();
            var another1 = require('./migrations/002');
            another1.myFunc2();
            path3 = './sqlite3.db';
            var db = new sqlite3.Database(path3, 'OPEN_READONLY');
            db.serialize(function() {
              console.log("sdknd");
              db.run("INSERT INTO migration (id,name,applied) VALUES (?,?,?)", [1, "001.js", "myFunc()"],"INSERT INTO migration (id,name,applied) VALUES (?,?,?)", [1, "001.js", "myFunc()"], function(err) {
                if (err) {
                  console.log(err.message);
                }
              });

            });
          }
        });
      });
    }
  })
})
db.close();
