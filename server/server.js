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
const { Brand } = require('./models/brand');
const { Type } = require('./models/type');
const { Product } = require('./models/product');

//=================================
//           MiDDLEWARE
//=================================

const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//=================================
//           PRODUCTS
//=================================

app.get('/api/product/article_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
    find({'_id':{$in:items}}).
    populate('brand').
    populate('type').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.post('/api/product/article', auth,admin, (req,res) =>{
    const product = new Product(req.body);

    product.save((err,doc) =>{
        if (err) return res.json({success:false, err});
        res.status(200).json({
            success:true,
            article: doc
        })
    })
})

//=================================
//           TYPES
//=================================

app.post('/api/product/type', auth,admin, (req,res) =>{
    const type = new Type(req.body);

    type.save((err,doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success:true,
            type:doc
        })
    })

});

app.get('/api/product/types', auth,admin, (req,res) =>{
    Type.find({},(err,types)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(types)
    })
})

//=================================
//           BRANDS
//=================================

app.post('/api/product/brand', auth,admin, (req,res) =>{

    const brand = new Brand(req.body);

    brand.save((err,doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success:true,
            brand:doc
        })
    })
})

app.get('/api/product/brands', auth,admin, (req,res) =>{
    Brand.find({},(err,brands)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(brands)
    })
})


//=================================
//           USERS
//=================================

app.get('/api/users/auth' ,auth, (req,res) =>{
    
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })

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

app.get('/api/users/logout', auth,(req,res) => {
        User.findOneAndUpdate(
            {_id: req.user._id},
            {token: ''},
            (err,doc)=>{
                if (err) return res.json({success:false,err});
                return res.status(200). send({
                    success:true
                })
            }
        )
})

const port = process.env.port || 3002;

app.listen(port,() => {
    console.log(`server running at ${port}`)
})

