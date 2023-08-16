import Navigation from './Components/Navigation';
import Logo from './Components/Logo';
import ImageLinkForm from './Components/ImageLinkForm';
import Rank from './Components/Rank';
import FaceRecognition from './Components/FaceRecognition';
import ParticlesBg from 'particles-bg';
import Register from './Register/Register';
import React from 'react';
import './App.css';
import Signin from './SignIn/Signin';

function App() {


    const setUpClarify = (imageUrl) => {

    const PAT = 'f14d882af7334713815a2fc0130f37c9';
    const USER_ID = 'whm96rx5ohjp';       
    const APP_ID = 'Face-Detection';
    const IMAGE_URL = imageUrl;


    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };


  }
    


  const [input, setInput] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [boxes, setBoxes] = React.useState([]);
  const [route, setRoute] = React.useState('signin');
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState({

    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '' 


  });

 
  const clearState = () => {
    setInput('');
    setImageUrl('');
    setBoxes([]);
    setRoute('signin');
    setIsSignedIn(false);
    setUser({

      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  });
  }


      const loadUser = (data) => {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        })
      }

      const handleChange = (event) => {
        const {value} = event.target
        setInput(value);     
        }


      const calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions.map((region) => region.region_info.bounding_box);
        const image = document.getElementById("inputImage");
        const width = Number(image.width);
        const height = Number(image.height);
        
        return clarifaiFace.map(face => {
          return {
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: width - (face.right_col * width),
            bottomRow: height  - (face.bottom_row * height) 
          }
        }) 
                
      }



      const displayFaceBox = (box) => {
        setBoxes(box);
      }

    
      const onButtonSubmit = () => {
        setImageUrl(input)

        

          fetch("https://api.clarifai.com/v2/models/face-detection/outputs", setUpClarify(input))
        .then(response => response.json())
        .then(result => {

          if (result) {
            fetch('https://mybackend-6o8n.onrender.com/image', {
              method: 'put',
        			headers: {'Content-Type': 'application/json'},
        			body: JSON.stringify({
        			id: user.id
			})
            }).then(response => response.json()).then(count => setUser( {
              ...user,
              entries: count
            })
            ).catch(console.log)
          }


          displayFaceBox(calculateFaceLocation(result))
        } )
        .catch(error => console.log('Error', error));

        

        
      }

      const onRouteChange = (route) => {
        if (route === 'signout') {
          clearState();
        }
        else if (route === 'home') {
          setIsSignedIn(true)
        }
        setRoute(route);
      }
    

  return (
    <div className="App">
      <ParticlesBg className='particles' color='#ffffff' type="cobweb" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange = {onRouteChange} />
      {route === 'home' ?
      <>
      <Logo />
      <Rank name = {user.name} entries = {user.entries} />
      <ImageLinkForm 
      onButtonSubmit = {onButtonSubmit} 
      onInputChange = {handleChange} />
      <FaceRecognition box = {boxes} imageUrl = {imageUrl} />
      </>
       : (route === 'signin') ?
      <Signin loadUser = {loadUser} onRouteChange = {onRouteChange} /> : <Register loadUser = {loadUser} onRouteChange = {onRouteChange} />
      
    }
    </div>
  );
}

export default App;
