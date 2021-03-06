const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const { ensureAuthenticated } = require('./ensure');
const decode = require('./../decode')

const request = require('request');

Account = mongoose.model('Account');// bringing our model
const app = express();
const path = require('path');
// const user1 = new Account({
//   username: 'osaretin',
//   password: 'makai'
// });
//
// user1.save(function(err, db) {
//     if(err) {
//       console.log(err)
//     }
//     console.log('successively pushed')
//     console.log(db)
// });


router.get('/', function(req, res) {

  if(req.session.id){
    console.log('index page session_id is ', req.session.id); // they all share the same id
  }

  res.render('index');
  // res.redirect('/portfolio')
});




router.get('/register', function(req, res) {
  const session_id = req.session.id || '';
  console.log('register session_id is ', req.session.id);

  res.render('register');
});



router.post('/register', function(req, res, next) {
  Account.register(   new Account({username: req.body.username}),
                      req.body.password,
                      function(err, account) {
                        if(err) {
                          res.render('register', {message:'Your registration information is invalid'});
                        } else {
                          passport.authenticate('local')(req, res, function() {
                            res.redirect('/');
                          });
                        }
                    });
});


// router.get('/port', function(req, res) {
//   res.sendFile(path.join(__dirname, '/port/build/final/'))
//   // res.render('port')
//
// })

router.get('/login', function(req, res, next) {

  res.render('login', { user : req.user });
});


// router.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user) {
//     if (err) { return next(err) }
//     if (!user) { return res.redirect('/login', {message:'Your login or password is incorrect.'}) }
//     req.logIn(user, function(err) {
//       if(err) {return next(err)}
//       return res.redirect('/');
//     });
//
//     // this was causing err....
//     // if(user) {
//     //   req.logIn(user, function(err) {
//     //     return res.redirect('/');
//     //
//     //   });
//     // }
//     // console.log('in here')
//     // res.render('login', {message:'Your login or password is incorrect.'});
//
//     // works as well but can't send the err message
//     // router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: false}));
//
//
//   })(req, res, next);
// });

  router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

//authenticate()'s function signature is standard Connect middleware, which makes it convenient to use as route middleware

router.get('/gallery', ensureAuthenticated ,function(req, res, next) {

    res.render('gallery');
});



// router.post('/gallery', passport.authenticate('local', { successRedirect: '/gallery', failureRedirect: '/login' }));

// router.get('/gallery', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/gallery');
//     });
//   })(req, res, next);
// });

router.get('/summary',ensureAuthenticated,  function(req, res, next) {
  res.render('summary')
});



router.post('/summary', function(req, res, next) {
  const { name, text } = req.body;

  let errors = [];
  if (!name) {
    errors.push({ msg: 'please write text title'});
  }
  if (!text) {
    errors.push({ msg: 'please submit text' });
  }
  if (errors.length > 0) {                //not required
    console.warn('enter name and text!');
  }

  decodedText = decode(text);

  const decodedNestedArray = Object.entries(decodedText.data);  // converting obj to array

  decodedNestedArray.sort(function(a, b) {      //sorting array - most appeared to least
  return b[1] - a[1] ;
  });


  req.session.name = name;                      //setting up local var
  req.session.decodedText = decodedNestedArray;
  req.session.text = text;


  res.redirect('/summary-list');

  // res.render('summary-list', { summary: { textname: name, textcontent: decodedText}});    //but prolly have to redirect

  // ,{'summary': {
  //                           name:name,
  //                           text: decodedText
  //                         }
  // }
});

router.get('/summary-list', function(req, res, next) {
  let name = req.session.name;                  //destructure local var
  let decodedText = req.session.decodedText;
  let text = req.session.text;

  res.render('summary-list', {summary: {name: name, decodedText: decodedText, text: text}});

});


// const fs = require('fs');


// //wow i dont even have to set these up
router.get('/wave', function(req, res, next) {
  console.log(__dirname,'dirname');
  res.sendFile(path.join(__dirname + '/wave/index.html'));
});
//
//
//
// //wow i dont even have to set these up
// router.get('/assignment03', function(req, res, next) {
//   console.log(__dirname,'dirname');
//   res.sendFile(path.join(__dirname + '/assignment03/index.html'));
// });









//
// router.post('/data', function(req, res, next) {
// console.log(req.body,'reqbody');
//   req.session.areacode = req.body;
//   console.log(req.session.areacode, 'areacode req session')
//   res.redirect('/data')
// });
//
// router.get('/data', function(req, res, next) {
//   // req.session.areacode = 44065;
//   let areacode;
//   if (req.session.areacode) {
//     console.log(req.session.areacode)
//     areacode = req.session.areacode;
//     console.log(areacode)
//   } else {
//     areacode = {areacode: 44065}
//   }
// // 41001
//   console.log(areacode.areacode,'arrrrcode')
//   let num = areacode.areacode
//   const retrieved = request(`http://coolwx.com/cgi-bin/findbuoy.cgi?id=${num}`, function(error, response, html){
//     if(error) {
//       console.log('err occured while requesting');
//     }
//     if(!error){
//       const splitData = html.split("<HR>")[1];
//       const splitData2 = splitData.split("</PRE>")[0]
//       const lines = splitData2.split(/\r\n|\n|\r/);
//
//       heights = [];
//       periods = [];
//       acc = 'Height,Period '
//       for (let i = 1; i < lines.length - 1; i ++) {
//         let height = lines[i].substr(71, 4)
//         let period = lines[i].substr(76, 2)
//
//         if (height == '    ' || period == '  '){
//
//         }
//         else{
//           acc += height
//           acc += ','
//           acc += period
//           acc += '\n'
//
//           // console.log(height , period)
//           // res.send(height)
//         }
//       }
//       res.render('postdata', {areacode:acc})
//     }
//   });
//
//   // console.log(retrieved);
//   // res.send(contents.height)
//
// });


// https://github.com/fitnr/buoyant/blob/master/buoyant/buoy.py
// https://www.ndbc.noaa.gov/wstat.shtml
// https://sdf.ndbc.noaa.gov/stations.shtml



//whavter my route /data => post request with number => then retrieve the data from /mydata


router.post('/data', function(req, res, next) {
console.log(req.body,'reqbody');
  req.session.areacode = req.body;
  console.log(req.session.areacode, 'areacode req session')
  res.redirect('/data')
});

let acc;
let areacode;               //lets set default
areacode = {areacode: 52200}


router.get('/data', function(req, res, next) {
  // req.session.areacode = 44065;
  let areacode;
  if (req.session.areacode) {
    console.log(req.session.areacode)
    areacode = req.session.areacode;
    console.log(areacode)
  } else {
    areacode = {areacode: 52200}
  }
// 41001

  console.log(areacode.areacode,'arrrrcode')
  let num = areacode.areacode
  console.log(num)
  const retrieved = request(`http://coolwx.com/cgi-bin/findbuoy.cgi?id=${num}`, function(error, response, html){
    if(error) {
      console.log('err occured while requesting');
    }
    if(!error){
      const splitData = html.split("<HR>")[1];
      const splitData2 = splitData.split("</PRE>")[0]
      const lines = splitData2.split(/\r\n|\n|\r/);

      heights = [];
      periods = [];
      acc = 'Height,Period '
      for (let i = 1; i < lines.length - 1; i ++) {

        let height = lines[i].substr(71, 4)
        let period = lines[i].substr(76, 2)

        if (height == '    ' || period == '  '){

        }
        else{
          acc += height
          acc += ','
          acc += period
          acc += '\n'

          // console.log(height , period)
          // res.send(height)
        }
      }

      // req.session.acc = acc;

      //!important undo this
      res.render('data', {layout: false , areacode: acc})
      // res.redirect('/mydata');
    }
  });

  // console.log(retrieved);
  // res.send(contents.height)
});


router.post('/postdata', function(req, res, next) {
  res.send('test')
  //
  // req.session.areacode = req.body;
  //
  // let areacode;
  // if (req.session.areacode) {
  //   console.log(req.session.areacode, 'req session')
  //   areacode = req.session.areacode;
  // } else {
  //   areacode = {areacode: 52200}
  // }
  //
  // let num = areacode.areacode
  //
  // const retrieved = request(`http://coolwx.com/cgi-bin/findbuoy.cgi?id=${num}`, function(error, response, html){
  //   if(error) {
  //     console.log('err occured while requesting');
  //   }
  //   if(!error){
  //     const splitData = html.split("<HR>")[1];
  //     const splitData2 = splitData.split("</PRE>")[0]
  //     const lines = splitData2.split(/\r\n|\n|\r/);
  //
  //     heights = [];
  //     periods = [];
  //     acc = 'Height,Period '
  //     for (let i = 1; i < lines.length - 1; i ++) {
  //       let lat_lon = lines[i].substr(13, 11)
  //       my_lat_lon = lat_lon;
  //
  //       let height = lines[i].substr(71, 4)
  //       let period = lines[i].substr(76, 2)
  //
  //       if (height == '    ' || period == '  '){ }
  //       else{
  //         acc += height
  //         acc += ','
  //         acc += period
  //         acc += '\n'
  //       }
  //     }
  //
  //     console.log('ok')
  //     res.redirect('/wave')
  //   }
  // });
});

let my_lat_lon = null;
router.post('/mydata', function(req, res, next) {

  if(req.body){
    console.log(req.body,'reqbody');
    req.session.areacode = req.body;
    console.log(req.session.areacode, 'areacode req session')
  }
  else{
    console.warn('reqbody doesnot exist');
  }


  // res.redirect('/mydata')//original
  // res.redirect('/wave')


    let areacode;
    if (req.session.areacode) {
      console.log(req.session.areacode)
      areacode = req.session.areacode;
      console.log(areacode)
    } else {
      areacode = {areacode: 52200}
    }
  // 41001
    console.log(areacode.areacode,'arrrrcode')


    /*
    moved this under post handle bc the areacode gets posted here, retrieved new data, parse, then accumulate on to acc
    -> acc bc it is global,
    -> get request -> renders the most recent pushed post areacode
    */

    let num = areacode.areacode

    console.log(num)
    const retrieved = request(`http://coolwx.com/cgi-bin/findbuoy.cgi?id=${num}`, function(error, response, html){
      if(error) {
        console.log('err occured while requesting');
      }
      if(!error){
        const splitData = html.split("<HR>")[1];
        const splitData2 = splitData.split("</PRE>")[0]
        const lines = splitData2.split(/\r\n|\n|\r/);

        heights = [];
        periods = [];
        acc = 'Height,Period '
        for (let i = 1; i < lines.length - 1; i ++) {
          let lat_lon = lines[i].substr(13, 11)
          console.warn(lat_lon,'lat and longitude')
          my_lat_lon = lat_lon;

          let height = lines[i].substr(71, 4)
          let period = lines[i].substr(76, 2)

          if (height == '    ' || period == '  '){

          }
          else{
            acc += height
            acc += ','
            acc += period
            acc += '\n'

            // console.log(height , period)
            // res.send(height)
          }
        }

        // req.session.acc = acc;

        //!important undo this
        // res.render('mydata', {layout: false , areacode: acc})   //!important changed this to mydata from data
        // res.redirect('/mydata');
        console.log('ok')
        res.redirect('/wave')
      }
    });

});

router.get('/mydata', function(req, res, next) {


//
  let areacode;
  if (req.session.areacode) {
    console.log(req.session.areacode)
    areacode = req.session.areacode;
    console.log(areacode)
  } else {
    areacode = {areacode: 52200}
  }
// 41001
  console.log(areacode.areacode,'arrrrcode')
//
//
//   let num = areacode.areacode
//   console.log(num)
//   const retrieved = request(`http://coolwx.com/cgi-bin/findbuoy.cgi?id=${num}`, function(error, response, html){
//     if(error) {
//       console.log('err occured while requesting');
//     }
//     if(!error){
//       const splitData = html.split("<HR>")[1];
//       const splitData2 = splitData.split("</PRE>")[0]
//       const lines = splitData2.split(/\r\n|\n|\r/);
//
//       heights = [];
//       periods = [];
//       acc = 'Height,Period '
//       for (let i = 1; i < lines.length - 1; i ++) {
//         let height = lines[i].substr(71, 4)
//         let period = lines[i].substr(76, 2)
//
//         if (height == '    ' || period == '  '){
//
//         }
//         else{
//           acc += height
//           acc += ','
//           acc += period
//           acc += '\n'
//
//           // console.log(height , period)
//           // res.send(height)
//         }
//       }
//
//       // req.session.acc = acc;
//
//       //!important undo this
//       res.render('mydata', {layout: false , areacode: acc})   //!important changed this to mydata from data
//       // res.redirect('/mydata');
//     }
//   });

// been causing err here --
  res.render('mydata', {layout: false, areacode: acc, my_lat_lon: my_lat_lon});
});



module.exports = router;
