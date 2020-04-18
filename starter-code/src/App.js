import React, {Component} from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Food from './foods';
import FoodItem from "./components/FoodItem";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import AddFoodForm from "./components/AddFoodForm";

class App extends Component {

  state = {
    food : [...Food],
    searchValue: '',
    cart: [],
    addFoodModalOpen: false,
  };

  filterBy = (str) => {
    this.setState({
      'searchValue': str
    });
  };

  changeQuantity = (name, quantity) => {
    const {food} = this.state;
    this.setState({
      'food': food.map(element => {
        if (element.name === name) element.quantity = quantity;
        return element;
      })
    })
  };

  toggleModal = () => {
    this.setState({
      'addFoodModalOpen': !this.state.addFoodModalOpen,
    })
  };

  addToCart = (name) => {
    const {food, cart} = this.state;
    this.setState({
      cart: [
        ...cart.filter(el => el.name !== name && el.quantity > 0),
        Object.assign({}, ...food.filter(el => el.name === name))
      ]
    });
  };

  handleRemoveFromCart = (name) => {
    this.setState({
      'cart': this.state.cart.filter(el => el.name !== name)
    });
  };

  handleAddFoodSubmit = (newFood) => {
    const {food} = this.state;
    this.setState({
      'food': [...food, newFood]
    }, () => {
      this.toggleModal();
    });
  };

  render() {
    const {food, searchValue, addFoodModalOpen} = this.state;
    const filteredFoods = food.filter(element => element.name.toLowerCase().includes(searchValue.toLowerCase()));
    return (
      <div className="App container">
        <h1 className="title">IronNutrition</h1>
        <button className="openModal" onClick={this.toggleModal}>Add food</button>
        <div>
          <SearchBar onChange={this.filterBy} value={this.state.searchValue}/>
        </div>
        <div className="columns">
          <div className="column">
            {
              filteredFoods.map((element, index) => <FoodItem key={index} onChangeQuantity={this.changeQuantity}
                                                         onAdd={this.addToCart} foodData={element}/>)
            }
          </div>
          <div className="column content">
            <Cart cartItems={this.state.cart} removeCartItem={this.handleRemoveFromCart}/>
          </div>
        </div>
        <Modal title={'Add new food'} closeModal={this.toggleModal} status={addFoodModalOpen ? 'is-active' : ''}>
          <AddFoodForm handleSubmit={this.handleAddFoodSubmit}/>
        </Modal>
      </div>
    );
  }
}

export default App;
