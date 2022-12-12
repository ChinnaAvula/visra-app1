//importing Router from express 
const {Router}=require('express');
//calling instance of Router method
const router=Router();

//array creation
var superMarkets=[
    //object
    {
        //property:value
        id:1,
        name:'venkat store',
        miles:0.6,
    },
    {
        id:2,
        name:'venkateswara store',
        miles:2.3,
    },
    {
        id:3,
        name:'lakshmi goods',
        miles:1,
    },
    {
        id:4,
        name:'manasvi products',
        miles:2.2,
    },
    {
        id:5,
        name:'super market',
        miles:4,
    },
    {
        id:5,
        name:"sailaja",
        miles:0.2,
    },
];

//query parameter explanation
router.get('/markets/query',function(req,res){
    const {miles}=req.query;
    const parsedMiles=parseInt(miles);
    if(!isNaN(parsedMiles)){
        const filtedStores = superMarkets.filter((g)=> g.miles<=parsedMiles);
        res.send(filtedStores);
    }else res.send('the query is not executed');
    console.log('query executed sucessfully');

});

//get request
router.get('/markets',function(req,res){
    res.send(superMarkets);
    console.log('request executed sucessfully');
});

//post request
router.post('/markets',function(req,res){
    superMarkets.push(req.body);
    console.log('data added');
    res.send(201);
});

//route parameter explanation
router.get('/markets/:id',function(req,res){
    const {id}=req.params;
    const idData=superMarkets.find((g)=> g.id==id);
    res.send(idData);
    console.log('route parameter executed');
});

//exporting markets.js file
module.exports=router;



