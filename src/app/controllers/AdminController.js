const Truyen = require('../models/Truyen')
const Detail = require('../models/Detail')
const express = require('express')
const path = require('path')
const app = express()

const fs = require('fs')

const multer = require('multer')
const bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname, 'public')))

const { multipleMongooseToOject } = require('../../ultil/mongoose')
const { mongooseToOject } = require('../../ultil/mongoose')

class AdminController{
    
    index(req,res,next){     
        res.render('admin/interface-admin')
    }


    createManga(req, res, next){
        res.render('admin/create-manga')
    }

    //[POST]
    create(req, res, next){
        const manga = new Truyen({
            tentruyen: req.body.nameManga,
            tenloai: req.body.abc,
            theloai: req.body.category,
            mota: req.body.description,
            hinh: req.file.filename,
        })
        manga.save(function(err){
            if(err){
                res.json({'kq': 0, 'errMess':err})
            }
            else{
                return res.redirect('/admin/manga');
            }
        })
    }

    manga(req, res, next){
        Truyen.find({})
            .then(mangas => {
                res.render('admin/manga', {
                    mangas: multipleMongooseToOject(mangas)
                })
            })
            .catch(next)   
    }

    infoManga(req, res, next){
        Truyen.findOne({ slug: req.params.slug })
            .then(truyen => {
                res.render('admin/details-manga', {truyen: mongooseToOject(truyen)})
            })
            .catch(next)
    }
    //hiển thị danh sách img trong chap
     tam(req, res, next){
        const all_img =  Detail.find()
        // res.send('abc')
        res.render('admin/test', {all_img: all_img})
        
    }
    //Mở form thêm chap
    createChapterManga(req,res,next){
        Truyen.findOne({ slug: req.params.slug })
        .then(truyen => {
            res.render('admin/create-chapter-manga', {truyen: mongooseToOject(truyen)})
        })
        .catch(next)
    }
    //Post thêm chap
    createChapter(req, res, next){
        const files = req.files
        if(!files){
            res.send('Upload ko thành công')
        }
        else{
            //res.json(req.body)
            const imgArray = files.map((file) => {
                const img = fs.readFileSync(file.path)

                return img.toString('base64')
            })
            // res.json(imgArray)
             imgArray.map((src, index) => {
                const imgArr = new detailsChapTruyen({
                    tentruyen: req.body.nameManga,
	                chapter: req.body.chapter,
	                tenfile: files[index].originalname,
                    loaifile: files[index].mimetype,
                    imgBase64: src,
                })  
                imgArr.save(function(err){
                    if(err){
                        res.json({'kq': 0, 'errMess':err})
                    }
                    else{
                        res.json({'kq': 1, 'Mess':'Success'})
                        // /return res.redirect('/admin/manga');
                    }
                })  
            })            
        }
    }

}

module.exports = new AdminController()
