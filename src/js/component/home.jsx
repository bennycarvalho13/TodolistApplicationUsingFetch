import React, { useEffect } from "react";
import { useState } from "react";

function Home() {
	const [tasks, setTasks] = useState([]);
	const [user, setUser] = useState('benny');
	const [input, setInput] = useState('');

	useEffect(() => {
		fetchData()
	}, []);

	const CreateUser = () => {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
					method: "POST",
					body: JSON.stringify([]),
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(resp => {
					return resp.json();
				})
				.then(data => {
					console.log(data);
					setTasks(data);
				})
				.catch(error => {
					console.log(error);
				});
	}

	const fetchData = () => {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)
			.then(response => {
				return response.json();
			})

			.then(data => {
				//here is where your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
				setTasks(data);
			})
			.catch(error => {
				console.log(error);
				CreateUser();
			});
	}

	const addTask = () => {
		if (input.trim() === "") {
			alert("Task cannot be empty");
		} else {
			//setTasks([...tasks, {label: input, done: false}]);
			fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
				method: "PUT",
				body: JSON.stringify([...tasks, { label: input, done: false }]),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					return resp.json();
				})
				.then(data => {
					console.log(data);
					setTasks([...tasks, { label: input, done: false }]);
				})
				.catch(error => {
					console.log(error);
				});
		}
	};
	const removeTask = (index) => {
		const tempArr = [...tasks];
		tempArr.splice(index, 1);
		//setTasks(tempArr);
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
			method: "PUT",
			body: JSON.stringify(tempArr),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log(data);
				setTasks(tempArr);
			})
			.catch(error => {
				console.log(error);
			});

	};

	return (
		<div className="container-fluid text-center">
			<p className="h3 m-2">Current user : {user}</p>
			<p className="h1 display-1 m-2">ToDos</p>
			<div className="row justify-content-center">
				<div className="col-6 m-3">
					<label htmlFor="userName">Choose an Username</label>
					<input className="input-group rounded"
					id="userName"
						type="text"
						placeholder="Choose a Username and press Enter"
						value={user}
						onKeyDown={event => {
							if (event.key === 'Enter') {
								CreateUser();
							}
						}}
						onChange={(u) => setUser(u.target.value)}
						maxLength="100"
					/>
					<label htmlFor="addTask">Add a Task</label>
					<input className="input-group rounded"
					id="addTask"
						type="text"
						placeholder="Add a task and press Enter"
						value={input}
						onKeyDown={event => {
							if (event.key === 'Enter') {
								addTask();
								setInput("");
							}
						}}
						onChange={(e) => setInput(e.target.value)}
						maxLength="100"
					/>
				</div>
			</div>

			<div className="row justify-content-center">
				<div className="col-8">
					<ul className="list-group">
						{tasks.length > 0 ? tasks.map((task, index) => (<li className="list-group-item m-0 d-inline-flex justify-content-between" id="listItem" key={index}>{task.label}<button type="button" onClick={() => { removeTask(index) }} className="btn" ><i className="fa-solid fa-x fa-lg "></i></button></li>)): fetchData()}
						<li className="list-group-item m-0 text-start text-secondary list-group-item-dark">{tasks.length < 2 ? tasks.length < 1 ? "No Tasks in the list" : tasks.length + " Task in the list" : tasks.length + " Tasks in the list"}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
