var express = require('express');

var router = express.Router();

var todos = require('./api/todos.route');

//root path #2
router.use('/todos', todos);

module.exports = router;