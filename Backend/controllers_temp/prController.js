const prcatModel = require("../Model/prcatModel")
const fs = require('fs')
const path = require('path')

const disp = async (req, res) => {
    try {
        const data = await prcatModel.find({}).populate("catid")
        return res.json({
            msg: "Products fetched successfully.",
            data: data
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ msg: "Fetch failed", error: err.message })
    }
}

const ins = async (req, res) => {
    try {
        if (req.file) req.body.primage = req.file.filename
        const data = await prcatModel.create(req.body)
        return res.json({
            msg: "Successfully inserted...",
            data: data
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ msg: "Insert failed", error: err.message })
    }
}

const upd = async (req, res) => {
  const id = req.params.id;
  try {
    // Handle new file upload
    if (req.file) {
      req.body.primage = req.file.filename;
      const existing = await prcatModel.findById(id);

      if (existing && existing.primage) {
        const imgPath = path.join(__dirname, '..', 'public', 'uploads', existing.primage);

        // Check if file exists before trying to delete
        fs.access(imgPath, fs.constants.F_OK, (accessErr) => {
          if (!accessErr) {
            fs.unlink(imgPath, (err) => {
              if (err) console.error('Error deleting file:', err.message);
              else console.log('Old image deleted:', existing.primage);
            });
          } else {
            console.warn('Old image not found, skip deleting:', existing.primage);
          }
        });
      }
    }

    // Update product
    const ans = await prcatModel.findByIdAndUpdate(id, req.body, { new: true });
    if (ans) {
      return res.json({
        msg: "Product Updated Successfully.",
        data: ans,
      });
    }
    return res.status(404).json({ msg: "Product not found" });
  } catch (err) {
    console.error('Update failed:', err);
    return res.status(500).json({ msg: "Update failed", error: err.message });
  }
};


const edit = async (req, res) => {
    const id = req.params.id
    try {
        const data = await prcatModel.findById(id)
        if (!data) return res.status(404).json({ msg: 'Product not found' })
        return res.json({
            msg: "Product fetched successfully.",
            data: data
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ msg: "Fetch failed", error: err.message })
    }
}

const del = async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await prcatModel.findByIdAndDelete(id)
        if (!deleted) return res.status(404).json({ msg: 'Product not found' })

        if (deleted.primage) {
            const imgPath = path.join(__dirname, '..', 'public', 'uploads', deleted.primage)
            fs.unlink(imgPath, (err) => { if (err) console.error('unlink error:', err) })
        }

        return res.json({ msg: 'Product deleted successfully.' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ msg: 'Delete failed', error: err.message })
    }
}

module.exports = { disp, ins, upd, edit, del }