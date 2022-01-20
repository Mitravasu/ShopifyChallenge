const express = require('express');
const mongoose = require('mongoose');
const Group = require('../models/groups_model');
const path = require('path')

exports.getGroups = (req, res) => {
    Group.find()
        .exec()
        .then((data) => {
            res.status(200).json(data)
        })
}

exports.postGroups = (req, res) => {
    // console.log(req.body);
    // res.status(200);
    console.log(req.body);

    const temp = {_id: new mongoose.Types.ObjectId()}
    const group = new Group(Object.assign(temp,req.body))

    // const item = new Item({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     stock: req.body.stock
    // })

    Group.findOne({name:req.body.name})
        .exec()
        .then((data)=>{
            if(!data) {
                group.save()
                    .then((result) => {
                        console.log(result)
                        res.status(201).json({
                            message: "Successfully added Group",
                            group: group
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    });
            } else {
                res.status(500).json({message: "Group already exists!"})
            }
        })
}