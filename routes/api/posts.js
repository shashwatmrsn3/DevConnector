const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check,validationResult} = require('express-validator/check');
const Post = require('../../model/Post'); 
const User = require('../../model/User');
const Profile = require('../../model/Profile');


router.post("/",[auth,[
    check('text','Text is required').not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400),json({errors:errors.array()});
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        }) ;   

        const post = await newPost.save();
        res.json(post);
    } catch (error) {
        console.error(console.error.message);
        res.status(500).send('Server error');
        
    }
     
});

module.exports = router;