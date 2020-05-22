const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let socks = [
	{
		id: 1,
		name: '',
	},
	{
		id: 2,
		name: ''
	}
];

app.get('/api', (req, res) => {
	res.send('Hello it is API');
});

app.get('/api/socks', (req, res) => {
	res.send(socks)
});

app.get('/api/socks/:id', (req, res) => {
	let sock = socks.find((el) => {
		return (el.id === Number(req.params.id))
	})
	res.send(sock)
});

app.post('/api/socks', (req, res) => {
	let sock =
	{
		id: Date.now(),
		name: req.body.name
	};
	socks.push(sock);
	res.send(sock)
})

app.put('/api/socks/:id', (req, res) => {
	let sock = socks.find((el) => {
		return (el.id === Number(req.params.id))
	})
	sock.name = req.body.name;
	res.sendStatus(200);
})

app.delete('/api/socks/:id', (req,res) => {
	socks = socks.filter((el) => {
		return el.id !== Number(req.params.id);
	})
	res.sendStatus(200);


	// socks.forEach((el) => {
	// 	let indexElement = el.id.indexOf(Number(req.params.id));
	// 	el.id.splice(indexElement,1);
	// 	return el
	// })
	// res.send(socks)
})


MongoClient.connect('mongodb://localhost:27017/natural-cosmetic', (err , database) => {
	if (err) {
		return console.log(err)
	}
	db = database;
	app.listen(4000, () => {
		console.log('API app started')
	});
})










