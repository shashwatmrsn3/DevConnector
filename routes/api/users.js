const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>res.send("ussers route"));

module.exports = router;