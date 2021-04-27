import { useState } from 'react';

import Show from './Show';

export default function Tiles({ title, data, edit, loading, setValsubmitted }) {
	const [ sort, setSort ] = useState('all');

	console.log(data);

	function handleSort(genre) {
		setSort((prev) => genre);
	}

	return (
		<div className="bg-secondary mx-2 lg:mx-0 my-4 shadow-lg px-4 py-2 lg:mx-2 rounded-md">
			<div className="flex justify-between">
				<h3 className="text-secondary font-semibold text-lg">{title}</h3>

				<div className="flex justify-around items-center">
					<div
						onClick={() => handleSort('all')}
						className={
							`rounded-md px-2 mr-2 text-black text-xs py-0.5 cursor-pointer ` +
							(sort === 'all' ? `bg-pink-300` : 'bg-gray-300')
						}
					>
						<span>All</span>
					</div>

					<div
						onClick={() => handleSort('movie')}
						className={
							`rounded-md px-2 mr-2 text-black text-xs py-0.5 cursor-pointer ` +
							(sort === 'movie' ? `bg-pink-300` : 'bg-gray-300')
						}
					>
						<span>Movies</span>
					</div>

					<div
						onClick={() => handleSort('series')}
						className={
							`rounded-md px-2 mr-2 text-black text-xs py-0.5 cursor-pointer ` +
							(sort === 'series' ? `bg-pink-300` : 'bg-gray-300')
						}
					>
						<span>Series</span>
					</div>

					<div
						onClick={() => handleSort('book')}
						className={
							`rounded-md px-2 mr-2 text-black text-xs py-0.5 cursor-pointer ` +
							(sort === 'book' ? `bg-pink-300` : 'bg-gray-300')
						}
					>
						<span>Books</span>
					</div>
				</div>
			</div>
			<hr />

			{loading ? (
				<div className="m-1 animate-pulse">
					<div className="w-1/3 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />

					<div className="w-9/12 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />

					<div className="w-6/12 px-2 py-4 sm:py-6 bg-gray-400 mt-2 rounded-sm" />
				</div>
			) : (
				<div className="max-h-72 lg:max-h-72 overflow-auto px-2">
					{data.map((show) => {
						if (sort === 'movie') {
							if (show.genre === 'movie')
								return (
									<Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />
								);
						} else if (sort === 'series') {
							if (show.genre === 'series') {
								return (
									<Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />
								);
							}
						} else if (sort === 'book') {
							if (show.genre === 'book') {
								return (
									<Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />
								);
							}
						} else {
							return <Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />;
						}
					})}
				</div>
			)}
		</div>
	);
}
