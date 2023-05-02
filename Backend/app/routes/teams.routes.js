const express = require('express')
const router = express.Router()
const teamsModel = require('../model/teams.model');

// For save team
router.post('/save-team', async (req, res) => {
    try {
        console.log("req.body>>", req.body);
        const table = await new teamsModel(req.body).save();
        // (For old App there need team_id)
        const data = await teamsModel.updateOne({
          _id: table._id
        }, {team_id : table._id});
        res.json({
            data: table,
            status: true,
            msg: 'Team added successfully'
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

// For get all team
router.post('/get-all-team', async (req, res) => {
    try {
        const data = await teamsModel.find().populate('category_id', 'category_name').sort('position');
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

// For get single team by id
router.post('/get-team-byid', async (req, res) => {
    try {
        const data = await teamsModel.findOne({
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

// For update team
router.post('/update-team', async (req, res) => {
    try {
        console.log("req.body>>>", req.body);
        const data = await teamsModel.updateOne({
            _id: req.body._id
        }, req.body);
        console.log("data>>>", data);

        res.json({
            status: true,
            msg: 'Team updated successfully'
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

// For delete team
router.post('/delete-team', async (req, res) => {
    try {
        const data = await teamsModel.deleteOne({
            _id: req.body._id
        })
        res.json({
            status: true,
            msg: 'Team has been deleted successfully'
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
