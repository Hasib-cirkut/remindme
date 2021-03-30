import FormComp from '../Components/FormComp';
import Show from '../Components/Show';

import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { ThemeContext } from '../Contexts/ThemeContext';

function Main() {
	const { theme, setTheme } = useContext(ThemeContext);

	const [ name, setName ] = useState('');
	const [ genre, setGenre ] = useState('movie');
	const [ type, setType ] = useState('mustwatch');

	const [ valSubmitted, setValsubmitted ] = useState('no');

	const [ mustWatch, setMustWatch ] = useState([]);
	const [ conWatch, setConWatch ] = useState([]);
	const [ rewatch, setRewatch ] = useState([]);

	const [ edit, setEdit ] = useState(false);

	const [ loading, setLoading ] = useState(true);

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

	function handleTheme(event) {
		event.preventDefault();

		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
				setLoading(false);
			}

			getData();
		},
		[ valSubmitted ]
	);

	if (localStorage.getItem('username') === null) {
		return <Redirect to="/login" />;
	} else {
		return (
			<div className="App" className="pb-4 bg-primary h-screen">
				<div className="flex flex-col justify-center text-center object-contain items-center">
					<h1 className="text-2xl tracking-widest subpixel-antialiased font-sm text-primary">remindme</h1>

					<div className="flex items-end">
						<svg height="28" viewBox="0 0 480.06 480.06" width="28" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M394.03 424.8v39.26a8 8 0 01-8 8h-292a8 8 0 01-8-8V424.8a74.58 74.58 0 0174.6-74.57 41.4 41.4 0 0034.75-18.86c7.42-11.4 6.65-21.3 6.65-29.3l.15-.38a99.01 99.01 0 01-61.15-91.5v-3.13c-14.25 0-25-11.26-25-24.54v-41.56c-.32-14.47.34-65.5 37.2-101.03C196.1-1.37 264.01 2 313.21 24.1a2 2 0 01-.07 3.68l-12.83 5.28c-1.92.8-1.5 3.62.55 3.84l6.23.67a100.94 100.94 0 0174.72 46.35c.46.73.33 1.84-.26 2.47a60.5 60.5 0 00-16.52 41.56v54.57a24.54 24.54 0 01-24.54 24.54h-1.46v3.13a99.01 99.01 0 01-61.15 91.5l.15.37c0 7.78-.82 17.82 6.65 29.31a41.4 41.4 0 0034.76 18.86 74.58 74.58 0 0174.6 74.57z"
								fill="#ffdfba"
							/>
							<path
								d="M394.03 424.8v39.26a8 8 0 01-8 8h-292a8 8 0 01-8-8V424.8a74.58 74.58 0 0174.59-74.57 41.4 41.4 0 0034.76-18.86 68.64 68.64 0 0089.3 0 41.4 41.4 0 0034.77 18.86 74.58 74.58 0 0174.58 74.57z"
								fill="#fe4f60"
							/>
							<path
								d="M381.8 83.93c.47.73.34 1.83-.25 2.46a60.54 60.54 0 00-16.52 41.56v54.57c0 12.4-9.33 24.54-26 24.54V145.3a48 48 0 00-48-48h-102a48 48 0 00-48 48v61.77c-14.25 0-25-11.26-25-24.54v-41.56c-.32-14.47.34-65.5 37.2-101.03C196.1-1.37 264.02 2 313.21 24.11a2 2 0 01-.07 3.67l-12.83 5.29c-1.92.79-1.51 3.61.55 3.83l6.23.67a100.9 100.9 0 0174.72 46.36z"
								fill="#42434d"
							/>
							<path
								d="M339.03 210.2c0 54.69-44.35 99-99 99-51.49 0-99-40.04-99-102.14V145.3a48 48 0 0148-48h102a48 48 0 0148 48z"
								fill="#ffebd2"
							/>
							<path
								d="M217.62 274.12c16.27 10.18 3.44 35.16-14.38 28a99.02 99.02 0 01-62.2-91.93v-64.9a47.78 47.78 0 018.42-27.17c6.5-9.47 21.57-5.28 21.57 7.17v64.9c0 36.51 19.2 66.8 46.59 83.93z"
								fill="#fff3e4"
							/>
							<path
								d="M279.16 318.48c-24.64 10.32-51.71 11.12-78.26 0 1.36-5.62 1.13-9.27 1.13-16.42l.15-.37a99.2 99.2 0 0075.7 0l.15.37c0 7.16-.22 10.8 1.13 16.42z"
								fill="#ffd6a6"
							/>
							<path
								d="M200.91 374.39a40.67 40.67 0 01-11.91 1.84c-41.3.36-74.97 33.02-74.97 74.32v7.51a14 14 0 01-14 14h-6a8 8 0 01-8-8V424.8c0-41.19 33.4-74.55 74.59-74.57a41.4 41.4 0 0034.76-18.86 69.21 69.21 0 009.51 6.82c14.76 8.8 12.4 31.05-3.98 36.2z"
								fill="#ff6d7a"
							/>
							<path
								d="M279.15 374.39c3.7 1.16 7.66 1.8 11.92 1.84 41.3.36 74.96 33.02 74.96 74.32v7.51a14 14 0 0014 14h6a8 8 0 008-8V424.8c0-41.19-33.4-74.55-74.58-74.57a41.4 41.4 0 01-34.77-18.86 69.21 69.21 0 01-9.51 6.82c-14.75 8.8-12.4 31.05 3.98 36.2z"
								fill="#e84857"
							/>
							<path
								d="M313.14 27.78c-11.76 4.84-13.43 5.9-17.5 5.28-65.68-10.18-123.3 16.99-142.87 80.78v.01a47.76 47.76 0 00-11.74 31.44v37.53c0 16.18-25 17.31-25-.3v-41.56c-.32-14.47.34-65.5 37.2-101.03C196.1-1.37 264.01 2 313.21 24.1a2 2 0 01-.07 3.68z"
								fill="#4d4e59"
							/>
							<path d="M402.03 424.8v47.26a8 8 0 01-16 0v-47.25a66.53 66.53 0 00-66.57-66.58 49.12 49.12 0 01-42.26-23.72 8 8 0 1113.67-8.33 33.23 33.23 0 0028.59 16.06 82.53 82.53 0 0182.57 82.57zm-139.6-80.19a8 8 0 01-6.12 9.52 76.57 76.57 0 01-59.51-11.64c-16.88 18.09-39.18 15.74-36.2 15.74a66.53 66.53 0 00-66.57 66.58v47.25a8 8 0 01-16 0v-47.25a82.52 82.52 0 0182.57-82.57 33.35 33.35 0 0033.43-33.35v-2.1c-34.92-16.7-59.43-51.79-60.92-92.65-14.37-3.45-25.08-16.31-25.08-31.62v-41.47c-.43-20.3 2.58-71.14 39.65-106.88C193.46-9.95 266.86-7.15 320.84 18.84a8.02 8.02 0 011.7 13.32A107.98 107.98 0 01388.6 79.7c.78 1.24 2.21 3.18 1.84 6.28a8.1 8.1 0 01-2.3 5.08 52.23 52.23 0 00-15.12 36.9v54.57a8 8 0 01-16 0v-54.57a68.1 68.1 0 0115.54-43.5c-15.33-21.93-39.26-36.04-66.33-38.93l-14.06-1.51c-8.22-.88-9.83-12.2-2.2-15.35l6.4-2.63C213.1-3 124.03 29.26 124.03 140.96v41.56c0 6.35 3.66 11.87 9 14.64V145.3c0-30.88 25.12-56 56-56h102c30.88 0 56 25.12 56 56v65.5c0 69.57-67.99 122.42-137.17 102.05a48.91 48.91 0 01-4.18 16.33 60.58 60.58 0 0047.23 9.32 8 8 0 019.52 6.11zm-22.4-43.42c50.18 0 91-40.82 91-91v-64.9c0-22.05-17.94-40-40-40h-102c-22.05 0-40 17.95-40 40v64.9c0 50.18 40.82 91 91 91zm81 137.87h-24a8 8 0 000 16h24a8 8 0 000-16z" />
						</svg>
						<h1 className="text-md subpixel-antialiased font-sm text-primary">
							{localStorage.getItem('username')}
						</h1>
					</div>
				</div>

				<div className="flex sm:max-w-2xl sm:mx-auto justify-around text-center object-contain items-center">
					<h1 onClick={handleTheme} className="text-secondary hover:text-yellow-500 cursor-pointer">
						Theme
					</h1>

					<h1
						className="text-sm tracking-widest subpixel-antialiased font-thin text-pink-300 hover:text-pink-600 cursor-pointer"
						onClick={handleLogout}
					>
						Logout
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

				<div className="m-1 flex flex-col sm:max-w-2xl sm:mx-auto sm:justify-center lg:flex lg:flex-row lg:max-w-full lg:mx-12 lg:h-96">
					<div className="bg-secondary mx-2 lg:mx-0 my-4 shadow-lg px-4 py-2 lg:mx-2 lg:w-2/5">
						<div className="flex justify-between mb-1">
							<h3 className="text-secondary font-semibold text-lg">Must watch/read</h3>
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

						{loading ? (
							<div className="m-1 animate-pulse">
								<div className="w-1/2 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />

								<div className="w-full px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />

								<div className="w-1/3 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />
							</div>
						) : (
							<div className="bg-secondary max-h-32 lg:max-h-72 overflow-auto px-2">
								{mustWatch.map((show) => {
									return (
										<Show
											data={show}
											key={show._id}
											edit={edit}
											setValsubmitted={setValsubmitted}
										/>
									);
								})}
							</div>
						)}
					</div>

					<div className="bg-secondary mx-2 lg:mx-0 my-4 shadow-lg px-4 py-2 lg:w-2/5 lg:mx-2">
						<div className="flex justify-between">
							<h3 className="text-secondary font-semibold text-lg">Continue Watching/Reading</h3>
						</div>
						<hr />

						{loading ? (
							<div className="m-1 animate-pulse">
								<div className="w-1/3 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />

								<div className="w-9/12 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />

								<div className="w-6/12 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />
							</div>
						) : (
							<div className="max-h-32 lg:max-h-72 overflow-auto px-2">
								{conWatch.map((show) => {
									return (
										<Show
											data={show}
											key={show._id}
											edit={edit}
											setValsubmitted={setValsubmitted}
										/>
									);
								})}
							</div>
						)}
					</div>

					<div className="bg-secondary mx-2 lg:mx-0 my-4 shadow-lg px-4 py-2 lg:w-2/5 lg:mx-2">
						<div className="flex justify-between">
							<h3 className="text-secondary font-semibold text-lg">Re watch/read</h3>
						</div>
						<hr />

						{loading ? (
							<div className="m-1 animate-pulse">
								<div className="w-8/12 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />

								<div className="w-4/12 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />

								<div className="w-6/12 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />
							</div>
						) : (
							<div className="max-h-32 lg:max-h-72 overflow-auto px-2">
								{rewatch.map((show) => {
									return (
										<Show
											data={show}
											key={show._id}
											edit={edit}
											setValsubmitted={setValsubmitted}
										/>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
