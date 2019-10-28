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

app.get('/api/users/auth' , (req,res) =>{
    
})

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

app.post('/api/users/login',(req,res)=>{
    
    User.findOne({'email': req.body.email}, (err,user)=>{
        if(!user) return res.json({loginSuccess:false, message:'Ath failed! email not founf'}); // checks for email if found

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false, message:'Wrong password'});

            user.generateToken((err, user)=>{  
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })
            
            })
        })

    })

})


const port = process.env.port || 3002;

app.listen(port,() => {
    console.log(`server running at ${port}`)
})

