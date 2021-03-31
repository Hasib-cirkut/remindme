import { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

function Login() {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ authenticated, setAuth ] = useState(false);

	const [ userNotFoundError, setUNFE ] = useState(false);

	const [ loading, setLoading ] = useState(false);

	function handleUsername(e) {
		setUsername((prev) => e.target.value);
	}

	function handlePassword(e) {
		setPassword((prev) => e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		setLoading(true);

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
			setLoading(false);
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

				<div className="flex justify-between w-48 mt-4">
					<h1 className="text-center text-xl tracking-widest subpixel-antialiased font-normal text-gray-600">
						login
					</h1>

					<p> /</p>

					<div className="flex justify-around w-28">
						<h1 className="text-center text-xl tracking-widest subpixel-antialiased font-normal cursor-pointer transition delay-150 duration-300 ease-in-out">
							<Link to="/register">register</Link>
						</h1>
						<svg className="" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M14.25 3H2.75A2.75 2.75 0 000 5.75v12.5A2.75 2.75 0 002.75 21h7.38l.22-1.23c.1-.56.36-1.06.76-1.47l1.3-1.3H3.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.18 0 .35.07.48.18L17 12.42V5.75A2.75 2.75 0 0014.25 3zm-1 10.75h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75s-.34.75-.75.75zm0-3.25h-9.5c-.41 0-.75-.34-.75-.75S3.34 9 3.75 9h9.5c.41 0 .75.34.75.75s-.34.75-.75.75z"
								fill="#2196f3"
							/>
							<path
								d="M12.25 2h-1.1a2.76 2.76 0 00-5.3 0h-1.1a.76.76 0 00-.75.75v2c0 .96.79 1.75 1.75 1.75h5.5c.96 0 1.75-.79 1.75-1.75v-2a.76.76 0 00-.75-.75z"
								fill="#1976d2"
							/>
							<g fill="#fff">
								<path d="M14 9.75c0 .41-.34.75-.75.75h-9.5c-.41 0-.75-.34-.75-.75S3.34 9 3.75 9h9.5c.41 0 .75.34.75.75zM14 13c0 .41-.34.75-.75.75h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75zM13.73 15.68L12.41 17H3.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.18 0 .35.07.48.18z" />
							</g>
							<path
								d="M4 3H2.75A2.75 2.75 0 000 5.75v12.5A2.75 2.75 0 002.75 21H8.5v-4H3.75a.76.76 0 01-.75-.75c0-.41.34-.75.75-.75H8.5v-1.75H3.75A.76.76 0 013 13c0-.41.34-.75.75-.75H8.5V10.5H3.75A.76.76 0 013 9.75c0-.41.34-.75.75-.75H8.5V6.5H5.75C4.79 6.5 4 5.71 4 4.75z"
								fill="#1d83d4"
							/>
							<path
								d="M8.5 0C7.24 0 6.18.85 5.85 2h-1.1a.76.76 0 00-.75.75v2c0 .96.79 1.75 1.75 1.75H8.5z"
								fill="#1667b7"
							/>
							<path
								d="M8.5 9H3.75a.76.76 0 00-.75.75c0 .41.34.75.75.75H8.5zM8.5 12.25H3.75A.76.76 0 003 13c0 .41.34.75.75.75H8.5zM8.5 15.5H3.75a.76.76 0 00-.75.75c0 .41.34.75.75.75H8.5z"
								fill="#dedede"
							/>
							<path
								d="M12.53 24a.75.75 0 01-.74-.88l.53-3c.02-.16.1-.3.2-.4l7.43-7.43c.91-.91 1.81-.67 2.3-.18l1.24 1.24c.68.68.68 1.8 0 2.48l-7.43 7.42c-.1.1-.25.18-.4.2l-3 .54zm3-1.28h.01z"
								fill="#ffc107"
							/>
							<path
								d="M21.23 11.68c-.4 0-.83.17-1.28.61l-7.42 7.43c-.11.1-.18.24-.21.4l-.53 3c-.04.24.03.49.2.66.02 0 .02.01.03.02l10.96-10.96-.73-.73c-.25-.25-.6-.44-1.02-.44z"
								fill="#dea806"
							/>
						</svg>
					</div>
				</div>

				<div className="m-1 py-4 sm:border-2 sm:border-blue-200 flex w-screen flex-row my-4 mx-2 text-center sm:shadow-lg justify-center rounded-sm sm:max-w-2xl sm:mx-auto sm:mt-8">
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

						{loading ? (
							<button
								className="h-10 w-32 px-2 py-6 rounded-lg bg-yellow-500 cursor-not-allowed"
								disabled
							>
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
