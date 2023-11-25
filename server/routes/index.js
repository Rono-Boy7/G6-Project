// Coding/Commenting Done By Anish Mistry

let express = require('express');
let router = express.Router();

/* home page. */
router.get('/', (req, res, next)=> {
    res.render('index', {  title: 'Home'   }); //Render The Home Page
});

/* home page. */
router.get('/home',  (req, res, next)=> {
    res.render('index', {  title: 'Home'   });  // Render The Home Page 
});
 

/* contact page. */
router.get('/contact', (req, res, next)=> {
    res.render('contact', { title: 'Contact Us?'  });  //Render The Contact Page
  });

module.exports = router;
