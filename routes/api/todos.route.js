var express = require('express');
var router = express.Router();

//get todo controller
var ToDoController = require('../../controllers/todo.controller');

//map api for each controller function

//same route path as #2
router.get('/', ToDoController.getTodos);

router.post('/', ToDoController.createTodo);

router.put('/', ToDoController.updateTodo);

//except delete, it requires id in url, so api/todos/...
router.delete('/:id', ToDoController.removeTodo);

module.exports = router;