const express = require('express')
const router = express.Router()
const categoriesModel = require('../model/categories.model');
const upload_files = require('./upload_files.routes');


router.get('/get-category', async (req, res) => {
  try {
    console.log("req.body>>", req.body);
    const table = await new categoriesModel(req.body).save();
    // (For old App there need category_id)
    const data = await categoriesModel.updateOne({
      _id: table._id
    }, { category_id: table._id });
    res.json({
      data: table,
      status: true,
      msg: 'Category added successfully'
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

// For save category
router.post('/save-category', async (req, res) => {
  try {
    console.log("req.body>>", req.body);
    const table = await new categoriesModel(req.body).save();
    // (For old App there need category_id)
    const data = await categoriesModel.updateOne({
      _id: table._id
    }, { category_id: table._id });
    res.json({
      data: table,
      status: true,
      msg: 'Category added successfully'
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

// For get all category
router.post('/get-all-category', async (req, res) => {
  try {
    const data = await categoriesModel.find().sort('position');
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

// For get single category by id
router.post('/get-category-byid', async (req, res) => {
  try {
    const data = await categoriesModel.findOne({
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

// For update category
router.post('/update-category', async (req, res) => {
  try {
    console.log("req.body>>>", req.body);
    const data = await categoriesModel.updateOne({
      _id: req.body._id
    }, req.body);
    console.log("data>>>", data);

    res.json({
      status: true,
      msg: 'Category updated successfully'
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

// For delete category
router.post('/delete-category', async (req, res) => {
  try {
    const data = await categoriesModel.deleteOne({
      _id: req.body._id
    })
    res.json({
      status: true,
      msg: 'Category has been deleted successfully'
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
