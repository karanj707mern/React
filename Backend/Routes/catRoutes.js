var {disp,ins,upd,edit}  = require('../controllers/catController')
var express = require('express')
var router = express.Router()
router.get("/", disp)
router.post("/add", ins)
router.put("/upd/:id", upd)
// serve single category by GET
router.get("/edit/:id", edit)

module.exports = router
