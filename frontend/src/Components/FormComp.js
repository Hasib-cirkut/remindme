function FormComp() {
	return (
		<div style={{ marginTop: '10vh', marginRight: '5vh', marginLeft: '5vh' }}>
			<form action="">
				<label htmlFor="name">Name</label>
				<input type="text" name="name" />

				<label for="type">Select type</label>

				<select name="type" id="type">
					<option value="mustwatch">Must Watch</option>
					<option value="continuewatching">Continue Watching</option>
					<option value="rewatch">Rewatch</option>
				</select>

				<input type="submit" value="Add" />
			</form>
		</div>
	);
}

export default FormComp;
