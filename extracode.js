//some routes examples
router.post('/groceries/shopping/cart/item',function(req,res){
    const {item,quantity}=req.body;
    const itemValue={item,quantity};
    const {cart}=req.session;
    if(cart){
        req.session.cart.items.push(itemValue);
    }else{
        items:[itemValue];
    }
    res.send(201);
});

router.get('/groceries/shopping/cart',function(req,res){
    const {cart}=req.session;
    if(!cart){
        res.send('not');
        console.log('session cart');
    }else{
        res.send(cart);
    }
});


//cookie initialization
router.get('/groceries',function(req,res){
    res.cookie('visited',true,{
        maxAge:60000,
    });
    res.cookie('visited2',true,{
        maxAge:60000,
    });

    res.send(list);
    console.log('request data is executed sucessfully');

});

//cookie callin and params using and some comparision
router.get('/groceries/:item',function(req,res){
    console.log(req.cookies);
    const {item}=req.params;
    const groceryItem=list.find((g) =>g.item==item);
    res.send(groceryItem);
});

//google authentication code passport-setup

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});