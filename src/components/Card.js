import React from "react";
import Image from "./Image";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  handleClick = (e) => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  render() {
    const { name, image, type, brandName, price, storeName } =
      this.props.cardResults;

    return (
      <div className="card" style={{ border: "1px solid black" }} onClick={this.handleClick}>
        {this.state.clicked && (
          <div>
            <p>Price: {price}</p>
            <p>{storeName}</p>
          </div>
        )}
        <h1>{name}</h1>
          <Image src={image} />
        <p>{type}</p>
        <p>{brandName}</p>
      </div>
    );
  }
}

export default Card;
