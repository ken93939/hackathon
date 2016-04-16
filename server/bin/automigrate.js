var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var loopback = require('loopback');

var dataSource = app.dataSources.MySQL;


var member_array=[
{
  "first_name": "ken",
  "last_name": "kwok",
  "phone_number": 51191726,
  "gender": "male",
  "authorized": "yes",
  "isDriver": "yes",
  "password": "123456",
  "email": "ken@ken.com",
  "deviceToken": "hkustfyp",
  "emailVerified": 1,
  "gender_preference": true,
  "created": new Date(),//moment().format()
  "picture": "01"
},
{
  "first_name": "sam",
  "last_name": "wong",
  "phone_number": 999123,
  "gender": "male",
  "authorized": "yes",
  "isDriver": "yes",
  "password": "123456",
  "email": "sam@sam.com",
  "deviceToken": "fypyeah",
  "emailVerified": 1,
  "gender_preference": false,
  "created": new Date(2016,0,27),
  "picture": "01"
}
];



dataSource.automigrate('activity', function(err) {
  if(err) throw err;
  console.log("activity!");

  // var activity=app.models.activity;
  // var count=activity_array.length;
  // activity_array.forEach(function(Activity){
  //   activity.create(Activity,function(err,record){
  //     if(err) 
  //       return console.log(err)
  //     console.log("done",record);
  //     count--;
  //     if(count==0){
  //       console.log("ko");
  //       //dataSource.disconnect(); 
  //     }
  //   })

  // });
});

dataSource.automigrate('member', function(err) {
  if(err) throw err;
  console.log("Member!");

  var member=app.models.member;
  var count=member_array.length;
  member_array.forEach(function(Mem){
    member.create(Mem,function(err,record){
      if(err)
        return console.log(err)
      console.log("member_done",record);
      count--;
      if(count==0){
        console.log("member_ko");
      }

    })
  });

});



dataSource.automigrate('location', function(err) {
  if(err) throw err;
  console.log("location!");
  // var email=app.models.emailTemplate;
  // var count=emailTemplate_array.length;
  // emailTemplate_array.forEach(function(Email){
  //   email.create(Email,function(err,record){
  //     if(err)
  //       return console.log(err);
  //     console.log("emailTemplate_done",record);
  //     count--;
  //     if(count==0){
  //       console.log("emailTemplate_ko");
  //     }
  //   });
  // });

});