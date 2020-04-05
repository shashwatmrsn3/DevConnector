const express = require('express');
const router = express.Router();
const auth  = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const User = require('../../model/User');
const {check,validationResult} = require('express-validator/check');


router.get("/me",auth,async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:"There is no profile for this user"});
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post("/",[auth,[
    check("status","Status is required").not().isEmpty(),
    check("skills","skills is required").not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instagram,linkedin} = req.body;
    const profilefields = {};
    profilefields.user = req.user.id;
    if(company ) profilefields.company = company;
    if(website) profilefields.website = website;
    if(location) profilefields.location = location;
    if(bio) profilefields.bio = bio;
    if(status) profilefields.status = status;
    if(githubusername) profilefields.githubusername = githubusername;
    if(skills){
        profilefields.skills=skills.split(',').map(skill=>skill.trim());

    }
    profilefields.social = {};
    if(youtube)  profilefields.social.youtube = youtube;
    if(twitter)  profilefields.social.twitter = twitter;
    if(facebook) profilefields.social.facebook = facebook;
    if(linkedin) profilefields.social.linkedin = linkedin;
    if(instagram) profilefields.social.instagram = instagram;
    console.log(profilefields.skills);

    try{
        let profile  =await Profile.findOne({user:req.user.id});
        if(profile){
            profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profilefields},{new:true});
        }
       

        profile  = new Profile(profilefields);
        await profile.save();
        return res.json(profile)
    }catch(err){
        res.status(500).send("Server Error");
    }
});

router.get("/",async (req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

router.get("/user/:user_id",async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile) return res.status(400).json({msg:"there is no profile for this user"});
        res.json(profile);
    } catch (err) {
        if(err.kind=='ObjectId'){
            return res.status(400).json({msg:"there is no profile for this user"});
        }
        res.status(500).send("Server error");
    }
});


router.put('/experience',[auth,[
    check('title','title is required').not().isEmpty(),
    check('company','title is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty(),
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {title,company,location,from,to,current,description} = req.body;
    const newExp = {title,company,location,from,to,current,description};
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/education',[auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','field of study is required').not().isEmpty(),

    check('from','from date is required').not().isEmpty(),
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {school,degree,fieldofstudy,from,to,current,description} = req.body;
    const newEdu = {school,degree,fieldofstudy,from,to,current,description};
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;