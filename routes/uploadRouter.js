const express = require('express')
const {singleFileUpload,updateSingleFile,updataMultipleFile,multipleFileUpload,deleteMultipleFile} = require('../Controllers/fileuploadeController')


// 
const router = express.Router()
const {upload} = require('../helpers/filehelper')

// 

router.route('/single').post(upload.single('file'),singleFileUpload)
router.route('/multiple').post(upload.array('files'),multipleFileUpload)
router.route('/deletemuliple').delete(deleteMultipleFile)
router.route('/updatesingle').put(upload.single('file'),updateSingleFile)
router.route('/updatemultiple').put(upload.array('files'),updataMultipleFile)

module.exports =router