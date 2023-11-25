// Coding/Commenting Done By Anish Mistry 

var express = require('express');
var router = express.Router();

let Item = require('../models/item');

// Read Operation
router.get('/', async (req,res,next)=>{ //< Mark function as async
    try{
       const ItemList = await Item.find(); //< Use of await keyword
       res.render('items/list', {
          title: 'Active Tournaments', //Give Route To Read The Data From The Database
          ItemList: ItemList
       });
    }catch(err){  // If Not The Raise An Error
       console.error(err);
       res.render('items/list', {
          error: 'Error on server'
       });
    }
 });

//Create Operation
router.get('/add', async (req,res,next)=>{
    try{
        res.render('items/add', // Give Route To Add Data Then redirect To Main Page 
        {
            title:'Add Items'
        })
    }
    catch(err) // If Not The Raise An Error
    {
        console.error(err);
        res.render('items/list',
        {
            error: 'Error on the server'
        });
    }
}); 

router.post('/add', async (req,res,next)=>{  //Give Route To Post Updated Data
    try{
        let newItem = Item({
        "Name":req.body.Name,
        "Sport":req.body.Sport,
        "EndDate":req.body.EndDate,
        "StartDate":req.body.StartDate,
        "Type":req.body.Type
        });
        Item.create(newItem).then(() =>{
            res.redirect('/itemlist')
        })
    }
    catch(error){  // If Not The Raise An Error
        console.error(err);
        res.render('items/list',
        {
            error: 'Error on the server'
        });
    }
});
//Update Operation
router.get('/edit/:id', async (req,res,next)=>{   // Give Route To Update Data On The Database 
    try{
    const id = req.params.id;
    const itemToEdit = await Item.findById(id);
    res.render('items/edit',
    {
        title:'Edit Item',
        Item:itemToEdit
    })
}
catch(error){  // If Not The Raise An Error
    console.error(err);
    res.render('items/list',
    {
        error: 'Error on the server'
    });
}
});

router.post('/edit/:id', async (req,res,next)=>{  // Route To Post The Updated Data 
    try{
        const id = req.params.id;
        let updatedItem = Item({
            "_id":id,
            "Name":req.body.Name,
            "Sport":req.body.Sport,
            "EndDate":req.body.EndDate,
            "StartDate":req.body.StartDate,
            "Type":req.body.Type
        });
        Item.findByIdAndUpdate(id,updatedItem).then(()=>{
            res.redirect('/itemlist')
        });
    }
    catch(error){  // If Not The Raise An Error
        console.error(err);
        res.render('items/list',
        {
            error: 'Error on the server'
        });
    }
});
//Delete Operation
router.get('/delete/:id', async (req,res,next)=>{  //Give Route To Delete A Data Database 
    try{
        let id = req.params.id;
        Item.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/itemlist')
        })
    }
    catch(error){  // If Not The Raise An Error
        console.error(err);
        res.render('items/list',
        {
            error: 'Error on the server'
        });
    }
});

 module.exports = router;