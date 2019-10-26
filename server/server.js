const express = require('express');// server
const bodyParser = require('body-parser'); // brings json from actual request --check packe if installed
const cookieParser = require('cookie-parser'); // for cookies

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE) // connnect to db

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//=================================
//           MODELS
//=================================

const { User } = require('./models/user');

//=================================
//           USERS
//=================================

app.post('/api/users/register', (req,res) => {
    
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success:true,
            userdata:doc
        })
    })

})



const port = process.env.port || 3002;

app.listen(port,() => {
    console.log(`server running at ${port}`)
})

