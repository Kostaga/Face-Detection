import React from "react";


const Register = ({onRouteChange, loadUser}) => {


	const [registerInEmail, setRegisterEmail] = React.useState('');
	const [registerPass, setRegisterPass] = React.useState('');
	const [registerName, setRegisterName] = React.useState('');

	const onNameChange = (event) => {
		setRegisterName(event.target.value);
	}

	const onEmailChange = (event) => {
		setRegisterEmail(event.target.value);
	}

	const onPasswordChange = (event) => {
		setRegisterPass(event.target.value);
	}

	const onSubmitRegister = () => {
		fetch('https://mybackend-6o8n.onrender.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: registerName,
				email: registerInEmail,
				password: registerPass
			})
		}).then(response => response.json()).then(user => {
			if (user.id) {
				loadUser(user);
				onRouteChange('home');
			}
		})
		
	}


	return (
	<article className="br3 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa5 black-80">
		  <div className="measure">
		    <fieldset id="register" className="ba b--transparent ph0 mh0">
		      <legend className="f1 fw6 ph0 mh0">Register</legend>
			  <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				type="name" 
				name="name"  
				id="name" 
				onChange={onNameChange}/>
		      </div>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				type="email" 
				name="email-address"  
				id="email-address" 
				onChange={onEmailChange}/>
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				type="password" 
				name="password"  
				id="password" 
				onChange={onPasswordChange}
				/>
		      </div>
		    </fieldset>
		    <div className="">
		      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			  type="submit" 
			  value="Register" 
			  onClick={onSubmitRegister}
			  />
		    </div>
		  </div>
	</main>
</article>

	)
}

export default Register