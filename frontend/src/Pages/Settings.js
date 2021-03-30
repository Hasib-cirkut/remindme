import { useState } from 'react';

function Settings() {
	const [ nameEditBtn, setNameEditBtn ] = useState(false);
	const [ emailEditBtn, setEmailEditBtn ] = useState(false);
	const [ passEditBtn, setPassEditBtn ] = useState(false);
	const [ isPrivate, setIsPrivate ] = useState(false);

	return (
		<div class="flex flex-col bg-gray-800 text-white h-screen mx-auto">
			<div class="bg-gray-900 rounded-md m-auto mx-auto px-6 w-full sm:w-10/12 font-light max-w-screen-md">
				<div class="my-4">
					<div class="flex justify-between">
						<div class="flex flex-col justify-start">
							<p class="text-gray-400">Display Name</p>
							<p class={'text-medium ' + (nameEditBtn ? `text-gray-500` : ``)}>Jane Doe</p>

							<div class={'flex flex-col sm:flex-row items-baseline ' + (nameEditBtn ? '' : 'hidden')}>
								<input type="text" class="bg-gray-200 mt-2 rounded px-2 py-1 text-black " />

								<div class="bg-green-600 items-end cursor-pointer h-auto text-center mt-2 sm:ml-4 sm:mt-0 px-3 py-1 hover:bg-green-700 rounded">
									<p class="font-medium text-xs">Update</p>
								</div>
							</div>
						</div>

						<div
							onClick={() => setNameEditBtn((prev) => !prev)}
							class="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded"
						>
							<p class="font-medium text-xs">Edit</p>
						</div>
					</div>

					<div class="flex justify-between mt-4">
						<div class="flex flex-col justify-start">
							<p class="text-gray-400">Email</p>
							<p class={'text-medium ' + (emailEditBtn ? `text-gray-500` : ``)}>hasibulhuda1@gmail.com</p>

							<div class={'flex flex-col sm:flex-row items-baseline ' + (emailEditBtn ? '' : 'hidden')}>
								<input type="email" class="bg-gray-200 mt-2 rounded px-2 py-1 text-black " />

								<div class="bg-green-600 items-end cursor-pointer h-auto text-center mt-2 sm:ml-4 sm:mt-0 px-3 py-1 hover:bg-green-700 rounded">
									<p class="font-medium text-xs">Update</p>
								</div>
							</div>
						</div>

						<div
							onClick={() => setEmailEditBtn((prev) => !prev)}
							class="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded"
						>
							<p class="font-medium text-xs">Edit</p>
						</div>
					</div>

					<div class="flex justify-between mt-4">
						<div class="flex flex-col justify-start">
							<p class="text-gray-400">Password</p>
							<p class={'text-medium ' + (passEditBtn ? `text-gray-500` : ``)}>*********</p>

							<div class={'flex flex-col sm:flex-row items-baseline ' + (passEditBtn ? '' : 'hidden')}>
								<input type="password" class="bg-gray-200 mt-2 rounded px-2 py-1 text-black " />

								<div class="bg-green-600 items-end cursor-pointer h-auto text-center mt-2 sm:ml-4 sm:mt-0 px-3 py-1 hover:bg-green-700 rounded">
									<p class="font-medium text-xs">Update</p>
								</div>
							</div>
						</div>

						<div
							onClick={() => setPassEditBtn((prev) => !prev)}
							class="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded"
						>
							<p class="font-medium text-xs">Change</p>
						</div>
					</div>

					<div class="flex justify-between mt-4">
						<div class="flex flex-col justify-start">
							<p class="text-gray-400">Lists</p>
							<p class={'font-medium ' + (isPrivate ? 'text-red-500' : 'text-green-500')}>
								{isPrivate ? 'Private' : 'Public'}
							</p>
						</div>

						<div
							onClick={() => setIsPrivate((prev) => !prev)}
							class="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded"
						>
							<p class="font-medium text-xs">Change</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
