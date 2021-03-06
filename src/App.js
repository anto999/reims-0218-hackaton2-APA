import React, { Component } from "react";
import ReactDOM from 'react-dom';
import logostarwars from "./images/logostarwars.png"
import "./App.css";
import ChoiceGender from "./components/ChoiceGender";
import ChoiceSpecie from "./components/ChoiceSpecie";
import ListChoices from "./components/ListChoices";
import ChoiceEye from "./components/ChoiceEye";
import { Container, Button } from 'reactstrap'
import StarLover from "./components/StarLover";
import ModalExample from "./components/ModalExample";
import ModalExample2 from "./components/ModalExample2";




class App extends Component {
  constructor() {
    super()
    this.state= {
      gender : '',
      species: '',
      eyeColor: '',
      peoples: [],
      selectedPeoples: [],
      count: 0,
      message: ''
    }
    this.changeGender= this.changeGender.bind(this)
    this.changeSpecie= this.changeSpecie.bind(this)
    this.changeEye=this.changeEye.bind(this)
    this.filter=this.filter.bind(this)
    this.increment=this.increment.bind(this)
    this.decrement=this.decrement.bind(this)
  }

  componentDidMount() {
    const url = 'https://akabab.github.io/starwars-api/api/all.json'
    fetch(url)
    .then(res => res.json())
    .then(rest => this.setState({peoples: rest})) // insert reading of the api in the state
  }

  filter() {
  //filtrer selon les critères
  this.setState(prevState => ({
    message:'You are too difficult to please',
    selectedPeoples: prevState.peoples
      .filter(people => this.state.gender === '' || people.gender === this.state.gender)
      .filter(people => this.state.species === '' || people.species === this.state.species)
      .filter(people => this.state.eyeColor === '' || people.eyeColor === this.state.eyeColor)
  }))
    
  }

  changeGender(gender) {
    this.setState ({
      gender: gender
    })
  }

  changeSpecie(species) {
    this.setState ({
      species: species
    })
  }

  changeEye(eyeColor) {
    this.setState ({
      eyeColor: eyeColor
    })
  }

  changeChoice(choice) {
    this.setState ({
      choice: choice
    })
  }

  increment() {
    if (this.state.count <this.state.selectedPeoples.length-1) {
      this.setState(
        prevState => ({count: prevState.count + 1})
      )}
  }

  decrement() {
    // increment only if count more than zero
    if (this.state.count >0) {
    this.setState(
      prevState => ({count: prevState.count - 1})
    )}
  }  

  displaySecondModal() {
    ReactDOM.render(<ModalExample2 />, document.getElementById('root'))
  }

  render() {
    return (
      <div className="App">
        <Container className="py-3 App-logo">
          <img src={logostarwars} alt="logostarwars" style={{width: '750px', height: '250px'}} />
          <br/>
          <ChoiceGender change={this.changeGender} gender={this.state.gender}  />
          <ChoiceSpecie change={this.changeSpecie} species={this.state.species} />
          <ChoiceEye  change={this.changeEye} eyeColor={this.state.eyeColor}/>
          <div className="planet"> 
            <div className="wrap">
            <div className="background"></div>
            <div className="clouds"></div>   
          </div>
          <div className="mask"></div>
          </div>
          <ListChoices gender={this.state.gender} species={this.state.species} eye={this.state.eyeColor} skin={this.state.skinColor}/>
          <Button onClick={this.filter} >Validate your choice</Button>
          <StarLover message={this.state.message} selectedPeoples={this.state.selectedPeoples} index={this.state.count} decreasing={this.decrement} increasing={this.increment}/>
          <ModalExample next={this.displaySecondModal}/>
          <div id="deuxieme modale"></div>
        </Container>
      </div>
    );
  }
}

export default App;

//name={this.state.name} gender={this.state.gender} species={this.state.species} eyeColor={this.state.eyeColor}