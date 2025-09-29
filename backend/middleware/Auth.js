const jwt= require('jsonwebtoken');
const ensureAuthenticated = (req,res,next)=>{
    const auth = req.header('authorization');
    if(!auth){
        return res.status(400).json({meassage: 'unauthorized, JWT token is require'});
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(403).json({message: 'unauthorized, JWT token is require'})

    }
}

module.exports= ensureAuthenticated;