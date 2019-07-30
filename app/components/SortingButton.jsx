import React from 'react';
import '../styles.css';

// Компонент для кнопки для сортировки постов:

class SortingButton extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <button id="sort-button" title="Sort by date" onClick={this.props.handleClick} class="btn btn-primary">
      {/*в зависимости от направления сортировки в состоянии компонента на кнопке меняется иконка: */}
         Sort by date <i className={"glyphicon glyphicon-chevron-" + this.props.direction}></i>
      </button>
    )
  }
}

export default SortingButton;
