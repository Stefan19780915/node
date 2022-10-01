let users = require('../data/users');
const { v4 : uuidv4} = require('uuid');
const { writeToFile } = require('../utils');

function findAll(){
	return new Promise((resolve, reject)=>{
		resolve(users);
	});
}

function findById(id){
	return new Promise((resolve, reject)=>{
		const user = users.find((u)=> u.id === id);
		resolve(user);
	});
}

function createUser(user){
	return new Promise((resolve, reject)=>{
		const newUser ={id: uuidv4(), ...user};
		users.push(newUser);
		writeToFile('./data/users.json', users);
		resolve(newUser);
	});
}

function updateUser(id, user){
	return new Promise((resolve, reject)=>{
		const index = users.findIndex((u)=> u.id === id);
		users[index] = {id, ...user};
		
		writeToFile('./data/users.json', users);
		resolve(users[index]);
	});
}

function deleteUser(id){
	return new Promise((resolve, reject)=>{
		
		users = users.filter((u)=>u.id !== id);
		
		writeToFile('./data/users.json', users);
		resolve();
	});
}

module.exports = {
	findAll,
	findById,
	createUser,
	updateUser,
	deleteUser
}