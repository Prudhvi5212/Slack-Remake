var connection = new autobahn.Connection({url: 'wss://ws.syrow.com:443/ws', realm: 'default'});

var app = angular.module('myApp', []);

app.factory("dbService", function() {
  var db = require('sqlite3-wrapper').open('./chatting.db')
  console.log(db);
  return db;
});


app.controller("myCtrl", function ($scope , $log ) {

    $scope.data =
    {channel:[{name:"general" , pk : 1334 , lastUpdate : "" , notificationCount : 2 },
    {name:"buisness" , pk : 2345 , lastUpdate  : "" , notificationCount :3},
    {name:"main" , pk : 2345 , lastUpdate  : "" , notificationCount :3},
    {name:"new" , pk : 2345 , lastUpdate  : "" , notificationCount :3},] ,

    dMsg:[ {name:"Slackbot" ,type:"bot ", pk :1222 , lastUpdate :" ", notificationCount :2 ,image:"assets/img/img-4.png"},
    {name:"Prateek" ,type:"user", pk :1223 , lastUpdate :" ", notificationCount :3,image:"assets/img/img-1.jpg"},
    {name:"User2" ,type:"user", pk :1224 , lastUpdate :" ", notificationCount :5,image:"assets/img/img-2.jpg"}],


    apps :[{name:"Approval-Bot", id:1234 , type:"app" , lastUpdate:" " , notificationCount:3},
    {name:"Asana", id:1234 , type:"app" , lastUpdate:" " , notificationCount:3},
    {name:"Google Drive", id:1234 , type:"app" , lastUpdate:" " , notificationCount:3},
    { name:"hello_World", id:1234 , type:"app" , lastUpdate:" " , notificationCount:3}] ,

    mglist:[]
  }

  dbService.select({
    table: 'mglist'
    // where: {
    //   mainName1: 'Prateek'
    // }
}, function(err, mglist) {
    console.log(err);
    console.log(mglist);
    $scope.mglist = mglist;
console.log($scope.mglist);


    if ((mglist || []).length > 10) {

      // update mglist
      dbService.update('mglist', {
        id: mglist[0].id
      }, {
        message: 'updated'
      }, function(error, changes) {
        if (err) {
          console.log(err.message);
        } else {
          console.log("updated succesfully");
        }
      })
    } else {

      // insert into mglist
      dbService.insert('mglist', {
        id: 34,
        message: "Enjoy",
        created: "12-01-2022T2312:312:32",
        type: "image",
        attachment: "assets/img/img-2.jpg",
        sender: "1",
        reciever: "2",
        image: "assets/img/img-1.jpg",
        mainName1: "Prateek"
      }, function(error, id) {
        if (err) {
          console.log(err.message);
        } else {
          console.log("inserted");
        }

      })
    }
  })


    $scope.mainChat = " ";
    $scope.channel = function () {
        $scope.mainChat = "#Channel";
    };
    $scope.dirMsg = function () {
        $scope.mainChat = "#Messages";
    };
    $scope.application = function () {
        $scope.mainChat = "#Applications";
    };
    $scope.user = function(){
        $scope.mainChat = "#Prudhvi"
    }


    $scope.model = { message: "" };
    $scope.clickMe = function(outgoingMsg){

        if (connection.session) {
           connection.session.publish("com.myapp.mytopic2", [outgoingMsg]);
           console.log("event published!");
           $scope.model.message= " " ;
        } else {
           console.log("cannot publish: no session");
        }
    };

    $scope.model = {message: " "};
    $scope.CurrentDate = new Date();



    // modal window ======================================================================================

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: 'md',
          resolve: {
            data: function () {
              return $scope.data;
            }
          }
        });

        modalInstance.result.then(function () {
          alert("now I'll close the modal");
        });
      };
});


// ============================================
angular.module('myApp').controller('ModalInstanceCtrl', function ($scope,$uibModalInstance, data) {
    $scope.data = data;

    $scope.ok = function () {
      //{...}
      alert("You clicked the ok button.");
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      //{...}
      alert("You clicked the cancel button.");
      $uibModalInstance.dismiss('cancel');
    };
  });




// ============================================




// messaging app controller


// "onopen" handler will fire when WAMP session has been established ..
connection.onopen = function (session) {

   console.log("session established!");

   // our event handler we will subscribe on our topic
   //
   function onevent1(args, kwargs) {
      console.log("got event:", args, kwargs);
      var scope = angular.element(document.getElementById('Receiver')).scope();
      scope.$apply(function() {
          scope.showMe(args[0]);
      });
   }

   // subscribe to receive events on a topic ..
   //
   session.subscribe('com.myapp.mytopic2', onevent1).then(
      function (subscription) {
         console.log("ok, subscribed with ID " + subscription.id);
      },
      function (error) {
         console.log(error);
      }
   );
};


// "onclose" handler will fire when connection was lost ..
connection.onclose = function (reason, details) {
   console.log("connection lost", reason);
}


// initiate opening of WAMP connection ..
connection.open();
