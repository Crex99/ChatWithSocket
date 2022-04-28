import './App.css';
import socketio from 'socket.io-client';
import React, { useEffect, useState } from 'react';

const to = "client1"

const me = "CLIENT2"

const socket = socketio(`http://localhost:5000`)

socket.emit("ID", "client2")

socket.on("client2", data => {
	console.log("messaggio ricevuto")
	console.log("MESSAGGIO INVIATO DA ", data.from)
	console.log("TESTO DEL MESSAGGIO\n", data.content)
})

socket.on("message", data => {
	console.log(data)
})


function App() {

	const [message, setMessage] = useState("")

	const handleMessage = (event) => {
		setMessage(event.target.value)
	}

	const sendMessage = () => {
		// send a message to the server
		console.log("sendMessage")
		socket.emit("send", {
			to: to,
			from: "client2",
			content: message
		})
	}

	return (
		<div className="App">
			<h1>{ me }</h1>
			<p>Inserire un messaggio per Client1</p>

			<input type="text" onChange={ handleMessage }></input>

			<button onClick={ sendMessage }>SEND MESSAGE</button>


		</div>
	);
}

export default App;