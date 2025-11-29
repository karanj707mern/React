var express = require('express')
var cors = require('cors')
var app = express();
// Add CSP header middleware
// app.use(function(req, res, next) {
//   res.setHeader("Content-Security-Policy", "default-src 'self' http://localhost:5000");
//   next();
// });
const path = require('path')
 var catRoutes = require('./Routes/catRoutes')
 var prRoutes = require("./Routes/prRoutes")
 var userRoutes= require("../Backend/Routes/userRoutes")
app.use(express.json())
app.use(cors({
  origin: "https://react-node-e-commerce.vercel.app",
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use('/category/',catRoutes)
app.use('/product/',prRoutes)
app.use("/user",userRoutes)
app.use('/public', express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
