const express = require('express')
const router = express.Router()
const categoriesModel = require('../model/categories.model')

// For save category (For old App)
router.post('/save-category', async (req, res) => {
    try {
        console.log("req.body>>", req.body);
        const table = await new categoriesModel(req.body).save();
        const data = await categoriesModel.updateOne({
          _id: table._id
        }, {category_id : table._id});
        res.json({
            data: table,
            status: true,
            ResponseMsg: 'Airline added successfully'
        })
    } catch (error) {
        console.log("error>>", error);
        res.json({
            status: false,
            ResponseMsg: 'Something went Wrong',
            error: error
        })
    }
})

// For get all airline
router.get('/get-all', async (req, res) => {
    try {
        const data = await categoriesModel.find().sort('createdAt');
        res.json({
            data: data,
            status: true,
            msg: 'Success'
        })
    } catch (error) {
        console.log("error>>", error);
        res.json({
            status: false,
            msg: 'Something went Wrong',
            error: error
        })
    }
})

// For get single airline by id
router.get('/get-byid/:airlineId', async (req, res) => {
    try {
        console.log("airlineId>>>", req.params.airlineId)
        const data = await categoriesModel.findOne({
            _id: req.params.airlineId
        }).sort('createdAt');
        console.log("data>>>>", data);
        res.json({
            data: data,
            status: true,
            msg: 'Success'
        })
    } catch (error) {
        console.log("error>>", error);
        res.json({
            status: false,
            msg: 'Something went Wrong',
            error: error
        })
    }
})

// For update airline
router.put('/update', async (req, res) => {
    try {
        console.log("req.body>>>", req.body);
        const data = await categoriesModel.updateOne({
            _id: req.body._id
        }, req.body);
        console.log("data>>>", data);

        res.json({
            status: true,
            msg: 'Airline updated successfully'
        })
    } catch (error) {
        console.log("error>>", error);
        res.json({
            status: false,
            msg: 'Something went Wrong',
            error: error
        })
    }
})

// For delete airline
router.delete('/delete/:airlineId', async (req, res) => {
    try {
        const data = await categoriesModel.deleteOne({
            _id: req.params.airlineId
        })
        res.json({
            status: true,
            msg: 'Airline has been deleted successfully'
        })
    } catch (error) {
        console.log("error>>", error);
        res.json({
            status: false,
            msg: 'Something went Wrong',
            error: error
        })
    }
})

module.exports = router;
