const express = require('express')
const bcrypt = require('bcryptjs')
const db = require("../../db/dbConfig.js");

const userRouter = express.Router()

//Middleware 
const protected = require("../../middleware/protected")
//Middleware^

userRouter.get("/", protected, (req, res) => {
  db('users')
    .select('id', 'username', 'signedIn')
    .then(users => {
      if(users){
        res.status(200).json(users)
      } else {
        res.status(500).json({errorMessage: "Problems with your request"})
      }
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = userRouter; 