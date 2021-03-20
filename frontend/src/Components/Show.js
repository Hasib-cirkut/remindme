import { useState } from 'react';

function Show({ data }) {
	const [ id, setId ] = useState(data._id);

	return (
		<div className="px-2 py-1 my-0.5 rounded-sm flex justify-between border">
			<h1>{data.title}</h1>

			<button className="">Remove</button>
		</div>
	);
}

export default Show;
