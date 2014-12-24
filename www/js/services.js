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
      ageOfCar: 12,
      trafficViolations: 2,
      avatar: '1.png'
    },
    { 
      name: 'Melanie Wang',
      cellPhone: '13956712348',
      email: 'melanie.wang@outlook.com',
      licensePlates: '京D83278',
      gender: 'female',
      occupation: 'Product Manager',
      location: 'Beijing',
      age: 28,
      carPurchasePrice: 35000,
      drivingExperience: 2,
      avgDailyMileage: 15.0,
      ageOfCar: 8,
      trafficViolations: 0,
      avatar: '2.png'
    }
  ];

  return {
    all: function() {
      return users;
    },
    get: function(user, callback) {
      setTimeout(function() {
        for(var i = 0; i < users.length; i++) {
          if(user.email === users[i].email) {
            callback(users[i]);
            return;
          }
        } 
        callback(null);
      }, 1500);
    }
  };
})

.factory('Quotation', function($http) {
  return {
    buildRequest: function(product, user) {
      var factors = {
        effectiveDate: "2015-01-01T00:00:00.000Z",
        expiredDate: "2015-12-31T00:00:00.000Z",
        $isOpen: true,
        DV003: "1988-07-02T16:00:00.000Z",
        DV008: user.drivingExperience,
        VE001: user.avgDailyMileage * 365,
        VE011: user.ageOfCar,
        VE023: user.carPurchasePrice
      };

      var selection = {};
      angular.forEach(product.coverages,
        function(coverage, index){
          selection[coverage.uuid] = coverage.selected;
          if(coverage.selected && angular.isDefined(coverage.limit)) {
            factors[coverage.limit.code] = coverage.limit.value;
          }
        }
      );

      return {
        mode: "policy",
        insuredObjects: [
          {
            name: "Vehicle #0",
            product_id: product.id,
            channel_id: 80001,
            factor_table: factors,
            selection: selection,
            campaign_ids: []
          }
        ]
      };
    },
    calc: function(data, callback) {
      //key=QWdlbmN5MTpBZ2VuY3kx
      var serviceURL = 'http://172.25.12.38:8080/pa_web_dev/api/quotation?key=QWdlbmN5MTpBZ2VuY3kx';
      //$http.get('data/uw.json')
      //$http.get('data/quotation.json')
      $http.post(serviceURL, data)
      .success(function(response) {
        console.log(response);
        var result = {};
        if(response.insuredObjects.length > 0 &&
          response.insuredObjects[0].underwriting.passed) {
          result.passUnderwriting = true;
          result.tax = response.calculation.TAX;
          result.discount = response.calculation.DISC;
          result.commission = response.calculation.COMM;
          result.sgp = response.calculation.SGP;
        } else {
          result.passUnderwriting = false;
          result.failureMessages = response.insuredObjects[0].underwriting.messages.split(';');
        }

        callback(result);
      })
      .error(function(response) {
        console.log(response);
      });
    }
  };
})

.factory('Products', function($http) {
  return {
    all: function(callback) {
      setTimeout(function() {
        $http.get('data/products.json')
        .success(function(response) {
          callback(response);
        });
      }, 1200);
    },
    get: function(id, callback) {
      var productUrl = 'data/' + id + '.json';
      setTimeout(function() {
        $http.get(productUrl)
        .success(function(response) {
          callback(response);
        })
      }, 900);
    }
  };
});
