const express = require('express')
const router = express.Router()
const matchsModel = require('../model/matchs.model');
const upload_files = require('./upload_files.routes');

// For save matche
router.post('/save-match', async (req, res) => {
    try {
        console.log("req.body>>", req.body);
        const table = await new matchsModel(req.body).save();
        // (For old App there need match_id)
        const data = await matchsModel.updateOne({
          _id: table._id
        }, {match_id : table._id});
        res.json({
            data: table,
            status: true,
            msg: 'matche added successfully'
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

// For get all matche
router.post('/get-all-match', async (req, res) => {
    try {
        const data = await matchsModel.find().populate([
          {path: 'match_category', select: 'category_name'},
          {path: 'team1data', select: 'team_name team_short_name team_logo'},
          {path: 'team2data', select: 'team_name team_short_name team_logo'}
        ]).sort('position');
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

// For get single matche by id
router.post('/get-match-byid', async (req, res) => {
    try {
        const data = await matchsModel.findOne({
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

// For update matche
router.post('/update-match', async (req, res) => {
    try {
        console.log("req.body>>>", req.body);
        const data = await matchsModel.updateOne({
            _id: req.body._id
        }, req.body);
        console.log("data>>>", data);

        res.json({
            status: true,
            msg: 'matche updated successfully'
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

// For delete matche
router.post('/delete-match', async (req, res) => {
    try {
        const data = await matchsModel.deleteOne({
            _id: req.body._id
        })
        res.json({
            status: true,
            msg: 'matche has been deleted successfully'
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
