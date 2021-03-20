function FormComp({ handleName, handleDropdown, handleSubmit, name }) {
	return (
		<div className="m-1 py-4 flex flex-row my-4 mx-2 text-center shadow-lg justify-center  rounded-sm">
			<form>
				<div className="mb-2">
					<label htmlFor="name" className="mb-2 uppercase font-bold text-md text-grey-darkest">
						Title
					</label>
					<br />
					<input
						type="text"
						name="name"
						value={name}
						onChange={(e) => handleName(e)}
						className="border py-1 px-2 text-grey-darkest"
					/>
				</div>

				<div className="mb-2">
					<label htmlFor="type" className="mb-2 uppercase font-bold text-md text-grey-darkest">
						Select type
					</label>
					<br />
					<select
						name="type"
						id="type"
						onChange={(e) => handleDropdown(e)}
						className="border py-1 px-2 text-grey-darkest"
					>
						<option value="mustwatch">Must Watch</option>
						<option value="continuewatching">Continue Watching</option>
						<option value="rewatch">Rewatch</option>
					</select>
				</div>

				<input
					type="submit"
					onClick={handleSubmit}
					className="block bg-green-300 hover:bg-bg-green-600 text-white uppercase text-md mx-auto p-2 rounded"
				/>
			</form>
		</div>
	);
}

export default FormComp;
