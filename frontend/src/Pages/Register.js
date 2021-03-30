import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

function Register() {
	const [ name, setName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const [ userExists, setUserExits ] = useState(false);
	const [ authenticated, setAuth ] = useState(false);

	const [ loading, setLoading ] = useState(false);

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
		setLoading(true);

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
			setLoading(false);
		} else if (temp.message === 'useradded') {
			setAuth((prev) => true);
		}
	}

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
				<div className="flex justify-between w-48 mt-4">
					<h1 className="text-center text-xl  tracking-widest subpixel-antialiased font-normal text-gray-600 mr-2">
						register
					</h1>

					<p> /</p>

					<div className="flex justify-around w-28 ml-2">
						<h1 className="text-center text-xl tracking-widest subpixel-antialiased font-normal cursor-pointer transition delay-150 duration-300 ease-in-out">
							<Link to="/login">login</Link>
						</h1>

						<svg height="28" viewBox="0 0 512 512" width="28" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M416 512H96a96 96 0 01-96-96V96A96 96 0 0196 0h320a96 96 0 0196 96v320a96 96 0 01-96 96zm0 0"
								fill="#e3f8fa"
							/>
							<path
								d="M277.33 189.33a53.33 53.33 0 11-106.66 0 53.33 53.33 0 01106.66 0zm0 0M269.33 264h-90.67A50.73 50.73 0 00128 314.67V352a8 8 0 008 8h176a8 8 0 008-8v-37.33A50.73 50.73 0 00269.33 264zm0 0"
								fill="#26c6da"
							/>
							<path
								d="M381.46 226.13l-37.33-34.67a7.93 7.93 0 00-5.44-2.13c-5.28 0-8 4.5-8 7.98v24H288a10.68 10.68 0 000 21.35h42.67v24a8 8 0 0013.44 5.87l37.33-34.67a7.98 7.98 0 00.02-11.73zm0 0"
								fill="#8ce1eb"
							/>
						</svg>
					</div>
				</div>

				<div className="m-1 py-4 sm:border-2 sm:border-blue-200 flex w-screen flex-row my-4 mx-2 text-center sm:shadow-lg justify-center rounded-sm sm:max-w-2xl sm:mx-auto sm:mt-8">
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

						{loading ? (
							<button className="h-10 w-32 px-2 py-6 rounded-lg bg-red-500" disabled>
								<div className="flex justify-around items-center h-full">
									<svg
										className="animate-spin-slow h-5 w-5 bg-re"
										xmlns="http://www.w3.org/2000/svg"
										height="28"
										width="28"
										viewBox="0 0 512 512"
									>
										<path d="M256 0a15 15 0 00-15 15v96.4a15 15 0 0030 0V15a15 15 0 00-15-15zM256 385.6a15 15 0 00-15 15V497a15 15 0 0030 0v-96.4a15 15 0 00-15-15zM196.7 123.27L148.5 39.8a15 15 0 10-25.99 15l48.2 83.48a15 15 0 1025.98-15zM389.5 457.21l-48.2-83.48a15 15 0 10-25.99 15l48.2 83.48a15 15 0 1025.98-15zM138.27 170.71l-83.48-48.2a15 15 0 10-15 25.98l83.48 48.2a15 15 0 1015-25.98zM472.21 363.51l-83.48-48.2a15 15 0 10-15 25.98l83.48 48.2a15 15 0 1015-25.98zM111.4 241H15a15 15 0 000 30h96.4a15 15 0 000-30zM497 241h-96.4a15 15 0 000 30H497a15 15 0 000-30zM143.76 320.8a15 15 0 00-20.49-5.49l-83.48 48.2a15 15 0 0015 25.98l83.48-48.2a15 15 0 005.5-20.49zM477.7 128a15 15 0 00-20.49-5.49l-83.48 48.2a15 15 0 0015 25.98l83.48-48.2a15 15 0 005.5-20.49zM191.2 368.24a15 15 0 00-20.49 5.49l-48.2 83.48a15 15 0 1025.98 15l48.2-83.48a15 15 0 00-5.49-20.5zM384 34.3a15 15 0 00-20.49 5.49l-48.2 83.48a15 15 0 1025.98 15l48.2-83.48A15 15 0 00384 34.3z" />
									</svg>
									<h1 className="text-white font-medium">Processing</h1>
								</div>
							</button>
						) : (
							<input
								type="submit"
								onClick={handleSubmit}
								value="Submit"
								className="block h-10 w-32 px-2 rounded-lg bg-green-400 hover:bg-green-500 text-white text-md mx-auto p-2 rounded transition delay-150 duration-300 ease-in-out"
							/>
						)}

						{userExists && (
							<div className="mt-2">
								<h1 className="text-red-500 font-bold">User already exists</h1>
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
