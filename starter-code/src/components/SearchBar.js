import React, {Component} from 'react';

class SearchBar extends Component {



  handleChange = (e) => {

    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <input onChange={this.handleChange} type="text" className="input search-bar" name="search" placeholder="Search" value={this.props.searchValue}/>
    );
  }
}

export default SearchBar;