const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router()
const usersModel = require('../model/users.model')

// For save user
router.post('/login', async (req, res) => {
    try {
        console.log("req.body>>", req.body);
        const isUserExist = await usersModel.findOne({
            username: req.body.username
        })

        if (!(isUserExist && isUserExist._id)) {
            return res.json({
                data: isUserExist,
                status: false,
                msg: 'User Name Invalid!'
            })
        }

        console.log("isUserExist>>", isUserExist);
        const isPassword = await bcrypt.compare(isUserExist.password, req.body.password)
        console.log("isPassword >>>", isPassword);

        if (isUserExist && isUserExist._id) {
            return res.json({
                data: isUserExist,
                status: true,
                msg: 'You are now logged in.'
            })
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log(">>>", req.body.password);

        // const table = await new usersModel(req.body).save();
        res.json({
            data: {},
            status: true,
            msg: 'You are now logged in.'
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

module.exports = router