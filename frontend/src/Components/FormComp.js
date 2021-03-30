function FormComp({ handleName, handleDropdown, handleSubmit, handleGenre, name, genre }) {
	return (
		<div className="sm:m-1 py-4 bg-secondary flex flex-row my-4 sm:mx-2 text-center shadow-lg justify-center rounded-sm sm:max-w-2xl sm:mx-auto sm:mt-8">
			<form>
				<div className="mb-2">
					<label htmlFor="name" className="mb-2 uppercase font-bold text-md text-secondary">
						Title
					</label>
					<br />
					<input
						placeholder="e.g. mank, banshee"
						type="text"
						name="name"
						value={name}
						onChange={(e) => handleName(e)}
						className="border-b border-blue-200 rounded-sm py-1 px-2 text-grey-darkest w-64 bg-secondary text-primary"
					/>
				</div>

				<div className="mb-2">
					<label htmlFor="genre" className="mb-2 uppercase font-bold text-md text-secondary">
						Genre
					</label>
					<br />
					<select
						name="genre"
						id="genre"
						onChange={(e) => handleGenre(e)}
						className="bg-secondary border border-blue-200 rounded-sm py-1 px-2 text-secondary w-64"
					>
						<option value="movie">Movie</option>
						<option value="series">TV Series</option>
						<option value="book">Book</option>
					</select>
				</div>

				<div className="mb-2">
					<label htmlFor="type" className="mb-2 uppercase font-bold text-md text-secondary">
						Select type
					</label>
					<br />
					<select
						name="type"
						id="type"
						onChange={(e) => handleDropdown(e)}
						className="bg-secondary border border-blue-200 rounded-sm py-1 px-2 text-secondary w-64"
					>
						<option value="mustwatch">Must Watch</option>
						<option value="continuewatching">Continue Watching</option>
						<option value="rewatch">Rewatch</option>
					</select>
				</div>

				<input
					type="submit"
					onClick={handleSubmit}
					className="block bg-primary text-primary hover:bg-green-500 text-white uppercase text-md mx-auto p-2 rounded transition delay-150 duration-300 ease-in-out"
					value="Submit"
				/>
			</form>
		</div>
	);
}

export default FormComp;
