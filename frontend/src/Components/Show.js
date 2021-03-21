import { useState } from 'react';

function Show({ data, edit, setValsubmitted }) {
	const [ id, setId ] = useState(data._id);

	async function handleRemove(event) {
		event.preventDefault();

		let data = await fetch('http://localhost:5000/post/deletepost', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				_id: id
			})
		});

		data = await data.json();

		if (data.message === 'post_deleted') {
			setValsubmitted((prev) => {
				if (prev === 'yes') return 'no';
				else return 'yes';
			});
		}
	}

	return (
		<div className="px-2 py-1 sm:py-4 my-0.5 sm:my-2 rounded-sm flex justify-between border shadow-sm">
			<h1>{data.title}</h1>

			{edit && <button onClick={handleRemove}>Remove</button>}
		</div>
	);
}

export default Show;