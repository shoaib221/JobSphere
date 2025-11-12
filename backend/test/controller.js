const express = require("express");
const testRouter = express.Router();
const { requireAuth } = require("../auth/middlewire");
const { Test } = require("./model");



const TestGet = async (req, res, next) => {
    //console.log('here')
    try {
        const data = await Test.find({});
        res.status(200).json({ data });
    } catch (err) {
        console.dir(err)
        res.status(400).json({ err });
    }
}


const TestAuth = async (req, res, next) => {
    try {
        const data = await Test.find({});
        res.status(200).json({ data });
    } catch (err) {
        console.dir(err)
        res.status(400).json({ err });
    }
}



const TestPost = async (req, res, next) => {

    try {

    } catch (err) {

    }
}





testRouter.get("/", TestGet);
testRouter.get("/auth", requireAuth, TestAuth)

module.exports = { testRouter }


