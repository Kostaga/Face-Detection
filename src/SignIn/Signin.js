import React from "react";


const Signin = ({onRouteChange, loadUser}) => {

	const [signInEmail, setSignInEmail] = React.useState('');
	const [signinPass, setSignInPass] = React.useState('');

	const onEmailChange = (event) => {
		setSignInEmail(event.target.value);
	}

	const onPasswordChange = (event) => {
		setSignInPass(event.target.value);
	}

	const onSubmitSignIn = () => {
		fetch('https://mybackend-6o8n.onrender.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: signInEmail,
				password: signinPass
			})
		}).then(response => response.json()).then(user => {
			if (user.id) {
				loadUser(user);
				onRouteChange('home');
			}
		})
		
	}

	return (
		<div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
	<article className="br3 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa5 black-80">
		  <div className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		        <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
		      </div>
		    </fieldset>
		    <div className="">
		      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			  type="submit" 
			  value="Sign in" 
			  onClick={onSubmitSignIn}
			  />
		    </div>
		    <div className="lh-copy mt3">
		      <p onClick={() => onRouteChange('register')}  className="f4 link dim black db grow pointer">Register</p>
		    </div>
		  </div>

		  
	</main>


	

</article>

<div style={{width: '550px', height: '100vh' }}>
  <p className="f5 pa3">
    Important note: Since I'm hosting this project for free, the app automatically
    spuns down after 15 minutes of inactivity. So, the first time you Sign in/Register,
    please be patient. It usually takes a minute, and then it works as intended!
  </p>
</div>




</div>



	)
}

export default Signin