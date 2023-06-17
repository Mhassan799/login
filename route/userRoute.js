const {createUser} = require("../controller/userController")
const express = require('express')
const router = express.Router()
const {verifyToken} = require('../jwtmiddlewere/jwtmiddlewere')
router.post('/createUser', createUser)


module.exports = router