const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId

var { PR } = require('../models/PR')

router.put('/orderUp/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    var updateRecords= {
        delivery_date: req.body.delivery_date,
        itemsR: req.body.itemsR,
        quality: req.body.quality,
        quantity: req.body.quantity,
        damage: req.body.damage,
    }

    PR.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(err)
            res.status(200).send({"err":"error"})
        }
    })
})

router.get('/',(req,res)=>{
    PR.find((err,docs)=>{
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

    PR.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/my/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    PR.find({ userId: req.params.id , $or: [
        { status:"pending" },
        { status:"reject" }
    ] },(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/success/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    PR.find({ userId: req.params.id , status:"success" },(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{
    var newRecord= new PR({
        userId: req.body.userId,
        date: req.body.date,
        item: req.body.item,
        address: req.body.address,
        siteName: req.body.siteName,
        instructions: req.body.instructions,
        total: req.body.total,
        status: 'pending',
        delivery_date: "",
        itemsR: "",
        quality: "",
        quantity: "",
        damage: ""
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(err)
            res.status(200).send({"err":"error"})
        }
    })
})

router.put('/orderUp/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    var updateRecords= {
        delivery_date: req.body.delivery_date,
        itemsR: req.body.itemsR,
        quality: req.body.quality,
        quantity: req.body.quantity,
        damage: req.body.damage,
    }

    PR.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(err)
            res.status(200).send({"err":"error"})
        }
    })
})

router.put('/status/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    var updateRecords= {
        status: req.body.status
    }

    PR.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(err)
            res.status(200).send({"err":"error"})
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    var updateRecords= {
        m_note: req.body.m_note,
        prescription: req.body.prescription,
        appointment_id: req.body.appointment_id
    }

    PR.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(err)
            res.status(200).send({"err":"error"})
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    PR.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = router