const mongoose = require('mongoose');


const TestSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
});


// ✅ Export the model
const Test = mongoose.model('Test', TestSchema);


module.exports = { Test }
