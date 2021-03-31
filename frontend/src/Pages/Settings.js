import { useState, useEffect } from 'react';

function Settings() {
	const [ nameEditBtn, setNameEditBtn ] = useState(false);
	const [ emailEditBtn, setEmailEditBtn ] = useState(false);
	const [ passEditBtn, setPassEditBtn ] = useState(false);
	const [ isPrivate, setIsPrivate ] = useState(false);

	const [ userInfo, setUserInfo ] = useState({});
	const [ updatedDisplayName, setUpdatedDisplayName ] = useState('');
	const [ updatedEmail, setUpdatedEmail ] = useState('');
	const [ updatedPassword, setUpdatedPassword ] = useState('');

	const [ triggerUE, setTriggerUE ] = useState(false);

	useEffect(
		() => {
			async function getUserInfo() {
				let userInfo = await fetch(`https://rocky-beach-47473.herokuapp.com/user/info`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: localStorage.getItem('username')
					})
				});

				userInfo = await userInfo.json();

				setUserInfo((prev) => userInfo);
			}

			getUserInfo();
		},
		[ triggerUE ]
	);

	async function handleUpdate(catergory) {
		let data = '';

		if (catergory === 'displayName') {
			data = updatedDisplayName;
		} else if (catergory === 'email') {
			if (updatedEmail === '') return;
			data = updatedEmail;
		} else if (catergory === 'password') {
			data = updatedPassword;
		}

		let updatedPost = await fetch(`https://rocky-beach-47473.herokuapp.com/user/update`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: localStorage.getItem('username'),
				type: catergory,
				data: data
			})
		});

		updatedPost = await updatedPost.json();

		if (updatedPost.message === 'updated') {
			setTriggerUE((prev) => !prev);

			//To hide the input fields after an update is done
			if (catergory === 'displayName') {
				setNameEditBtn((prev) => !prev);
			} else if (catergory === 'email') {
				setEmailEditBtn((prev) => !prev);
			} else if (catergory === 'password') {
				setPassEditBtn((prev) => !prev);
			}
		}
	}

	async function handlePrivacyChange() {
		let updatedPost = await fetch(`https://rocky-beach-47473.herokuapp.com/user/update`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: localStorage.getItem('username'),
				type: 'private',
				data: userInfo.private ? false : true
			})
		});

		updatedPost = await updatedPost.json();

		if (updatedPost.message === 'updated') {
			setTriggerUE((prev) => !prev);
		}
	}

	return (
		<div className="flex flex-col bg-gray-800 text-white h-screen mx-auto">
			<div className="bg-gray-900 rounded-md m-auto mx-auto px-6 w-full sm:w-10/12 font-light max-w-screen-md">
				<div className="my-4">
					<div className="flex justify-between">
						<div className="flex flex-col justify-start">
							<p className="text-gray-400">Display Name</p>
							<p className={'text-medium ' + (nameEditBtn ? `text-gray-500` : ``)}>
								{userInfo.displayName === '' ? 'Jane Doe' : userInfo.displayName}
							</p>

							<div
								className={'flex flex-col sm:flex-row items-baseline ' + (nameEditBtn ? '' : 'hidden')}
							>
								<input
									value={updatedDisplayName}
									onChange={(e) => {
										setUpdatedDisplayName((prev) => e.target.value);
									}}
									type="text"
									className="bg-gray-200 mt-2 rounded px-2 py-1 text-black "
								/>

								<div
									onClick={() => {
										handleUpdate('displayName');
									}}
									className="bg-green-600 items-end cursor-pointer h-auto text-center mt-2 sm:ml-4 sm:mt-0 px-3 py-1 hover:bg-green-700 rounded"
								>
									<p className="font-medium text-xs">Update</p>
								</div>
							</div>
						</div>

						<div
							onClick={() => setNameEditBtn((prev) => !prev)}
							className="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded"
						>
							<p className="font-medium text-xs">Edit</p>
						</div>
					</div>

					<div className="flex justify-between mt-4">
						<div className="flex flex-col justify-start">
							<p className="text-gray-400">Email</p>
							<p className={'text-medium ' + (emailEditBtn ? `text-gray-500` : ``)}>{userInfo.email}</p>

							<div
								className={'flex flex-col sm:flex-row items-baseline ' + (emailEditBtn ? '' : 'hidden')}
							>
								<input
									value={updatedEmail}
									onChange={(e) => {
										setUpdatedEmail((prev) => e.target.value);
									}}
									type="email"
									className="bg-gray-200 mt-2 rounded px-2 py-1 text-black "
								/>

								<div
									onClick={() => {
										handleUpdate('email');
									}}
									className="bg-green-600 items-end cursor-pointer h-auto text-center mt-2 sm:ml-4 sm:mt-0 px-3 py-1 hover:bg-green-700 rounded"
								>
									<p className="font-medium text-xs">Update</p>
								</div>
							</div>
						</div>

						<div
							onClick={() => setEmailEditBtn((prev) => !prev)}
							className="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded"
						>
							<p className="font-medium text-xs">Edit</p>
						</div>
					</div>

					<div className="flex justify-between mt-4">
						<div className="flex flex-col justify-start">
							<p className="text-gray-400">Password</p>
							<p className={'text-medium ' + (passEditBtn ? `text-gray-500` : ``)}>*********</p>

							<div
								className={'flex flex-col sm:flex-row items-baseline ' + (passEditBtn ? '' : 'hidden')}
							>
								<input
									value={updatedPassword}
									onChange={(e) => {
										setUpdatedPassword((prev) => e.target.value);
									}}
									type="password"
									className="bg-gray-200 mt-2 rounded px-2 py-1 text-black "
								/>

								<div
									onClick={() => {
										handleUpdate('password');
									}}
									className="bg-green-600 items-end cursor-pointer h-auto text-center mt-2 sm:ml-4 sm:mt-0 px-3 py-1 hover:bg-green-700 rounded"
								>
									<p className="font-medium text-xs">Update</p>
								</div>
							</div>
						</div>

						<div
							onClick={() => setPassEditBtn((prev) => !prev)}
							className="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded"
						>
							<p className="font-medium text-xs">Change</p>
						</div>
					</div>

					<div className="flex justify-between mt-4">
						<div className="flex flex-col justify-start">
							<p className="text-gray-400">Lists</p>
							<p className={'font-medium ' + (userInfo.private ? 'text-red-500' : 'text-green-500')}>
								{userInfo.private ? 'Private' : 'Public'}
							</p>
						</div>

						<div
							onClick={() => handlePrivacyChange()}
							className="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded"
						>
							<p className="font-medium text-xs">Change</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
