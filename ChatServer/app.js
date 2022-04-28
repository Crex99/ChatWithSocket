const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)


const clientMap = new Map()

const io = require("socket.io")(server, {
	cors: {
		methods: ["GET", "POST"],
	}
});
let i = 0
io.on("connection", socket => {
	i++;
	console.log("new connection", i)
	socket.emit("message", "client connesso")
	socket.on("ID", data => {
		clientMap.set(data, socket)
		console.log(clientMap)
	})
	socket.on("message", ({ from, to, content }) => {
		console.log("from", from)
		console.log("to", to)
		console.log("message", content)
	})
	socket.on("send", data => {
		console.log(clientMap)
		const client = clientMap.get(data.to)
		client.emit(data.to, data)
	})
	socket.on("disconnect", () => {
		console.log("client disconnected")
	})
})



server.listen(5000, () => {
	console.log("server in ascolto alla porta 5000")
});

