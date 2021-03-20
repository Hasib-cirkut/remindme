import { Row, Col } from 'antd';
import Nav from '../Components/Nav';
import FormComp from '../Components/FormComp';

import { useState, useEffect } from 'react';

function Main() {
	const [ name, setName ] = useState('');
	const [ type, setType ] = useState('mustwatch');

	const [ show, setShow ] = useState([]);
	const [ valSubmitted, setValsubmitted ] = useState('no');

	const [ mustWatch, setMustWatch ] = useState([]);
	const [ conWatch, setConWatch ] = useState([]);
	const [ rewatch, setRewatch ] = useState([]);

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
			<Row>
				<Col span={6} style={{ background: 'gray', height: '100vh' }}>
					col-8
				</Col>

				<Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
					<Nav />
					<FormComp
						handleName={handleName}
						handleDropdown={handleDropdown}
						handleSubmit={handleSubmit}
						name={name}
					/>

					<div style={{ marginTop: '5vh' }}>
						<div>
							<h3>Must watch</h3>
							<hr />

							{mustWatch.map((show) => {
								return <h1>{show.title}</h1>;
							})}
						</div>

						<div>
							<h3>Continue Watching</h3>
							<hr />

							{conWatch.map((show) => {
								return <h1>{show.title}</h1>;
							})}
						</div>

						<div>
							<h3>Rewatch</h3>
							<hr />

							{rewatch.map((show) => {
								return <h1>{show.title}</h1>;
							})}
						</div>
					</div>
				</Col>
				<Col span={6} style={{ background: 'gray', height: '100vh' }}>
					col-8
				</Col>
			</Row>
		</div>
	);
}

export default Main;
