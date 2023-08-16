import React from "react";
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {


	
	return (
		<>
		<div>
			<p className="f3">
				{'This Magic Brain will detect faces in your pictures.'}
			</p>
			<p className="f3">
				{"It's really easy to use! Just copy any image URL and paste it into the search box. You can use this as an example"}	
			</p>
			<a className="f3 link dim black underline pa2" target="_blank" href="https://t4.ftcdn.net/jpg/00/76/27/53/360_F_76275384_mRNrmAI89UPWoWeUJfCL9CptRxg3cEoF.jpg" rel="noreferrer">Click Here</a>
			<br></br>

		</div>

		<div className="center pa4">
			<div className="form center pa4 br4 shadow-5">
				<input className="f4 br2 pa2 w-70 center" type="text" onChange={onInputChange} />
				<button onClick={onButtonSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
			</div>
		</div>
		</>
	);
}

export default ImageLinkForm;