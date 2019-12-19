var db = require('sqlite3-wrapper').open('./v1.db')

var deleteIn = function(){

db.delete('migrate', {messages: '12345'},  function(err,migrate) {
            if (err) {
              console.log(err.message);
            }
            else {
              console.log("okok");
            }
})
}


module.exports = deleteIn;
