import { useState, useEffect } from 'react';

function Show({ data, edit, setValsubmitted }) {
	const [ id, setId ] = useState(data._id);
	const [ genre, setGenre ] = useState('');
	const [ textColor, setTextColor ] = useState('');

	async function handleRemove(event) {
		event.preventDefault();

		let data = await fetch('https://rocky-beach-47473.herokuapp.com/post/deletepost', {
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

	useEffect(() => {
		if (data.genre === 'series') {
			setGenre((prev) => 'TV Series');
			setTextColor((prev) => 'text-yellow-500');
		} else if (data.genre === 'movie') {
			setGenre((prev) => 'Movie');
			setTextColor((prev) => 'text-blue-500');
		} else {
			setGenre((prev) => 'Book');
			setTextColor((prev) => 'text-pink-500');
		}
	}, []);

	return (
		<div className="bg-third px-2 py-2 sm:py-4 my-0.5 sm:my-2 rounded-sm flex justify-between shadow-sm">
			<h1 className="text-primary font-medium">
				{data.title} | <span className={`${textColor}`}>{genre}</span>
			</h1>
			{edit && <button onClick={handleRemove}>Remove</button>}
		</div>
	);
}

export default Show;
