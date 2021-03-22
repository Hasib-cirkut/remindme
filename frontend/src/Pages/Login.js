import { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Main from './Main';

function Login() {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ authenticated, setAuth ] = useState(false);

	const [ userNotFoundError, setUNFE ] = useState(false);

	function handleUsername(e) {
		setUsername((prev) => e.target.value);
	}

	function handlePassword(e) {
		setPassword((prev) => e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		let temp = await fetch(`https://rocky-beach-47473.herokuapp.com/user/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password
			})
		});

		temp = await temp.json();

		if (temp.message === 'userfound') {
			localStorage.setItem('username', username);
			setAuth((prev) => true);
		} else if (temp.message === 'usernotfound') {
			setUNFE((prev) => true);
		}
	}

	useEffect(() => {
		function checkAuth() {
			if (localStorage.getItem('username') === null) {
				setAuth((prev) => false);
			} else {
				setAuth((prev) => true);
			}
		}

		checkAuth();
	}, []);

	if (authenticated) {
		return <Redirect to="/main" />;
	} else {
		return (
			<div className="flex justify-center flex-col items-center h-screen">
				<div>
					<h1 className="text-center text-2xl sm:text-4xl tracking-widest subpixel-antialiased font-normal text-gray-600">
						remindme
					</h1>
				</div>
				<div className="flex justify-between w-48">
					<h1 className="text-center text-xl tracking-widest subpixel-antialiased font-normal text-gray-600">
						login
					</h1>

					<p> /</p>

					<h1 className="text-center text-xl tracking-widest subpixel-antialiased font-normal cursor-pointer transition delay-150 duration-300 ease-in-out">
						<Link to="/register">register</Link>
					</h1>
				</div>

				<div className="m-1 py-4 flex w-screen flex-row my-4 mx-2 text-center sm:shadow-lg justify-center rounded-sm sm:max-w-2xl sm:mx-auto sm:mt-8">
					<form>
						<div className="mb-2">
							<label htmlFor="username" className="mb-2 uppercase font-bold text-md text-grey-darkest">
								Username
							</label>
							<br />
							<input
								type="text"
								name="username"
								onChange={(e) => handleUsername(e)}
								className="border py-1 px-2 text-grey-darkest sm:w-64"
							/>
						</div>

						<div className="mb-2">
							<label htmlFor="password" className="mb-2 uppercase font-bold text-md text-grey-darkest">
								Password
							</label>
							<br />
							<input
								type="password"
								name="password"
								onChange={(e) => handlePassword(e)}
								className="border py-1 px-2 text-grey-darkest sm:w-64"
							/>
						</div>

						<input
							type="submit"
							onClick={handleSubmit}
							className="block bg-green-300 hover:bg-green-500 text-white uppercase text-md mx-auto p-2 rounded transition delay-150 duration-300 ease-in-out"
						/>

						{userNotFoundError && (
							<div className="mt-2">
								<h1 className="text-red-500">username, password doesn't match</h1>
							</div>
						)}
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
