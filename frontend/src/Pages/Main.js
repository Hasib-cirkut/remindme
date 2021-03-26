import FormComp from '../Components/FormComp';
import Show from '../Components/Show';

import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Main() {
	const [ name, setName ] = useState('');
	const [ genre, setGenre ] = useState('movie');
	const [ type, setType ] = useState('mustwatch');

	const [ valSubmitted, setValsubmitted ] = useState('no');

	const [ mustWatch, setMustWatch ] = useState([]);
	const [ conWatch, setConWatch ] = useState([]);
	const [ rewatch, setRewatch ] = useState([]);

	const [ edit, setEdit ] = useState(false);

	const handleDropdown = (event) => {
		setType((prevVal) => {
			return event.target.value;
		});
	};

	function handleName(event) {
		setName((prevVal) => {
			return event.target.value;
		});
	}
	const handleGenre = (event) => {
		setGenre((prevVal) => {
			return event.target.value;
		});
	};

	async function handleSubmit(event) {
		event.preventDefault();

		if (name === '') {
			return;
		}

		let temp = await fetch(`https://rocky-beach-47473.herokuapp.com/post/addpost`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: localStorage.getItem('username'),
				title: name,
				type: type,
				genre: genre
			})
		});

		temp = await temp.json();

		setValsubmitted((prev) => {
			if (prev === 'yes') {
				return 'no';
			} else {
				return 'yes';
			}
		});

		setName((prev) => {
			return '';
		});
	}

	function handleEdit(event) {
		event.preventDefault();

		setEdit((prev) => !prev);
	}

	function handleLogout(event) {
		event.preventDefault();

		localStorage.removeItem('username');

		window.location.reload();
	}

	useEffect(
		() => {
			async function getData() {
				let data = await fetch(`https://rocky-beach-47473.herokuapp.com/post`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: localStorage.getItem('username')
					})
				});

				data = await data.json();

				let mWatch = [];
				let cWatch = [];
				let rWatch = [];

				data.map((show) => {
					if (show.type === 'mustwatch') {
						mWatch.push(show);
					} else if (show.type === 'continuewatching') {
						cWatch.push(show);
					} else {
						rWatch.push(show);
					}
				});

				mWatch.reverse();
				cWatch.reverse();
				rWatch.reverse();

				setMustWatch((prev) => {
					return [ ...mWatch ];
				});

				setConWatch((prev) => {
					return [ ...cWatch ];
				});

				setRewatch((prev) => {
					return [ ...rWatch ];
				});

				console.log('running getdata');
			}

			getData();
		},
		[ valSubmitted ]
	);

	if (localStorage.getItem('username') === null) {
		return <Redirect to="/login" />;
	} else {
		return (
			<div className="App" className="pb-4">
				<div className="flex flex-col justify center text-center object-contain items-center">
					<h1 className="text-2xl tracking-widest subpixel-antialiased font-sm text-gray-600">remindme</h1>

					<h1
						className="text-sm tracking-widest subpixel-antialiased font-thin text-pink-300 hover:text-pink-600 cursor-pointer"
						onClick={handleLogout}
					>
						logout {`${localStorage.getItem('username')}`}
					</h1>
				</div>

				<FormComp
					handleName={handleName}
					handleDropdown={handleDropdown}
					handleSubmit={handleSubmit}
					handleGenre={handleGenre}
					name={name}
					genre={genre}
				/>

				<div className="m-1 sm:max-w-2xl sm:mx-auto">
					<div className="mx-2 sm:mx-0 my-4 shadow-lg px-4 py-2">
						<div className="flex justify-between mb-1">
							<h3>Must watch/read</h3>
							{edit ? (
								<button onClick={handleEdit} className="px-2 bg-green-600 rounded">
									Edit
								</button>
							) : (
								<button onClick={handleEdit} className="px-2 bg-green-300 rounded">
									Edit
								</button>
							)}
						</div>
						<hr />

						<div className="max-h-32 sm:max-h-52 overflow-auto px-2">
							{mustWatch.map((show) => {
								return (
									<Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />
								);
							})}
						</div>
					</div>

					<div className="mx-2 sm:mx-0 my-4 shadow-lg px-4 py-2">
						<div className="flex justify-between">
							<h3>Continue Watching/Reading</h3>
						</div>
						<hr />

						<div className="max-h-32 overflow-auto px-2">
							{conWatch.map((show) => {
								return (
									<Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />
								);
							})}
						</div>
					</div>

					<div className="mx-2 sm:mx-0 my-4 shadow-lg px-4 py-2">
						<div className="flex justify-between">
							<h3>Re watch/read</h3>
						</div>
						<hr />

						<div className="max-h-32 overflow-auto px-2">
							{rewatch.map((show) => {
								return (
									<Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
