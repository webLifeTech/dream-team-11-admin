const express = require('express');
const router = express.Router()
const appDetailsModel = require('../model/appdetails.model');

router.post('/save-app-info', async (req, res) => {
    try{
        let ff = await new appDetailsModel(req.body).save();
        res.json({
            status : true,
            ResponseMsg : "App details Saved Successfully.",
            ResponseCode : 1,
            Result : true
        });
    }catch(error){
        console.log('Error >>>>', error);
        res.json({
            status: false,
            msg: 'Something went Wrong',
            error: error
        });
    }
})

router.post('/update-app-info', async (req, res) => {
    try{
        const data = await appDetailsModel.updateOne({}, req.body);
        res.json({
            status : true,
            ResponseMsg : "App details Updated Successfully.",
            ResponseCode : 1,
            Result : true
        });
    }catch(error){
        console.log('Error >>>>', error);
        res.json({
            status: false,
            msg: 'Something went Wrong',
            error: error
        });
    }
})

router.post('/get_app_info', async (req, res) => {
    try{
        res.json({
            status : true,
            ResponseMsg : "App Details Saved Successfully.",
            ResponseCode : 1,
            Result : true
        });
    }catch(error){
        console.log('Error >>>>', error);
        res.json({
            status: false,
            msg: 'Something went Wrong',
            error: error
        });
    }
})


router.post('/demo', async (req, res) => {
    try{
        res.json({
            status : true,
            ResponseMsg : "App Details Saved Successfully.",
            ResponseCode : 1,
            Result : true
        });
    }catch(error){
        console.log('Error >>>>', error);
        res.json({
            status: false,
            msg: 'Something went Wrong',
            error: error
        });
    }
})

module.exports = router;
