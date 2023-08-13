import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {


	const borders = box.map((box,i) => {
		const {topRow, rightCol, leftCol, bottomRow } = box;

		const faceCoordinates = {
			top: topRow, 
			right: rightCol, 
			bottom: bottomRow, 
			left: leftCol
		}

		return <div key={i} className="bounding-box" style={faceCoordinates}></div>

	})


	return (
		<div className="center ma">
			<div className="absolute mt2">
				{imageUrl && <img id="inputImage" className="pa3" alt="face" src={imageUrl} width={'700px'} height={'auto'} /> }
				{borders}
			</div>
			
		</div>
	)
}


export default FaceRecognition;