module.exports = options =>{

    const jwt = require('jsonwebtoken'); //npm i jsonwebtoken
    const assert = require('http-assert'); // npm i http-assert   'catch error assert with status code'
    const AdminUser = require('../models/AdminUser');

    return async(req,res,next)=>{
        //1. get token
        const token = String(req.headers.authorization || '').split('').pop()
        console.log('token:' + token)
        assert(token, 401, ' Please Login (jwt token must be provided) ')
        //2. find server 'secret'
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, 'Please Login ( Invalid jwt token)')
        //3. find user by id
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, 'Please Login first')
        await next();
    }
}