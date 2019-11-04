import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (value) => {
    this.setState({
      filters: {
        type: value
      }
    })
  }

  fetchPets = () => {
    let url = '/api/pets';
    if(this.state.filters.type !== "all") {url = url + `?type=${this.state.filters.type}`}
    fetch(url)
    .then(res => res.json())
    .then(pets => {
      this.setState({
        pets: [...pets]
      })
    })
  }

  adoptPet = (id) => {
    this.setState({
      pets: this.state.pets.map(pet => {
        if(pet.id === id){
          return {...pet, isAdopted : true}
         } else return pet
      })
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.fetchPets} onChangeType={this.changeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
