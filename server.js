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
var bodyParser = require('body-parser');
const serviceAccount = require('./serviceAccountKey.json');
//initialize admin SDK using serciceAcountKey

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatdemo-96e4f.firebaseio.com"

});
const db = admin.firestore();
// idToken comes from the client app





 
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


 app.get('/', function(req, res) {

  	console.log(req.query.path);

  	var fpaths = req.query.path;

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('dashboard.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});


	   } else {
	     res.render('index.ejs' , {path:fpaths});
	   }
  });
///////////////////////////////////////////////////////////////////////////////////////

app.get('/dashboard',(req,res)=>
{
if(req.session.loggedIn) 
{
var fdata = req.session.tokens;
var fusername = req.session.username;
var fuid = req.session.uid; 
var femail = req.session.email; 
var Chat_fcmtoken = req.session.fcmtoken;

res.render('dashboard.ejs', {fcmtoken : Chat_fcmtoken , tokens : fdata , userName : fusername , userid : fuid , email :femail});
}
else
res.redirect('/')
})

//////////////////////////////////////////////////////////////////////

app.get('/stockChart', function(req, res) {

	if(req.session.loggedIn) 
	{
	var fdata = req.session.tokens;
	var fusername = req.session.username;
	var fuid = req.session.uid; 
	var femail = req.session.email; 


    var mentorids = req.query.id;

    var symbol = req.query.stockName;

   

    res.render('stockChart.ejs' , { tokens : fdata , userName : fusername , userid : fuid , email :femail,tipsIds : mentorids , stockSymbol : symbol});
    }
	else
	res.redirect('/')
  });

/////////////////////////////////////////////////////////////////

app.get('/prediction', function(req, res) {

	if(req.session.loggedIn) 
	{
	var fdata = req.session.tokens;
	var fusername = req.session.username;
	var fuid = req.session.uid; 
	var femail = req.session.email; 


    var mentorids = req.query.id;

    var symbol = req.query.stockName;

   

    res.render('prediction.ejs' , { tokens : fdata , userName : fusername , userid : fuid , email :femail,tipsIds : mentorids , stockSymbol : symbol});
    }
	else
	res.redirect('/')
  });

/////////////////////////////////////////////////////////////////

    app.get('/profile', function(req, res) {

	    if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('profile.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }
  });


///////////////////////////////////////////////////////////////////////
app.get('/settings', function(req, res) {

	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('profile.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

//////////////////////////////////////////////////////////////////////////////////////

   app.get('/myprofile', function(req, res) {

   	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 
		var fdate = req.session.createdOn;

		res.render('follower.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail , date : fdate});

	   } else {
	     res.redirect('/')
	   }

  });

//////////////////////////////////////////////////////////////////////////////

   app.get('/visitProfile', function(req, res) {

   	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 
		var fdate = req.session.createdOn;
		var visitedNames = req.query.Names;
		var visitedIds = req.query.Ids;
		//var visitedDates = req.query.dates;

		res.render('visitProfile.ejs', {visitedName : visitedNames ,visitedId : visitedIds , tokens : fdata , userName : fusername , userid : fuid , email :femail , date : fdate});

	   } else {
	     res.redirect('/')
	   }

  });

  /////////////////////////////////////////////////////////////////////

   app.get('/followUserList', function(req, res) {

   	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('followUserList.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });



//////////////////////////////////////////////////////////////////////

    app.get('/room', function(req, res) {

        const admin = require('firebase-admin');
  
        const db = admin.firestore();

	    if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 
			var Chat_fcmtoken = req.session.fcmtoken;
		var uniquereplyId = req.query.messageId;

		res.render('room.ejs', {uniquereply : uniquereplyId , tokens : fdata ,fcmToken : Chat_fcmtoken , userName : fusername , userid : fuid , email :femail});

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


 app.get('/macdDetails', function(req, res) {
    
     if(req.session.loggedIn) { 
    var mentorids = req.query.id;

    var symbol = req.query.stockName;

        var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

        res.render('macdDetails.ejs' , {tipsIds : mentorids , stockSymbol : symbol ,tokens : fdata , userName : fusername , userid : fuid , email :femail});
     
      } else {
	     res.redirect('/')
	   }

  });

////////////////////////////////////////////////////////////////////////

 app.get('/macdSellDetails', function(req, res) {
    
     if(req.session.loggedIn) { 
    var mentorids = req.query.id;

    var symbol = req.query.stockName;

        var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

        res.render('macdSellDetails.ejs' , {tipsIds : mentorids , stockSymbol : symbol ,tokens : fdata , userName : fusername , userid : fuid , email :femail});
     
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

//////////////////////////////////////////////////////////////////////////////////////////////////


 app.get('/MACDTips', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('macdtipService.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });




///////////////////////////////////////////////////////////////////////////////////////////////

app.get('/Buy1Get1Free', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('buy1get1freeService.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

///////////////////////////////////////////////////////////////////////////

app.get('/Buy1Get2Free', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('buy1get2freeService.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });



///////////////////////////////////////////////////////////////////////////

app.get('/DiscountDeal', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('discountdealService.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });


///////////////////////////////////////////////////////////////////////////

app.get('/ExclusiveOffer', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('exclusiveofferService.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

///////////////////////////////////////////////////////////////////////////

app.get('/SpecialService', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('specialService.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });

///////////////////////////////////////////////////////////////////////////

app.get('/StocksToWatch', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('stockstowatchService.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });


///////////////////////////////////////////////////////////////////////////

app.get('/SubscribeGetMore', function(req, res) {

  	 if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('subscribegetService.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }

  });





///////////////////////////////////////////////////////////////////////////////////////////////




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

  	console.log(req.route.path);

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('services.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.render('index.ejs' , {path : req.route.path});
	   }
  });

  /////////////////////////////////////////////////////////////////

  app.post('/imageUser', function(req, res) {


	const request = require('request');
	const fs = require('fs');
	console.log(req.body);
	async function download(url, dest) {

    /* Create an empty file where we can save data */
    const file = fs.createWriteStream(dest);

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    await new Promise((resolve, reject) => {
      request({
        /* Here you should specify the exact link to the file you are trying to download */
        uri: req.body.imageUrl,
        gzip: true,
      })
          .pipe(file)
          .on('finish', async () => {
            console.log(`The file is finished downloading.`);
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
      })
        .catch((error) => {
          console.log(`Something happened: ${error}`);
        });
   }

	// example

	(async () => {
		var filepath = 'public/images/uploadimage/'+req.body.imageName+'.jpg';
	  	const data = await download(req.body.imageurl, filepath);
	  	// console.log(data); // The file is finished downloading.
	})();

	res.send(200);

});


 //////////////////////////////////////////////////////////////////////////////
   app.post('/imagetweet', function(req, res) {

	 // console.log(req.body.dataUrl);

	 // console.log(req.body.objecturls);

	 const imageDataURI = require('image-data-uri');

		const fs = require('fs');
		const path = require('path');
		const config = require('./config');

		const apiClient = config.newClient();
		const uploadClient = config.newClient('upload');


	 let dataURI = req.body.dataUrl;

	 var url = req.body.objecturls;

	 const last = url.split("/")
	 const lastItem = last[last.length-1];
     let filePath = 'images/uploadscreenshot/'+lastItem;
 	imageDataURI.outputFile(dataURI, filePath)
    .then(function(resk){
    	console.log(resk);
    	const mediaFile = fs.readFileSync(resk);
    	fs.unlink(resk, (err) => {
        if (err) {
            console.log("failed to delete local image:"+err);
        } else {
            console.log('successfully deleted local image');                                
        }

        });
		const base64image = Buffer.from(mediaFile).toString('base64');

		uploadClient.post('media/upload', { media_data: base64image }).then(media => {
		console.log('You successfully uploaded media');

		var media_id = media.media_id_string;
		console.log(media_id);

		apiClient.post('statuses/update', { status: '', media_ids: media_id }).then(tweet => {
			res.send(tweet);
			// console.log(tweet);
			console.log("https://twitter.com/intent/tweet?text="+tweet.text);
		   
		    console.log('Your image tweet is posted successfully');
		}).catch(console.error);

		}).catch(console.error);

    });



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

app.get('/faq', function(req, res) {

	    if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('faq.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }
  });

/// //////////////////////////////////////////////////////////////


app.get('/forgetPassword', function(req, res) {

    
    res.render('forgetPassword.ejs');



  });

//////////////////////////////////////////////////////////////////////

    app.get('/notification', function(req, res) {

	    if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 

		res.render('notification.ejs', {tokens : fdata , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }
  });

/// //////////////////////////////////////////////////////////////



  app.get('/chatWindow', function(req, res) {

    const admin = require('firebase-admin');
  
    const db = admin.firestore();

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 
		var Chat_fcmtoken = req.session.fcmtoken;
		var uniquereplyId = req.query.messageId;

		res.render('chatWindow.ejs', {uniquereply : uniquereplyId ,tokens : fdata , fcmToken : Chat_fcmtoken , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }


  });

  ///////////////////////////////////////////////////////////////




  app.get('/chatWindowAdminUser', function(req, res) {

    const admin = require('firebase-admin');
  
    const db = admin.firestore();

     if(req.session.loggedIn) 
	   { 
		var fdata = req.session.tokens;
		var fusername = req.session.username;
		var fuid = req.session.uid; 
		var femail = req.session.email; 
		var Chat_fcmtoken = req.session.fcmtoken;

		res.render('chatWindowAdminUser.ejs', {tokens : fdata , fcmToken : Chat_fcmtoken , userName : fusername , userid : fuid , email :femail});

	   } else {
	     res.redirect('/')
	   }


  });

   ///////////////////////////////////////////////////////////////////////////

   app.post('/sendEmail', function(req, res) {

  	console.log(req.query.serviceName);

   var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vermayash1120@gmail.com',
    pass: 'Ab123456@'
  }
});

var mailOptions = {
  from: 'vermayash1120@gmail.com',
  to: 'seanlives@gmail.com',
  subject: 'New Service Created',
  text: 'There is a new '+req.query.serviceName+' created on the mentor dashboard. ' + '\r\n\n' + ' Please check it.'
};


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);

  }
});

  });


 ///////////////////////////////////////////////////////////////////////////

   app.post('/sendUpdatedEmail', function(req, res) {

  	console.log(req.query.serviceName);

   var nodemailers = require('nodemailer');

var transporter = nodemailers.createTransport({
  service: 'gmail',
  auth: {
    user: 'vermayash1120@gmail.com',
    pass: 'Ab123456@'
  }
});

var mailOptions = {
  from: 'vermayash1120@gmail.com',
  to: 'seanlives@gmail.com',
  subject: 'Service Updated',
  text: 'There have been some changes done to a '+req.query.serviceName+ '.' + '\r\n\n' + 'Please check it.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

  });

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   
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

// console.log(req.body);
// console.log(req.body.url);

// console.log(req);
// Actual implementation would check values in a database
if(req.body.userName!="" && req.body.password!="") 
{

request.post('https://apis.tradetipsapp.com/api/auth/appSignIn',
    { formData : { 'userName': req.body.userName ,'password': req.body.password } },
    function (error, response, body) {
        // console.log(response);
    	var dataResult = JSON.parse(body);
    	// console.log(dataResult);
    	if(dataResult.accessToken){                  
        if(req.body.userName != "admin"  && dataResult.isMentor == "true"){
          // $("#success").show();
          // $('#success').html('Login Sucessfully !');


        var tokens = dataResult.accessToken; 
        var fcmtoken = dataResult.fcmToken;

	    const uid = dataResult.id;
	    const email = dataResult.email;
	    const createdOn = dataResult.createdOn;
    	// console.log(tokens);  
    	const paths = req.body.url;
    	// console.log(paths);

    	res.locals.uname = req.body.userName;
    	res.locals.fcm = fcmtoken;
    	res.locals.tokens = tokens;
    	res.locals.uid = uid;
    	res.locals.email = email;
    	res.locals.createdOn = createdOn;
    	res.locals.paths = paths;
		next()  
		 } else{
            // res.render("index.ejs" , {message: 'Invalid Username or Password !!!'});
            // res.setTimeout(3000);
            return res.redirect('/');
          }                                       
        }
      else if(dataResult.statusCode==201){
        // alert('Invalid Username or Password !!!');
        // res.render("index.ejs" , {message: 'Invalid Username or Password !!!'});
        // res.setTimeout(3000);
        return res.redirect('/');
      } else {
        // alert('Invalid Username or Password !!!');
        // res.render("index.ejs" , {message: 'Invalid Username or Password !!!'});
        // res.setTimeout(3000);
        return res.redirect('/');

      }

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
req.session.fcmtoken = res.locals.fcm
req.session.uid = res.locals.uid
req.session.email = res.locals.email
req.session.createdOn = res.locals.createdOn
req.session.paths = res.locals.paths

console.log(req.session)
var data = req.session;

if(req.session.paths != "undefined"){
return res.redirect(req.session.paths);

}else{

return res.redirect('/dashboard');

}

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