function FormComp({ handleName, handleDropdown, handleSubmit, handleGenre, name, genre }) {
	return (
		<div className="sm:m-1 py-4 px-4 bg-secondary flex flex-col justify-center items-center sm:flex-row my-4 sm:mx-2 text-center shadow-lg justify-around rounded-sm sm:max-w-2xl sm:mx-auto sm:mt-8">
			<div className="flex-1 bg-white rounded-md justify-center items-center py-3 px-3 mr-2 w-full">
				<div className="flex flex-col justify-center items-center sm:flex-row">
					<input
						placeholder="e.g. mank, banshee"
						type="text"
						name="name"
						value={name}
						onChange={(e) => handleName(e)}
						className="sm:flex-1 border border-blue-100 sm:border-0 focus:outline-none rounded-md mb-2 sm:mb-0 py-1 px-2 text-grey-darkest w-3/4 sm:w-auto text-primary"
					/>

					<select
						name="genre"
						id="genre"
						onChange={(e) => handleGenre(e)}
						className="bg-gray-100 cursor-pointer rounded-md py-1 px-2 text-secondary w-3/5 mb-2 sm:mb-0 sm:w-auto sm:mr-2"
					>
						<option value="movie">Movie</option>
						<option value="series">TV Series</option>
						<option value="book">Book</option>
					</select>

					<select
						name="type"
						id="type"
						onChange={(e) => handleDropdown(e)}
						className="bg-gray-100 cursor-pointer rounded-md py-1 px-2 text-secondary w-3/5 sm:w-auto"
					>
						<option value="mustwatch">Must Watch</option>
						<option value="continuewatching">Cont Watching</option>
						<option value="rewatch">Rewatch</option>
					</select>
				</div>
			</div>

			<input
				type="submit"
				onClick={handleSubmit}
				className="bg-primary px-2 py-2 mt-2 sm:mt-0  sm:w-auto text-primary h-auto text-sm hover:bg-green-500 text-white uppercase cursor-pointer rounded-md "
				value="Submit"
			/>
		</div>
	);
}

export default FormComp;
