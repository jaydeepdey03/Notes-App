const express = require('express')
const User = require('../models/User') // User Model
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
const router = express.Router()
const jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/fetchUser');

const JWT_SECRET_KEY = "hellomynameisjaydeep"
// Express Validator is used to validate email password and name
router.post('/createuser', [
    body('email', 'enter a email').isEmail(),
    body('password', 'enter a valid password').isLength({ min: 5 }),
    body('name', 'enter a valid name').isLength({ min: 5 }),
], async (req, res) => {
    // Return bad request and errors if it exists 

    // validationResult(): Extracts the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email }) // Find unique email from the model
        if (user) {
            success = false
            return res.status(400).json({ success, error: "Sorry User Exists" })
        }

        // User getting created, hence wrapped in async await function
        
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        
        // .then(user => res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error: "Please enter unique email", message: err.message})})
        
        const data = {
            user: {
                id: user.id
            }
        }
        
        const jwtData = jwt.sign(data, JWT_SECRET_KEY)
        console.log(jwtData)
        
        success = true
        res.json({ success, jwtData })
        // if any error occurs, it is catched here
    } catch (error) {
        success = false
        console.error(error.message)
        res.status(500).send('Some error occured')
    }
})


// endpoint - login

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // validationResult(): Extracts the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        console.log(user)
        console.log(email, password)
        if (!user) {
            return res.status(400).json({ error: "1" })
        }

        // bcrypt.compare(password, user.password, function (err, response) {
        //     if (err) {
        //         console.error(error.message)
        //         res.status(500).send('Internal Server Error')
        //     }
        //     if (response) {
        //         res.status(200).json({ authToken })
        //     }
        //     else {
        //         return res.json({ success: false, message: 'passwords do not match' })
        //     }
        // })

        const passwordCompare = bcrypt.compareSync(password, user.password);
        if(!passwordCompare){
            success = false
            return res.json({ success: false, message: 'passwords do not match' })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET_KEY)
        success = true
        console.log({ authToken })
        res.send({success, authToken})

        // if any error occurs, it is catched here
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }

})

// ROUTE 3: POST /getuser: Login Required

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select('-password')
        console.log(user)
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }


})


module.exports = router