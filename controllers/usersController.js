const Users = require('../models/usersModel');
const { getPostData} = require('../utils');

async function getUsers(req, res) {
	try {
		const users = await Users.findAll();
		
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(users));	
	} catch (error) {
		console.log(error);
	}
}

async function getUser(req, res, id) {
	try {
		const user = await Users.findById(id);
		
		if(!user) {
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({msg: 'user not found'}));
		} else {
			res.writeHead(200, {'Content-Type': 'application/json'});
		    res.end(JSON.stringify(user));	
		}
		
	} catch (error) {
		console.log(error);
	}	
}

async function createUser(req, res) {
	try {
		
		const body = await getPostData(req);
		
		const {name, age} = JSON.parse(body);
		
		const user = {
			name,
			age
		}
		
		const newUser = await Users.createUser(user);
		
		res.writeHead(201, {'Content-Type' : 'application/json'});
		
		return res.end(JSON.stringify(newUser));
		
	} catch (error) {
		console.log(error);
	}
}

async function updateUser(req, res, id) {
	try {
		
		const user = await Users.findById(id);
		
		if(!user){
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({msg: 'user not found'}));
		} else {
			
			const body = await getPostData(req);
		
			const {name, age} = JSON.parse(body);
		
			const userData = {
				name: name || user.name,
				age: age || user.age
			}
		
			const updatedUser = await Users.updateUser(id, userData);
		
			res.writeHead(200, {'Content-Type' : 'application/json'});
		
			return res.end(JSON.stringify(updatedUser));	
		}
		
	} catch (error) {
		console.log(error);
	}
}


async function deleteUser(req, res, id) {
	try {
		const user = await Users.findById(id);
		
		if(!user) {
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({msg: 'user not found'}));
		} else {
			await Users.deleteUser(id);
			res.writeHead(200, {'Content-Type': 'application/json'});
		    res.end(JSON.stringify({ msg: `User with id ${id} has been deleted.`}));	
		}
		
	} catch (error) {
		console.log(error);
	}	
}

module.exports = {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser
}