angular.module('iagent.services', [])

.factory('Users', function() {

  var users = [
    { 
      name: 'Steven Huang',
      cellPhone: '13912345678',
      email: 'steven.huang@gmail.com',
      licensePlates: '沪A6U615',
      gender: 'male',
      occupation: 'Software Engineer',
      location: 'Shanghai',
      age: 33,
      carPurchasePrice: 20000,
      drivingExperience: 3.5,
      avgDailyMileage: 22.5,
      trafficViolations: 2,
      avatar: '1.png'
    },
    { 
      name: 'Melanie Qiu',
      cellPhone: '13956712348',
      email: 'melanie.qiu@outlook.com',
      licensePlates: '沪D83278',
      gender: 'female',
      occupation: 'Product Manager',
      location: 'Beijing',
      age: 28,
      carPurchasePrice: 35000,
      drivingExperience: 2,
      avgDailyMileage: 15.0,
      trafficViolations: 0,
      avatar: '2.png'
    }
  ];

  return {
    all: function() {
      return users;
    },
    get: function(user, callBack) {
      setTimeout(function() {
        for(var i = 0; i < users.length; i++) {
          if(user.email === users[i].email) {
            callBack(users[i]);
            return;
          }
        } 
        callBack(null);
      }, 1500);
    }
  }
});
