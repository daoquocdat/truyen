const express = require('express')
const multer = require('multer')
const app = express()
const router = express.Router()


const adminController = require('../app/controllers/AdminController')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + "-" + file.originalname)
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpg" ||  file.mimetype=='image/jpeg'){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
})

//Form add new manga
router.get('/manga/add', adminController.createManga)
//Add new manga
router.post('/add',upload.single('avatarManga'), adminController.create)
//Form add new chapter of manga: name
router.get('/manga/:slug/addChap',adminController.createChapterManga)
//Add new chapter of manga: name
router.post('/manga/:slug/addChap',upload.array('imgOfManga', 10), adminController.createChapter)
//Infomation of manga :name
router.get('/manga/:slug', adminController.infoManga)
//Infomation all manga from database
router.get('/manga', adminController.manga)
//Index admin
router.get('/', adminController.index)

router.get('/test', adminController.tam)
module.exports = router