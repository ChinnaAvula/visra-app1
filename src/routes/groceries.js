const {Router}=require('express');
const router=Router();

var list=[
    {
        item:'biscuits',
        quantity:2,
    },
    {
        item:'chocolates',
        quantity:2,
    },
    {
        item:'butter',
        quantity:5,
    },
    {
        item:'banana',
        quantity:9,
    },
    {
        item:'orange',
        quantity:8,
    },

];

router.get('/groceries',function(req,res){
    res.send(list);
    console.log('request data is executed');

});

router.get('/groceries/:item',function(req,res){
    const {item}=req.params;
    const groceryItem=list.find((g) =>g.item==item);
    res.send(groceryItem);
});

router.post('/groceries',function(req,res){
    console.log(req.body);
    list.push(req.body);
    res.send(201);
});

module.exports=router;