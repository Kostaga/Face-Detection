import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './artificial-intelligence.png';
import './Logo.css'

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2">
		      <div className="Tilt" style={{width: '125px', height: '125px', backgroundColor: 'darkgreen' }}>
		        <img style={{paddingTop: '15px'}} alt="brain" src={brain} width={'80px'} />
		      </div>
    		</Tilt>
		</div>
	);

}

export default Logo;