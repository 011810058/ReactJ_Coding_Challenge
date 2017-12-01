import React from 'react';

//rendering button for each square and handling click operation 
class Square extends React.Component {
	constructor(props) {
	    super(props);
  	}

  //On clicking the square the value is compared with already flipped card 
  handleClick() {
    if (!this.props.attr.flipped) {
      this.props.calculateMatch(this.props.attr.value, this.props.id);
    }
  }
	
	render() {
		var cardValue = this.props.attr.flipped ? this.props.attr.value : '';
		return (
			<button className="square" onClick={() => this.handleClick()}>
			  {cardValue}
			</button>
			//
		);
	}
}

export default Square;