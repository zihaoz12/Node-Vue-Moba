module.exports = app =>{
    const express = require('express');
    const jwt = require('jsonwebtoken'); //npm i jsonwebtoken
    const assert = require('http-assert'); // npm i http-assert   'catch error assert with status code'
    const AdminUser = require('../../models/AdminUser');
    const router = express.Router({
        mergeParams:true
    })
    const Category = require('../../models/Category')
    
    router.post('/',async(req,res)=>{
        
        const model = await req.Model.create(req.body);
        res.send(model)
    });
    
    router.get('/',  async(req,res)=>{
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items)
    })
    
    router.get('/:id', async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    });
    
    router.put('/:id', async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    });
    
    router.delete('/:id', async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    });


    // Login auth middleware
    const authMiddleware = require('../../middleware/auth')
    
    //resource middleware
    const resourceMiddleware = require('../../middleware/resource')
    
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);

    //Uploads 
    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', upload.single('file'), async (req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    });

    //login
    app.post('/admin/api/login', async (req,res)=>{
        const { username, password } = req.body
        //1.find admin by username
        //const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({ username }).select('+password')//if in model select: false
        assert(user, 422, 'User does not exist')
        //without assert
        // if(!user){
        //     return res.status(422).send({
        //         message: 'This Admin does not existed'
        //     })
        // }
        //2.check password
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, 'Password Incorrect')
        //3.return token  
        //npm i jsonwebtoken
        const token = jwt.sign({
            id: user._id,
        }, app.get('secret'))
        res.send({ token })
    })


    //error hanlder
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}