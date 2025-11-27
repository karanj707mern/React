var {disp,ins,upd,edit}  = require('../controllers/catController')
var express = require('express')
var router = express.Router()
const auth = require('../middleware/auth')

router.get("/", disp)
// create category: admin only
router.post("/add", auth('admin'), ins)
// update category: admin only
router.put("/upd/:id", auth('admin'), upd)
// serve single category by GET
router.get("/edit/:id", edit)

module.exports = router
