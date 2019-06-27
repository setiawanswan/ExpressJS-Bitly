const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("../passport");

//Create action Login
/* POST login. */
router.post('/', passport.authenticate('local'),(req,res)=>{

    const {id, firstName, lastName, email, password} = req.user

    const data = {
        id,firstName,lastName,email, password
    }
    const token = jwt.sign({
        data
    }, 'your_jwt_secret')
// console.log(router)
    res.json({
        status: true,
        token
    })
})

rout



module.exports = router