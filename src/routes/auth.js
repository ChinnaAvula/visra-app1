const Router=require('express');
const session=require('express-session');
require('dotenv').config();
const router=Router();
const passport=require('passport');



//importing routes
const user=require('../Database/schemas/user');
const {hashpassword,comparePassword}=require('../utils/helpers');
require('../utils/passport-setup');

//register route
router.post('/register',async(req,res)=>{
  const {username,email}=req.body;
  const userDB= await user.findOne({email});
  if(userDB){
   res.status(400).send({msg:'user already exits!'});
  }else{
   const password=hashpassword(req.body.password);
   console.log(password);
   const newUser= await user.create({username,password,email});
   newUser.save();
   res.send(201);
  }
});

//login route.
router.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.send(400);
  }
  const userDB=await user.findOne({email});
  if(!userDB){
    console.log('incorrect email');
     return res.send(400);
    
  }
  const isValid=comparePassword(password,userDB.password);
  if(isValid){
    console.log('authenticated successfully');
    req.session.user=userDB;
    return res.status(200).send('you logined in!!');
  }else{
    console.log('failed to authenticate');
    return res.send(401);
  }
 
});


//google authentication

// Auth Route
function isLoggedIn(req,res,next){
  req.user ? next() : res.sendStatus(401);
}

router.use(session({
  secret:'It is session',
  resave:false,
  saveUninitialized:false,
}));

router.use(passport.initialize());
router.use(passport.session());


router.get('/',function(req,res) {
  res.send('<a href="/google">authenticate with google</a>');
});

router.get('/google', passport.authenticate('google', { scope: ['email','profile'] }));



router.get('/google/callback', passport.authenticate('google',{
  successRedirect:'/success',
  failureRedirect:'/failure',
})
);

router.get('/failure',(req,res) =>{
  res.status(400).send('you failed to authenticate');
});

router.get('/success',isLoggedIn, (req, res) =>{
  res.send(`hello ${req.user.displayName}`);
});

router.get('/logout',(req,res)=>{

});


module.exports=router;
