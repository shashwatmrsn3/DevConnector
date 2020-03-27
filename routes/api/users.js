const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const User = require('../../model/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post("/",
[
    check('name','name is required').not().isEmpty(),
    check('email','Please enter a valid email').isEmail(),
    check('password','Password should be minimun 6 characters').isLength({min:6})
], async (req,res)=>{
    const errs = validationResult(req);
    if(!errs.isEmpty()){
        return res.status(400).json({errors:errs.array()});
    }

    const {name,email,password} = req.body; 
    try{
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg:'user already exists'}]});
        } 
        const avatar = gravatar.url(email,{s:'200',r:'pg',d:'mm'});
            user = new User({name,email,avatar,password});
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);
            await user.save();
            const payload = {
                user:{
                    id:user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn:360000},
                (err,token)=>{
                    if(err) throw err;
                    res.json({token});
                }
            );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;