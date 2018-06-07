//..services.js accesses the models
//atomic CRUD for ToDo model.

var ToDo = require('../models/todo.model');
_this = this;

//get todo list asynchronously: R
exports.getTodos = async function(query, page, limit){
	
	//options for mongoose pagination
	var options = {
		page,
		limit
	};

	try{
		var todos = await ToDo.paginate(query, options)
		return todos;
	}

	catch (e){
		throw Error('Error while Paginating Todos');
	}
}

//C
exports.createTodo = async function(todo){

	var newTodo = new ToDo({
		title: todo.title,
		description: todo.description,
		date: new Date(),
		status: todo.status
	})

	try{
		var savedTodo = await newTodo.save();
		return savedTodo;
	}
	catch(e){
		throw error("Error while Creating Todo");
	}
}

//U
exports.updateTodo = async function(todo){
	var id = todo.id;
	
	try{
		var oldTodo = await ToDo.findById(id);
	}
	catch(e){
		throw Error("Error while Finding the Todo");
	}
	if (!oldTodo){
		return false;
	}
	//oldTodo before update
	console.log(oldTodo);

	oldTodo.title = todo.title;
	oldTodo.description = todo.description;
	oldTodo.status = todo.status;

	//oldTodo after update
	console.log(oldTodo);

	try{
		var savedTodo = await oldTodo.save();
		return savedTodo;
	}
	catch(e){
		throw Error("And error occured while updated the Todo");
	}
}
//D
exports.deleteTodo = async function(id){
    // Delete the Todo
    try{
        var deleted = await ToDo.remove({_id: id});
        if (deleted.n == 0){
        	throw Error();
        }
        else return deleted;
    }
    catch(e){
        throw Error("Error occured while deleting the Todo");
    }
}