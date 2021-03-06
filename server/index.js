const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.set('secret','this is secret')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))


require('./plugins/db')(app);
require('./routes/admin/index')(app);

require('./routes/web/index')(app);



app.get('/',(req,res)=>{
    res.send("hello world")
})



app.listen(port, ()=>{
    console.log(`server listening at: port ${port}`)
})