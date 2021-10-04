import React, {Component} from "react";
import styled from "styled-components";

class HelloWorld extends Component {

  center_div = styled.div`
    text-align: center;
  `

  render() {

    return (
      <this.center_div>
	Hello, World
      </this.center_div>
    )
  }

}

export default HelloWorld;