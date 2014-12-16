angular.module('iagent.services', [])

.factory('Users', function() {

  // Some fake testing data
  var users = [
    { 
      name: 'Allen Zheng',
      cellPhone: '13912345678',
      email: 'allen.zheng@ebaotech.com',
      licensePlates: '沪A6U615',
      avatar: 'allen.jpeg'
    },
    { 
      name: 'Steve Jobs',
      cellPhone: '18900816498',
      email: 'steven@apple.com',
      licensePlates: '沪A66666',
      avatar: 'steve.jpeg'
    },
    { 
      name: 'Tim Cooks',
      cellPhone: '18600816398',
      email: 'tim@apple.com',
      licensePlates: '沪A88888',
      avatar: 'tim.jpeg'
    }
  ];

  return {
    all: function() {
      return users;
    },
    get: function(userName) {
      for(var i = 0; i < users.length; i++) {
        if(userName === users[i].name) {
          return users[i];
        }
      } 

      return null;
    }
  }
});
