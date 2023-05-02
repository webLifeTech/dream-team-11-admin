const express = require('express')
const router = express.Router()
const tournamentsModel = require('../model/tournaments.model');
const upload_files = require('./upload_files.routes');

// For save tournament
router.post('/save-tournament', async (req, res) => {
    try {
        console.log("req.body>>", req.body);
        const table = await new tournamentsModel(req.body).save();
        // (For old App there need tournament_id)
        const data = await tournamentsModel.updateOne({
          _id: table._id
        }, {tournament_id : table._id});
        res.json({
            data: table,
            status: true,
            msg: 'Tournament added successfully'
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

// For get all tournament
router.post('/get-all-tournament', async (req, res) => {
    try {
        const data = await tournamentsModel.find().populate('category_id', 'category_name').sort('position');
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

// For get single tournament by id
router.post('/get-tournament-byid', async (req, res) => {
    try {
        const data = await tournamentsModel.findOne({
            _id: req.body._id
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

// For update tournament
router.post('/update-tournament', async (req, res) => {
    try {
        console.log("req.body>>>", req.body);
        const data = await tournamentsModel.updateOne({
            _id: req.body._id
        }, req.body);
        console.log("data>>>", data);

        res.json({
            status: true,
            msg: 'Tournament updated successfully'
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

// For delete tournament
router.post('/delete-tournament', async (req, res) => {
    try {
        const data = await tournamentsModel.deleteOne({
            _id: req.body._id
        })
        res.json({
            status: true,
            msg: 'Tournament has been deleted successfully'
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
