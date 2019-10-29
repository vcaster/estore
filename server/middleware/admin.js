let admin =  (req,res,next) =>{
    if (req.user.role === 0){
        return res.send("Get out!")
    }
    next();
}

module.exports = { admin }