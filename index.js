const http = require('http');
const path = require('path');
const fs = require('fs');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('./controllers/usersController');

const server = http.createServer((req, res)=>{
	if(req.url === "/users" && req.method == "GET"){
		
		getUsers(req, res);
		
	} else if (req.url.match(/\/users\/([0-9]+)/) && req.method === 'GET') { 
		const id = req.url.split('/')[2];
		
		getUser(req, res, id)
		
	} else if (req.url === "/users" && req.method == "POST"){
		
		createUser(req, res);
		
	} else if (req.url.match(/\/users\/([0-9]+)/) && req.method === 'PUT'){
		const id = req.url.split('/')[2];
		
		updateUser(req, res,id);
		
	} else if (req.url.match(/\/users\/([0-9]+)/) && req.method === 'DELETE') {
		const id = req.url.split('/')[2];
		
		deleteUser(req, res, id);
		
	} else {
		
		let filePath = path.join(__dirname, 'public', req.url === '/' ?
			'index.html' : req.url);
			console.log(filePath);
		
		let extname = path.extname(filePath);
		
		let contentType = 'text/html';
		
		switch(extname){
			case '.js': contentType = 'text/javascript';
				break;
			case '.css': contentType = 'text/css';
				break;
			case '.json': contentType = 'application/json';
				break;
			case '.png': contentType = 'image/png';
				break;
			case 'jpg': contentType = 'image/jpg';
				break;
		}
		
		fs.readFile(filePath, (err, content)=>{
		  if(err){
			if(err.code == 'ENOENT'){
				fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)=>{
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(content, 'utf8');
				});
			} else {
				res.writeHead(500);
				res.end(`Server Error ${err.code}`);
			}		  
		  }	else {	
			res.writeHead(200, {'Content-Type': contentType});
			res.end(content, 'utf8');
		  }
				
		});
		
	}

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>  console.log(`Server running on port ${PORT}`));