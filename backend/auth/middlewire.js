
const { admin } = require("./firebase_config.js")



const requireAuth = async (req, res, next) => {
    // console.dir(req.headers)
    // console.log("###################################")

    if (!req.headers) return res.status(401).json({ msg: 'headers required' });

    if (!req.headers.authorization) return res.status(401).json({ msg: 'token required' });

    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'token required' });

    try {
        const userInfo = await admin.auth().verifyIdToken(token);
        if (!userInfo) throw Error('invalid token');
        // console.log(userInfo)
        req.user_email = userInfo.email;
        req.name = userInfo.name;
        //console.dir(user);
        next()
    } catch (err) {
        console.dir(err)
        res.status(401).json({ msg: err })
    }
}


const jwt = require('jsonwebtoken');
const { User } = require('./model.js');


// header, pyload, signature
const requireAuthJWT = async (req, res, next) => {

    const { authorization } = req.headers;

    try {
        if (!authorization) throw Error('Authorization token missing');
        const token = authorization.split(' ')[1];
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        const ret = await User.findOne({ _id });
        if (!ret) throw Error("No such user");
        req.user_id = ret._id.toString();
        req.username = ret.username;
        next();
    } catch (err) {
        console.log(err.message, "backend");
        res.status(401).json({ error: ' no file' });
    }
}




module.exports = { requireAuth }