var CatModel  = require("../Model/catModel")
const disp = async(req,res)=>{
   var data = await CatModel.find({})
    return res.json({
        "msg":"Catgeory get successfully...",
        "data":data
    })
}
const ins = async(req,res)=>{
    
    try{
        const data = await CatModel.create(req.body)
        return res.json({
            "msg":"Successfully inserted...",
            "data": data
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({ msg: "Insert failed", error: err.message })
    }
}
const upd = async(req,res)=>{
    let id = req.params.id
    try{
        // return the updated document with { new: true }
        let ans = await CatModel.findByIdAndUpdate(id, req.body, { new: true })
        if(ans){
            return res.json({
                "msg":"Category Updated Successfully.",
                "data": ans
            })
        }
        return res.status(404).json({ msg: "Category not found" })
    }catch(err){
        console.error(err)
        return res.status(500).json({ msg: "Update failed", error: err.message })
    }
}
const edit = async(req,res)=>{
    let id = req.params.id
    let data = await CatModel.findById(id)
    return res.json({
        "msg":"Category get successfully.",
        "data":data
    })
}
module.exports = {disp,ins,upd,edit}