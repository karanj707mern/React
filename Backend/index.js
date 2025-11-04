var express = require('express')
var cors = require('cors')
var app = express()
const path = require('path')
 var catRoutes = require('./Routes/catRoutes')
 var prRoutes = require("./Routes/prRoutes")
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/category/',catRoutes)
app.use('/product/',prRoutes)

app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(5000,()=>{
    console.log('listening on 5000 port'); 
})