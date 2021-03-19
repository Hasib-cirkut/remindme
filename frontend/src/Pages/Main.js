import { Row, Col } from 'antd';
import Nav from '../Components/Nav';
import FormComp from '../Components/FormComp';
import Sections from '../Components/Sections';

import { useState, useEffect } from 'react';

function Main() {
	const [ name, setName ] = useState('');
	const [ type, setType ] = useState('mustwatch');

	const [ show, setShow ] = useState([]);
	const [ valSubmitted, setValsubmitted ] = useState('no');

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
			if (prev == 'yes') {
				return 'no';
			} else {
				return 'yes';
			}
		});
	}

	useEffect(
		() => {
			async function getData() {
				let data = await fetch(`http://localhost:5000/post`);

				data = await data.json();

				setShow((prev) => {
					return data;
				});
			}

			getData();
			console.log('running');
		},
		[ valSubmitted ]
	);

	return (
		<div className="App">
			<Row>
				<Col span={6} style={{ background: 'gray', height: '100vh' }}>
					col-8
				</Col>

				<Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
					<Nav />
					<FormComp handleName={handleName} handleDropdown={handleDropdown} handleSubmit={handleSubmit} />
					<Sections />

					{show.map((tempShow) => {
						return <h3>{tempShow.title}</h3>;
					})}
				</Col>
				<Col span={6} style={{ background: 'gray', height: '100vh' }}>
					col-8
				</Col>
			</Row>
		</div>
	);
}

export default Main;
