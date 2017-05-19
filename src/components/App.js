import React, { Component } from 'react';

import '../styles/app.scss';
import img from '../images/logo.jpg';

export default class App extends Component {
	render() {
		return(
			<div className="bobby">

				<img src={img} />

				<h1>Bobby github:<a href="https://github.com/oOBobbyOo">github.com/oOBobbyOo</a></h1>	
			</div>
		)
	}
}