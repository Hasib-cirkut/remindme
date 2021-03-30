function Settings() {
	return (
		<div class="flex flex-col bg-gray-800 text-white h-screen mx-auto">
			<div class="flex flex-col py-6 mx-6">My Account</div>

			<div class="bg-gray-900 rounded-md m-auto mx-auto px-6 w-10/12 font-light max-w-screen-md">
				<div class="my-4">
					<div class="flex justify-between">
						<div class="flex flex-col justify-start">
							<p class="text-gray-400">Display Name</p>
							<p class="font-medium">Jane Doe</p>
						</div>

						<div class="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded">
							<p class="font-medium text-xs">Edit</p>
						</div>
					</div>

					<div class="flex justify-between mt-4">
						<div class="flex flex-col justify-start">
							<p class="text-gray-400">Email</p>
							<p class="font-medium">hasibulhuda1@gmail.com</p>
						</div>

						<div class="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded">
							<p class="font-medium text-xs">Edit</p>
						</div>
					</div>

					<div class="flex justify-between mt-4">
						<div class="flex flex-col justify-start">
							<p class="text-gray-400">Password</p>
							<p class="font-medium">*********</p>
						</div>

						<div class="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded">
							<p class="font-medium text-xs">Change</p>
						</div>
					</div>

					<div class="flex justify-between mt-4">
						<div class="flex flex-col justify-start">
							<p class="text-gray-400">Lists</p>
							<p class="font-medium">Public</p>
						</div>

						<div class="bg-gray-600 items-end cursor-pointer h-auto text-center my-auto px-3 py-1 hover:bg-gray-700 rounded">
							<p class="font-medium text-xs">Change</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
