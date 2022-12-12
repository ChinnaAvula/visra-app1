const mongoose=require('mongoose');
const mongoDBpath='mongodb://0.0.0.0:27017/expressjs-database';

mongoose
.connect(mongoDBpath)
.then(() => console.log('connected to db'))
.catch((err)=>console.log(err));
