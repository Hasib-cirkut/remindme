import { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Login from './Login';

function Register() {
	const [ name, setName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const [ userExists, setUserExits ] = useState(false);
	const [ authenticated, setAuth ] = useState(false);

	function handleName(e) {
		setName((prev) => e.target.value);
	}

	function handleUsername(e) {
		setUsername((prev) => e.target.value);
	}

	function handleEmail(e) {
		setEmail((prev) => e.target.value);
	}

	function handlePassword(e) {
		setPassword((prev) => e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		console.log({
			name,
			username,
			email,
			password
		});

		let temp = await fetch(`https://rocky-beach-47473.herokuapp.com/user/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				username,
				email,
				password
			})
		});

		temp = await temp.json();

		if (temp.message === 'duplicate') {
			setUserExits((prev) => true);
		} else if (temp.message === 'useradded') {
			setAuth((prev) => true);
		}
	}

	//useEffect(() => {}, [ userExists ]);

	if (authenticated) {
		return <Redirect to="/" />;
	} else {
		return (
			<div className="flex justify-center flex-col items-center h-screen">
				<div>
					<h1 className="text-center text-2xl sm:text-4xl tracking-widest subpixel-antialiased font-normal text-gray-600">
						remindme
					</h1>
				</div>
				<div className="flex justify-between w-48">
					<h1 className="text-center text-xl  tracking-widest subpixel-antialiased font-normal text-gray-600">
						register
					</h1>

					<p> /</p>

					<h1 className="text-center text-xl tracking-widest subpixel-antialiased font-normal cursor-pointer transition delay-150 duration-300 ease-in-out">
						<Link to="/login">login</Link>
					</h1>
				</div>

				<div className="m-1 py-4 flex w-screen flex-row my-4 mx-2 text-center sm:shadow-lg justify-center rounded-sm sm:max-w-2xl sm:mx-auto sm:mt-8">
					<form>
						<div className="mb-2">
							<label htmlFor="name" className="mb-2 uppercase font-bold text-md text-grey-darkest">
								name
							</label>
							<br />
							<input
								type="text"
								name="name"
								onChange={(e) => handleName(e)}
								className="border py-1 px-2 text-grey-darkest sm:w-64"
							/>
						</div>

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
							<label htmlFor="email" className="mb-2 uppercase font-bold text-md text-grey-darkest">
								email
							</label>
							<br />
							<input
								type="text"
								name="email"
								onChange={(e) => handleEmail(e)}
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

						{userExists && (
							<div className="mt-2">
								<h1 className="text-red-500">User already exists</h1>
								<p className="text-yellow-500">Tip: choose unique email and username</p>
							</div>
						)}
					</form>
				</div>
			</div>
		);
	}
}

export default Register;
