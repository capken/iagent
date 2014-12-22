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
      name: 'Melanie Wang',
      cellPhone: '13956712348',
      email: 'melanie.wang@outlook.com',
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

      };
      //var data = {
      //  mode: "policy",
      //  insuredObjects: [
      //    {
      //      name: "Vehicle #0",
      //      product_id: product.id,
      //      channel_id: 80001,
      //      factor_table: {
      //        effectiveDate: "2014-12-19T03:27:56.229Z",
      //        expiredDate: "2015-12-18T03:27:56.229Z",
      //        $isOpen: true,
      //        DV003: "1988-07-02T16:00:00.000Z",
      //        DV008: 3,
      //        VE001: 18000,
      //        VE011: 2,
      //        VE023: 30000,
      //        AOA_limitAmount_VTPL: 50000,
      //        AOA_limitAmount_DPL: 50000,
      //        AOA_limitAmount_SCRAPE: 1000
      //      },
      //      selection: {
      //        "89b77fc1-24c4-4679-bc94-9d7be630e358": true,
      //        "295d2bbb-0934-47d1-8b06-b36ee9bf2276": true,
      //        "d051b4d5-3c41-472d-9b79-5339da5086f4": true,
      //        "cf3b4ee7-eff9-46ca-8c53-1912b1c7f1c9": true,
      //        "256e0164-75c3-4c59-b504-fb97a4f606e9": true,
      //        "7d982558-02a9-42f5-8112-fa3877e3d867": true,
      //        "376a3bde-a95d-43d8-af3c-5ebdf30bc974": true,
      //        "692d8fcc-389f-40a4-9c03-1b2ed2d52e01": true
      //      },
      //      campaign_ids: []
      //    }
      //  ]
      //};
    },
    calc: function(data, callback) {
      $http.get('data/quotation.json')
      .success(function(response) {
        var result = {};
        if(response.underwriting.passed) {
          result.passUnderwriting = true;
          result.tax = response.calculation.TAX;
          result.discount = response.calculation.DISC;
          result.commission = response.calculation.COMM;
          result.sgp = response.calculation.SGP;
        } else {
          result.passUnderwriting = false;
        }

        callback(result);
      })
      .error(function(response) {
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
