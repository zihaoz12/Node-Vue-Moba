const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const adminController = require('./routes/adminController');


app.use(require('cors')())
app.use(express.json())




require('./plugins/db')(app);
// require('./routes/admin/index')(app);
app.use('/admin/api', adminController)



app.get('/',(req,res)=>{
    res.send("hello world")
})



app.listen(port, ()=>{
    console.log(`server listening at: port ${port}`)
})