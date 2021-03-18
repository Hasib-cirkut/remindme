import { Row, Col } from 'antd';
import Nav from '../Components/Nav';
import FormComp from '../Components/FormComp';
import Sections from '../Components/Sections';

function Main() {
	return (
		<div className="App">
			<Row>
				<Col span={6} style={{ background: 'gray', height: '100vh' }}>
					col-8
				</Col>

				<Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
					<Nav />
					<FormComp />
					<Sections />
				</Col>
				<Col span={6} style={{ background: 'gray', height: '100vh' }}>
					col-8
				</Col>
			</Row>
		</div>
	);
}

export default Main;
