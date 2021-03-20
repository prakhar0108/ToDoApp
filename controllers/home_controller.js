const db=require('../config/mongoose');
const TodoList=require('../models/todo');



const taskList=[

	{
		taskName: "Book Reading",
		category: "Personal",
		dueDate: "11-02-2021"
	}
]


function home(req,res){

	// console.log(req.body);

	TodoList.find({}, function(err,toDoList){
		if(err){
			console.log('Error in fetching data from DB');
			return
		}
		return res.render('home', {
			title: "Home",
			Task_List: toDoList
		});
	})
}


function addTask(req,res){
	
	console.log('******',req.body);
	
	// taskList.push(req.body);
	TodoList.create({
		taskName:req.body.taskName,
		category:req.body.category,
		dueDate:req.body.dueDate
	},
		function(err, toDoList){
			if(err){
				console.log("Error in adding tasks");
				return
			}
			console.log('*******', toDoList);
			return res.redirect('back');
		}
	)	
	}

function deleteTask(req,res){
	console.log(req.query);

	console.log('***id**= ',req.query.id);
	TodoList.findByIdAndDelete(req.query.id, function(err){
		if(err){
			console.log("Error in deleting task");
			return
		}
		return res.redirect('back');
	})
}

function editTask(req, res){

	let id=req.query.id
	TodoList.find({}, function(err,toDoList){
		if(err){
			console.log('Error in editing task');
			return
		}
		return res.render('home', {
			title: "Home",
			Task_List: toDoList,
			taskId: id
		});
	})

}

function updateTask(req, res){
	let id=req.query.id;
	console.log('******', id);
	console.log(req.body);

	TodoList.findByIdAndUpdate(id,{taskName: req.body.taskName, category: req.body.category, dueDate: req.body.dueDate}, function(err, toDoList){
		if(err){
			console.log('Error in updating contact');
			return;
		}
		return res.redirect('/');
	});

}

function pageNotFound(req, res){
	// res.send("<h1>404 page not found<h1>");
	return res.render('404');
}


module.exports={
	home:home,
	addTask:addTask,
	deleteTask:deleteTask,
	editTask:editTask,
	updateTask: updateTask,
	pageNotFound:pageNotFound

};