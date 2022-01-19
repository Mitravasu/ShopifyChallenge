const express = require('express');
const mongoose = require('mongoose');
const Item = require('../models/items_model');

exports.getItems = (req, res) => {
    Item.find()
        .exec()
        .then((data) => {
            res.status(200).json(data)
        })
}

exports.postUsers = (req, res) => {
    // console.log(req.body);
    // res.status(200);
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        stock: req.body.stock
    })

    Item.findOne({name:req.body.name})
        .exec()
        .then((data)=>{
            if(!data) {
                item.save()
                    .then((result) => {
                        console.log(result)
                        res.status(201).json({
                            message: "Successfully added item",
                            item: item
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    });
            } else {
                res.status(500).json({message: "Item already exists!"})
            }
        })
}

exports.deleteItems = (req, res) => {
    Item.findOne({name:req.body.name})
        .exec()
        .then((data)=>{
            if(!data) {
                // meaning no item found
                res.status(404).json({message: "No such item exists!"})
            } else {
                Item.deleteOne({name: req.body.name})
                    .then(() => {
                        res.status(200).json({message: "Item deleted successfully!"})
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })

}