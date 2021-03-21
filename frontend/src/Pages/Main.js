import { Row, Col } from 'antd';
import Nav from '../Components/Nav';
import FormComp from '../Components/FormComp';
import Show from '../Components/Show';

import { useState, useEffect } from 'react';

function Main() {
	const [ name, setName ] = useState('');
	const [ type, setType ] = useState('mustwatch');

	const [ show, setShow ] = useState([]);
	const [ valSubmitted, setValsubmitted ] = useState('no');

	const [ mustWatch, setMustWatch ] = useState([]);
	const [ conWatch, setConWatch ] = useState([]);
	const [ rewatch, setRewatch ] = useState([]);

	const [ edit, setEdit ] = useState(false);

	const handleDropdown = (event) => {
		setType((prevVal) => {
			return event.target.value;
		});
	};

	function handleName(event) {
		setName((prevVal) => {
			return event.target.value;
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (name === '') {
			return;
		}

		let temp = await fetch(`http://localhost:5000/post/addpost`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: 'hasib',
				title: name,
				type: type
			})
		});

		temp = await temp.json();

		setValsubmitted((prev) => {
			if (prev === 'yes') {
				return 'no';
			} else {
				return 'yes';
			}
		});

		setName((prev) => {
			return '';
		});
	}

	function handleEdit(event) {
		event.preventDefault();

		setEdit((prev) => !prev);
	}

	useEffect(
		() => {
			async function getData() {
				let data = await fetch(`http://localhost:5000/post`);

				data = await data.json();

				let mWatch = [];
				let cWatch = [];
				let rWatch = [];

				data.map((show) => {
					if (show.type === 'mustwatch') {
						mWatch.push(show);
					} else if (show.type === 'continuewatching') {
						cWatch.push(show);
					} else {
						rWatch.push(show);
					}
				});

				setMustWatch((prev) => {
					return [ ...mWatch ];
				});

				setConWatch((prev) => {
					return [ ...cWatch ];
				});

				setRewatch((prev) => {
					return [ ...rWatch ];
				});
			}

			getData();
			console.log('running');
		},
		[ valSubmitted, name ]
	);

	return (
		<div className="App">
			<Nav />
			<FormComp handleName={handleName} handleDropdown={handleDropdown} handleSubmit={handleSubmit} name={name} />

			<div className="m-1 sm:max-w-2xl sm:mx-auto">
				<div className="mx-2 sm:mx-0 my-4 shadow-lg px-4 py-2">
					<div className="flex justify-between mb-1">
						<h3>Must watch</h3>
						{edit ? (
							<button onClick={handleEdit} className="px-2 bg-green-600 rounded">
								Edit
							</button>
						) : (
							<button onClick={handleEdit} className="px-2 bg-green-300 rounded">
								Edit
							</button>
						)}
					</div>
					<hr />

					<div className="max-h-32 sm:max-h-52 overflow-auto px-2">
						{mustWatch.map((show) => {
							return <Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />;
						})}
					</div>
				</div>

				<div className="mx-2 sm:mx-0 my-4 shadow-lg px-4 py-2">
					<div className="flex justify-between">
						<h3>Continue Watching</h3>
					</div>
					<hr />

					<div className="max-h-32 overflow-auto px-2">
						{conWatch.map((show) => {
							return <Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />;
						})}
					</div>
				</div>

				<div className="mx-2 sm:mx-0 my-4 shadow-lg px-4 py-2">
					<div className="flex justify-between">
						<h3>Rewatch</h3>
					</div>
					<hr />

					<div className="max-h-32 overflow-auto px-2">
						{rewatch.map((show) => {
							return <Show data={show} key={show._id} edit={edit} setValsubmitted={setValsubmitted} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Main;
