import React, {Component} from "react";
import styled from "styled-components";
import Select from 'react-select'

class GeneSearch extends Component {

  center_div = styled.div`
    display: flex;
    justify-content: center;
  `

  selector_div = styled.div`
    display: inline;
    margin: .2rem;
    width: 50%;
  `
  render() {

    return (
      <this.center_div>
        <this.selector_div>
          <Select options={[{label: "EGFR", value: "EGFR"}, {label: "RET", value: "RET"}, {label: "KRAS", value: "KRAS"}]} onChange={this.props.onChange} />
        </this.selector_div>
      </this.center_div>
    )
  }

}

export default GeneSearch;