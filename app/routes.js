module.exports = function(app) {

   app.get('/', function(req, res) {
    res.render('index.ejs');
  });

   app.get('/chat', isLoggedIn, function(req, res) {

    res.render('chat.ejs');
  });

    app.get('/profile', isLoggedIn, function(req, res) {

    res.render('profile.ejs');
  });

    app.get('/mentorProfile',isLoggedIn, function(req, res) {

    res.render('mentorProfile.ejs');
  });


   app.get('/stockChart',isLoggedIn, function(req, res) {

    var mentorids = req.query.id;

    var symbol = req.query.stockName;

    res.render('stockChart.ejs' , {tipsIds : mentorids , stockSymbol : symbol});
  });


  app.get('/dashboard', isLoggedIn , function(req, res) {

   
        res.render('dashboard.ejs');



  });

  app.get('/chatCodee', isLoggedIn , function(req, res) {

    res.render('chatCodee.ejs');
  });

   app.get('/mentorDetails', isLoggedIn, function(req, res) {

    var mentorids = req.query.id;

    res.render('mentorDetails.ejs' , {tipsIds : mentorids});
  });

     app.get('/aiDetails',isLoggedIn, function(req, res) {

    var mentorids = req.query.id;

    var symbol = req.query.stockName;

    res.render('aiDetails.ejs' , {tipsIds : mentorids , stockSymbol : symbol});
  });


  app.get('/Newsletter',isLoggedIn, function(req, res) {

    res.render('newsletterServices.ejs');
  });

  app.get('/TradeAlerts',isLoggedIn, function(req, res) {

    res.render('tradeAlerts.ejs');
  });

  app.get('/TradeAlerts',isLoggedIn, function(req, res) {

    res.render('tradeAlerts.ejs');
  });

  app.get('/DueDiligence',isLoggedIn, function(req, res) {

    res.render('dueDiligence.ejs');
  });

  app.get('/recommendedService',isLoggedIn, function(req, res) {

    res.render('recommendedService.ejs');
  });


  app.get('/LiveChat',isLoggedIn, function(req, res) {

    res.render('chatRoomServices.ejs');
  });

  app.get('/1-1Chat',isLoggedIn, function(req, res) {

    res.render('chatVideoServices.ejs');
  });
  

  app.get('/Webinar',isLoggedIn, function(req, res) {

    res.render('webinarServices.ejs');
  });

   app.get('/MentorPhoneGroup',isLoggedIn, function(req, res) {

    res.render('mentorPhoneServices.ejs');
  });

    app.get('/Books',isLoggedIn, function(req, res) {

    res.render('bookServices.ejs');
  });

    app.get('/Class',isLoggedIn, function(req, res) {

    res.render('classServices.ejs');
  });


  app.get('/VideoSubscription',isLoggedIn, function(req, res) {

    res.render('videoServices.ejs');
  });

  app.get('/services',isLoggedIn, function(req, res) {

    res.render('services.ejs');
  });

   app.get('/editService',isLoggedIn, function(req, res) {

    var serviceIddd = req.query.id;

    var servicePlanIddd = req.query.ids2;

    var servicesubscriptionname = req.query.sname;


    res.render('editService.ejs' , {subscriptionServiceId : serviceIddd , servicesMainId : servicePlanIddd , serviceName : servicesubscriptionname});



  });


    app.get('/forgetPassword', function(req, res) {

    
    res.render('forgetPassword.ejs');



  });


  app.get('/chatWindow',isLoggedIn, function(req, res) {

    const admin = require('firebase-admin');
  
    const db = admin.firestore();



     res.render('chatWindow.ejs');

       
    // });




  });

  app.post('/firebasejs',isLoggedIn, function(req, res) {

     // console.log(req.body);

    const admin = require('firebase-admin');
  
    // const serviceAccount = require('./../serviceAccountKey.json');
    // //initialize admin SDK using serciceAcountKey
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount)
    // });
    const db = admin.firestore();

    // console.log(req.body)

    db.collection("/openGroups/demoOpenGroup1/messages").add({
    createdDate : req.body.createdDate,
    message: req.body.message,
    messageId: req.body.userId + "_"+ req.body.createdDate,
    messageType : "text",
    profileImageUrl : "https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=" + req.body.userId,
    userId : req.body.userId,
    userName : req.body.userName

    })
    .then(function(docRef) {
        // console.log(docRef);
        // console.log("Document written with ID: ", docRef.id);
        return res.redirect('firebase.ejs');

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  });

    app.get('/home',isLoggedIn, function(req, res) {

   

    res.render('home.ejs');

  });

    app.get('/room', isLoggedIn, function(req, res) {

    res.render('room.ejs');
  });

     app.get('/tip', isLoggedIn, function(req, res) {

    res.render('tip.ejs');
  });

};

function isLoggedIn(req, res, next) {
  // console.log(req);
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
