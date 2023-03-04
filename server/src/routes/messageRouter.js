const express = require('express')
const router = express.Router()
const Message=require('../models/message')
router.post("/message", async (req, res) => {
    try {
        await Message.create(req.body)
        console.log(req.body)
        res.json({
            msg:"mdg delivered"
        })
} catch (err){
    
    }
       
  });
  module.exports = router;