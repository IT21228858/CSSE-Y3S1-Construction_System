const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId
var md5 = require('md5')

var { User } = require('../models/User')

router.get('/',(req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    User.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/login', async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let userFound = await User.findOne({ email: email });
    if (userFound) {
        if(md5(password)==userFound.password){
            if(userFound.usertype=="admin"){
                res.send(JSON.stringify({"res":"admin",email:userFound.email,id:userFound._id}));
            }else{
                res.send(JSON.stringify({"res":"user",email:userFound.email,id:userFound._id}));
            }
        }else{
            res.status(200).send(JSON.stringify({"err":"Incorrect Password"}));
        }
    } else {
        res.status(200).send(JSON.stringify({"err":"User not found"}));
    }
});

router.post('/',(req,res)=>{
    var newRecord= new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        password: md5(req.body.password),
        usertype: 'user'
    })

    newRecord.save((err,docs)=>{
        if(!err){
            console.log(docs)
            res.send(docs)
        }else{
            console.log(err)
            if(err['keyPattern']['email']==1){
                console.log(err['keyPattern']['email'])
                res.status(200).send({"err":"email"})
            }else{
                res.status(err)
            }
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    var updateRecords={
        usertype: req.body.usertype
    }

    User.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    User.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = router