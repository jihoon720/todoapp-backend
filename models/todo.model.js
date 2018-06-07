//mongoose is fucking awesome
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

//this is a todo model schema
var ToDoSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: Date,
	status: String
});

ToDoSchema.plugin(mongoosePaginate);
const ToDo = mongoose.model('ToDo', ToDoSchema);

//export todo model
module.exports = ToDo;