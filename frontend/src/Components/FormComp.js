function FormComp({ handleName, handleDropdown, handleSubmit, name }) {
	return (
		<div style={{ marginTop: '10vh', marginRight: '5vh', marginLeft: '5vh' }}>
			<form action="">
				<label htmlFor="name">Name</label>
				<input type="text" name="name" value={name} onChange={(e) => handleName(e)} />

				<label htmlFor="type">Select type</label>

				<select name="type" id="type" onChange={(e) => handleDropdown(e)}>
					<option value="mustwatch">Must Watch</option>
					<option value="continuewatching">Continue Watching</option>
					<option value="rewatch">Rewatch</option>
				</select>

				<input type="submit" onClick={handleSubmit} />
			</form>
		</div>
	);
}

export default FormComp;
