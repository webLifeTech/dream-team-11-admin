const express = require('express')
const router = express.Router()
const appDetailsModel = require('../model/appdetails.model');
const categoriesModel = require('../model/categories.model');

// For get app details
router.get('/get_app_info', async (req, res) => {
    try {
        const data = await appDetailsModel.findOne({}).sort('createdAt');
        res.json({
            ResponseCode:1,
            Result:true,
            ResponseMsg:"You get the app info successfully.",
            ResultData: data
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

// For get all categories
router.post('/get_category_list', async (req, res) => {
    try {
        const data = await categoriesModel.find({}).sort('createdAt');
        res.json({
            ResponseCode:1,
            Result:true,
            ResponseMsg:"You get the categories successfully.",
            ResultData: data
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

// Upload file
exports.uploadAssets = (type, file, fileName, cb) => {
	const assetUrl = path.join( __dirname+'/../../', 'public/'+type);

    fs.readFile(file.path,(err, data) => {
        if(err) {
            res.send(err);
            return;
        }

        fs.writeFile(assetUrl+fileName, data, (err) => {
            cb(process.env.URL+type+fileName);
        });
    });
}

module.exports = router;
