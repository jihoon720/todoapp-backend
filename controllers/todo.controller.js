//controller access the service i have created

var ToDoService = require("../services/todo.service");

_this = this;

exports.getTodos = async function(req, res, next){
	var page = req.query.page ? req.query.page : 1;
	var limit = req.query.limit ? req.query.limit : 10;

	try{
		//get todo list of maximum 10 on one page.
		var todos = await ToDoService.getTodos({}, page, limit);
		return res.status(200).json({status: 200, data: todos, message: "Successfully Todos received"});
	}
	catch(e){
		//return status 400 with error message.
		return res.status(400).json({status: 400, message: "e.message"});
	}
}

exports.createTodo = async function(req, res, next){
	var todo = {
		title: req.body.title,
		description: req.body.description,
		status: req.body.status
	}
	//calling service function with the new object from request body
	try{
		var createdTodo = await ToDoService.createTodo(todo);
		return res.status(201).json({status: 201, data: createdTodo, message: "Successfully created Todo"});
	}
	catch(e){
		return res.status(400).json({staus: 400, message: "Todo creation was unsuccessful"});
	}
}

exports.updateTodo = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedTodo = await ToDoService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTodo = async function(req, res, next){

    var id = req.params.id;
    try{
        var deleted = await ToDoService.deleteTodo(id)
        return res.status(200).json({status:200, message: "Succesfully Todo deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
