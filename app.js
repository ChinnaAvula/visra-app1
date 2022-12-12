//importing packages
const express=require('express');
const app=express();
const session=require('express-session');

//importing routes
require('./src/Database/data');
const authroute=require('./src/routes/auth');
const groceriesroute=require('./src/routes/groceries');

//port number
//enter set PORT=portnumber in cmd.
const port=process.env.PORT||4000;


//middleware
app.use(express.json());
app.use(express.urlencoded());

//calling routes
app.use(authroute);
app.use('/api',groceriesroute);


//calling server
app.listen(port,function(){
    console.log(`app is listening at port:${port}`);
})