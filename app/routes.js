module.exports = function(app) {

   app.get('/', function(req, res) {
    res.render('index.ejs');
  });

   app.get('/chat', function(req, res) {

    res.render('chat.ejs');
  });

     app.get('/dashboard', function(req, res) {

    res.render('dashboard.ejs');
  });

  app.get('/firebase', function(req, res) {

    const admin = require('firebase-admin');
  
    const db = admin.firestore();



    // db.collection("/openGroups/demoOpenGroup1/messages").get().then((querySnapshot) => {

    //     var sub_array = [];
     
    // querySnapshot.forEach((doc) => {
    //     // console.log(doc);
    //      // console.log(`${doc.id} => ${doc.data()}`);
    //      sub_array.push(doc.data());
          
    // });
        // console.log(sub_array);

     res.render('firebase.ejs');

       
    // });




  });

  app.post('/firebasejs', function(req, res) {

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

    app.get('/home', function(req, res) {

      // var fdata = [];

      // var request = require("request");

      // // var sData = window.localStorage.getItem('allTokenData');
      
      // // var storageData= JSON.parse(sData);
 
      // // var tokens = storageData.tokendata;

      // // console.log(tokens);

      // var dattt = {  offset: 0, limit: 1000000};

  
      
      // var options = { method: 'POST',
      //   url: 'https://apis.tradetipsapp.com/api/tip/getAllTipFeaturePaginationForUser',
      //   headers: {
      //     Authorization: 'Bearer '+ 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6Im1haGVzaHdhcmkwNmdvdmluZEBnbWFpbC5jb20iLCJzdWIiOiJmMTQ4NmIzMy03YTM0LTQ1MDYtYWFhMS1kM2Y0YmYzOGQzNjYiLCJpYXQiOjE2MDk3NTAxOTcsImV4cCI6MTYxMDM1NDk5N30.sjeJgyz4Sq9P1jEDWr3IsovutZlPrYKvwHispVN2qtyh0g6SNL2-LdkD6XzMWLrUuYHnuFDEss5N0dxRGanNOw',
      //      },
      //   formData: dattt };

      // request(options, function (error, response, body) {
      //   if (error) throw new Error(error);

      //   console.log(body);
      //    // fdata.push(body);

      //     res.render('home.ejs',{data : body});
      // });
       
      //  // console.log(fdata);

    res.render('home.ejs');

  });

    app.get('/room', function(req, res) {

    res.render('room.ejs');
  });

     app.get('/tip', function(req, res) {

    res.render('tip.ejs');
  });



};