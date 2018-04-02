import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './component/navigation/Navigation';
import Signin from './component/signin/Signin';
import Register from './component/register/Register';
import ImageLinkForm from './component/imageLinkForm/ImageLinkForm';
import FaceRecognition from './component/faceRecognition/FaceRecognition';
import Logo from './component/logo/Logo';
import Rank from './component/rank/Rank';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'df1adb2c63a145649561c793fb2b8cbb'
});

const particlesOption = {
  particles: {
   number: {
    value: 30,
    density: {
      enable: true,
      value_area: 80
    }
   }
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false 
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].regions_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    } 
  }

  onRouteChange = (route) => {
    if ( route === 'signout') {
      this.setState({isSignedIn: 'false'})
    } else if ( route === 'home') {
      this.setState({isSignedIn: 'true'})
    }
    this.setState({route: route});
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
      app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.calculateFaceLocation(response))
       // console.log(response.outputs[0].data.regions[0].regions.info.bounding_box);
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOption}
         />
         <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        : (
          this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
        ) 
        
        
        }
      </div>
    );
  }
}

export default App;
