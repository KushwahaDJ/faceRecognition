import React from 'react';
import Tilt from 'react-tilt'
import Brain from './Brain.png'
import './Logo.css';

const Logo = () => {
	return (
			<div className='ma4 mt0'>
				<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 200, width: 200 }} >
					 <div className="Tilt-inner pa3"> 
					 	<img alt='logo' style={{padingTop: '5px', width:'150px', height: '150px'}} src={Brain}/> 
					 </div>
				</Tilt>
			</div>
		);
}

export default Logo;