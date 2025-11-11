

const express = require("express");
const { authRouter } = require("./auth/controller.js");
const { requireAuth } = require("./auth/middlewire.js");
const { testRouter } = require("./test/controller.js")
const { productRouter } = require("./products/controller.js")
const mainRouter = express.Router();




mainRouter.use( "/auth", authRouter );
mainRouter.use( "/test", testRouter );
mainRouter.use( "/product", productRouter );




// mainRouter.use( "/chat", chatRouter );


module.exports = { mainRouter } ;

