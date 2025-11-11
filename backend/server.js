// console.log("server");
// 



const { app, server } = require("./utils/socket.js");


const { admin }   = require("./auth/firebase_config.js");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const { mainRouter } = require("./routes.js");
const { User } = require("./auth/model.js");



app.use(mainRouter);


app.use((req, res, next) => {
	console.log("backend", new Date().toLocaleString() + "################################");
});


const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


async function run() {
	
	try {
		// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
		await mongoose.connect(process.env.MONGO_URI, clientOptions);
		await mongoose.connection.db.admin().command({ ping: 1 });
		server.listen(process.env.PORT);
		console.log("Listening to port ", process.env.PORT);
	} catch (err) {
		console.log(err);
	} finally {
		// Ensures that the client will close when you finish/error;
		// await mongoose.disconnect();
	}
}


run();

module.exports = app;



