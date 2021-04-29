var compression = require('compression')
var express  = require('express');
var app      = express();
var fs      = require('fs');
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var responseTime = require('response-time');
var redis = require('redis');
var cors = require('cors');
var request = require('request');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var Base64 = require('Base64');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

//initialize admin SDK using serciceAcountKey

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatdemo-96e4f.firebaseio.com"

});
const db = admin.firestore();
// console.log(db);

 
	app.use(compression());
	app.use(cors());
	app.use(responseTime());
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static('dist'));
 
	app.use(flash()); // use connect-flash for flash messages stored in session
//});

app.get('/neww', function(req, res) {
  res.sendfile('index.html');
});

// routes ======================================================================
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
// app.listen(port);

app.get('/',(req,res)=>
{
if(req.session.loggedIn)
res.render('dashboard.ejs')
else
res.render('index.ejs')
})
///////////////////////////////////////////////////////////////////////////////////////

app.get('/dashboard',(req,res)=>
{
if(req.session.loggedIn) 
{
var fdata = req.session.tokens;
var fusername = req.session.username;
var fuid = req.session.uid; 
var femail = req.session.email; 

res.render('dashboard.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});
}
else
res.redirect('/')
})

//////////////////////////////////////////////////////////////////////

    app.get('/room', function(req, res) {

	    if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('room.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }
  });

/// //////////////////////////////////////////////////////////////

     app.get('/tip', function(req, res) {
     	 
     	 if(req.session.loggedIn) 
	    { 
        var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('tip.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});
       
        } else {
	    res.redirect('/')
	   }
  });

////////////////////////////////////////////////////////////////////////

 app.get('/aiDetails', function(req, res) {
    
     if(req.session.loggedIn) { 
    var mentorids = req.query.id;

    var symbol = req.query.stockName;

        var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

        res.render('aiDetails.ejs' , {tipsIds : mentorids , stockSymbol : symbol ,tokens : fdata , userName : fusername , userid : fuid , email :femail});
     
      } else {
	     res.redirect('/')
	   }

  });

  //////////////////////////////////////////////////////////////////////////

   app.get('/mentorDetails', function(req, res) {

   	 if(req.session.loggedIn)  { 

    var mentorids = req.query.id;
    var fdata = req.session.tokens;
	var fusername = req.session.username;
	var fuid = req.session.uid; 
	var femail = req.session.email; 

    res.render('mentorDetails.ejs' , {tipsIds : mentorids , tokens : fdata , userName : fusername , userid : fuid , email :femail});

     } else {
	     res.redirect('/')
	 }
  });

   ////////////////////////////////////////////////////////////////////////

    app.get('/Newsletter', function(req, res) {

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('newsletterServices.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

    /////////////////////////////////////////////////////////////////////

  app.get('/TradeAlerts', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('tradeAlerts.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

 
/////////////////////////////////////////////////////////////////////////////

  app.get('/DueDiligence', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('dueDiligence.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

  /////////////////////////////////////////////////////////////////////////

  app.get('/recommendedService', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('recommendedService.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

///////////////////////////////////////////////////////////////////////////

  app.get('/LiveChat', function(req, res) {

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('chatRoomServices.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }
  });

/////////////////////////////////////////////////////////////////////

  app.get('/1-1Chat', function(req, res) {

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('chatVideoServices.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }
  });
  /////////////////////////////////////////////////////////////////

  app.get('/Webinar', function(req, res) {

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('webinarServices.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }
  });

//////////////////////////////////////////////////////////////////////

   app.get('/MentorPhoneGroup', function(req, res) {

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('mentorPhoneServices.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

   ///////////////////////////////////////////////////////////

    app.get('/Books', function(req, res) {

    	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('bookServices.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

//////////////////////////////////////////////////////////////////

    app.get('/Class', function(req, res) {

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('classServices.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

///////////////////////////////////////////////////////////////////////////

  app.get('/VideoSubscription', function(req, res) {

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('videoServices.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }
  });

///////////////////////////////////////////////////////////////////////////

  app.get('/services', function(req, res) {

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('services.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }
  });

///////////////////////////////////////////////////////////////////////

   app.get('/editService', function(req, res) {
   

    if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 
		var serviceIddd = req.query.id;

	    var servicePlanIddd = req.query.ids2;

	    var servicesubscriptionname = req.query.sname;

		res.render('editService.ejs', {subscriptionServiceId : serviceIddd , servicesMainId : servicePlanIddd , serviceName : servicesubscriptionname,tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }


  });
/////////////////////////////////////////////////////////////////////


app.get('/forgetPassword', function(req, res) {

    
    res.render('forgetPassword.ejs');



  });


  app.get('/chatWindow', function(req, res) {

    const admin = require('firebase-admin');
  
    const db = admin.firestore();

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('chatWindow.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }


  });

  ///////////////////////////////////////////////////////////////////////////

   app.post('/firebasejs', function(req, res) {

    const admin = require('firebase-admin');
    const db = admin.firestore();

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
        return res.redirect('firebase.ejs');

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  });

   /////////////////////////////////////////////////////////////////////////
var data ;
app.post('/authenticate'
,bodyParser.urlencoded()
,(req,res,next)=>
{

console.log(req.body);

// Actual implementation would check values in a database
if(req.body.userName!="" && req.body.password!="") 
{

request.post('https://apis.tradetipsapp.com/api/auth/appSignIn',
    { formData : { 'userName': req.body.userName ,'password': req.body.password } },
    function (error, response, body) {
  
    	var dataResult = JSON.parse(body);
        var tokens = dataResult.accessToken; 
	    const uid = dataResult.id;
	    const email = dataResult.email;
	    const createdOn = dataResult.createdOn;
    	console.log(tokens);  

    	res.locals.uname = req.body.userName
    	res.locals.tokens = tokens;
    	res.locals.uid = uid;
    	res.locals.email = email;
    	res.locals.createdOn = createdOn;
		next()  
    });
}
else
res.sendStatus(401)
}
,(req,res)=>
{
req.session.loggedIn = true
req.session.username = res.locals.uname
req.session.tokens = res.locals.tokens
req.session.uid = res.locals.uid
req.session.email = res.locals.email
req.session.createdOn = res.locals.createdOn

console.log(req.session)
var data = req.session;

return res.redirect('/dashboard');
});

/////////////////////////////////////////////////////////////////////////////////
app.get('/logout',(req,res)=>
{
req.session.destroy((err)=>{})
return res.redirect('/');

});
/////////////////////////////////////////
//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//httpServer.listen(port);
httpsServer.listen(port);
console.log('The magic happens on port ' + port);