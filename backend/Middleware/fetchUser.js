const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "hellomynameisjaydeep"

const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "Please use correct Token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY)
        console.log(data)
        req.user = data.user
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).send({error: "Please use correct Token"})
    }
}

module.exports = fetchUser