
const singleFile = require('../models/uploadeSingle')
const multipleFile = require('../models/uploadMultiple')
const  {s3Uploade,s3UploadeMultiple,s3DeleteSingle,s3DeleteMultiple} = require('../s3Service')
const fs = require('fs')
// singleupload

const singleFileUpload = async(req,res)=>{
    try{

        const result = await s3Uploade(req.file)

        const file = {
            fileName: req.file.originalname,
            filePath: result.Location,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormater(req.file.size,2),
            fileKey: result.Key
        }
        const singlefile = new singleFile({
            title: req.body.title,
            file:file
        })
        await singlefile.save()

        res.status(201).json(file)

      
    } catch (error) {
        res.status(400).send(error.message);
      }
}

// multiple upload
const multipleFileUpload = async(req,res)=>{
    try{
        const result = await s3UploadeMultiple(req.files)

        let propLocation = []
        let propKey =[]

        result.forEach((item,index)=>{
            propLocation.push(item.Location)
            propKey.push(item.Key)
        })

        let filesArray = []

        req.files.forEach((item,index)=>{
            const file = {
                fileName:item.originalname,
                filePath: propLocation[index],
                fileType: item.mimetype,
                fileSize: fileSizeFormater(item.size,2),
                fileKey: propKey[index]
            }
            filesArray.push(file)
        })

        const multiplefile = new multipleFile({
            title:req.body.title,
            file:filesArray
        })
        await multiplefile.save()
        res.status(201).json(multiplefile)
    }
    catch (error) {
        res.status(400).send(error.message);
      }
}

//delete multiple

const deleteMultipleFile = async(req,res,next)=>{
    try{
        const {title} = req.body
        const files = await multipleFile.find()

        let filter = files.filter(item=>item.title === title)
        // 
        console.log(files)
        console.log(title,'title')
        console.log(filter)
        let fileTitle = null
        let keyarr = []

        // filter.forEach(item=>{
        //     fileTitle= item.title
        //     item.file.forEach(file=>{
        //         fs.unlink(file.filePath,(err)=>{
        //             if(err){
        //                 console.log(err)
        //                 return
        //             }
        //         })
        //     })
        // })

        await multipleFile.findByIdAndDelete(filter)
        res.status(200).send(`Delete File ${fileTitle} Successfuly` )

    }catch (erorr) {
        res.status(400).send(erorr.message);
      }
}

// updata Multiple

const updataMultipleFile =async (req,res,next)=>{
    try{

        const {title,key} = req.body

        //  /////// delete from folder uploads
        let count = 0
        let position = key.indexOf(',')
        while(position !== -1){
            count++
            position = key.indexOf(',',position + 1)
        }
        let globalkey = ''
        let keyarray = []
        let index = key.indexOf(',')
            let mykey=key.substr(0,index)
            
            globalkey= key.slice(index+1)
            
            keyarray.push(mykey)

             
        if(globalkey){
          for(let e=0; e<count-1 ; e++){
            let index = globalkey.indexOf(',')
            let mykey=globalkey.substr(0,index)
           
            globalkey = globalkey.slice(index+1)
            
            keyarray.push(mykey)

          }
          
          keyarray.push(globalkey)
        }

        const resultdelete = await s3DeleteMultiple(req.files,keyarray)




        //  //////////
        const result = await s3UploadeMultiple(req.file)
        const files = await multipleFile.findOne({title:title})

        // 
        let propLocation = []
        let propKey = []
        result.forEach ((item,index)=>{
            propLocation.push(item.Location)
            propKey.push(item.key)
        })

        let filesArray = []

        req.files.forEach((item,index)=>{
            const file = {
                fileName : item.originalname,
                filePath : propLocation[index],
                fileType : item.mimetype,
                fileSize : fileSizeFormater(item.size,2),
                fileKey  : propKey[index]
            }
            filesArray.push(file)
        })

        // 
        if(files){
            files.title = title
            files.file  = filesArray

            const updatafiles = await files.save()
            res.status(201).json(updatafiles)
            
        }

    }catch (erorr) {
        res.status(400).send(erorr.message);
      }
}

// update Single

const updateSingleFile =async(req,res,next)=>{
    try{
      const {title,key}= req.body
      const resultdelete = await s3DeleteSingle(req.file,req.body.key)
      const result = await s3Uploade(req.file)
      const files =  await singleFile.findOne({title:title})
      console.log(req.file.originalname,'origii')
       const  file = {
          fileName:  req.file.originalname,
          filePath:  result.Location,
          fileType:  req.file.mimetype,
          fileSize: fileSizeFormater( req.file.size, 2),
          fileKey: result.Key
        };

        files.title=  req.body.title,
        files.file= file

  
        await files.save()
        res.status(201).json(files)

      
    }catch (erorr) {
      res.status(400).send(erorr.message);
    }
  }









const fileSizeFormater = (bytes,decimal)=>{
    if(bytes === 0){
        return '0 Bytes'
    }
    const dm = decimal || 2
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index =Math.floor(Math.log(bytes) / Math.log(1000))
    return(
        parseFloat( (bytes / Math.pow(1000,index)).toFixed(dm)) + ' ' + sizes[index]
    )

}

module.exports = {singleFileUpload,updateSingleFile,updataMultipleFile,multipleFileUpload,deleteMultipleFile}
