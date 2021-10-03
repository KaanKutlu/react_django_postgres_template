import React, {Component} from "react";
import styled from "styled-components";
import Select from 'react-select'
import GeneSearch from "../PageSearch/GeneSearch";
import GeneCard from "../Cards/GeneCard";
import VariantCard from "../Cards/VariantCard";

class DisplayInfo extends Component {

  center_div = styled.div`

  `
  constructor(props) {
    super(props)
    this.state = {
      gene: null,
      variants: null,
    }
    this.onGeneChange = this.onGeneChange.bind(this)
    this.setVariantData = this.setVariantData.bind(this)
  }

  setVariantData(id) {
    fetch(
      "https://civicdb.org/api/genes/" + id + "/variants?count=777777",
      {
        method: 'GET',
      }
    )
    .then((response) => response.json())
    .then((result) => {
      this.setState({variants: result.records})
    })
    .catch((error) => {
      console.error('Error:', error);
    });


  }

  onGeneChange(e) {
    let gene = e.value;

    fetch(
      "https://civicdb.org/api/genes/" + gene + "?identifier_type=entrez_symbol",
      {
        method: 'GET',
      }
    )
    .then((response) => response.json())
    .then((result) => {
      this.setState({gene: result})
      this.setVariantData(result.id)
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    
  }

  render() {

    let gene = this.state.gene

    let gene_data = gene ? 
      <GeneCard 
        geneName={gene["name"]}
        entrez_id={gene["entrez_id"]}
        description={gene["description"]}
        aliases={gene["aliases"]}
        sources={gene["sources"]}
        variants={gene["variants"]}
      />
      : ""

    let variant_data = this.state.variants ? 
      <VariantCard
        variants={this.state.variants}      
      />
      : ""

    let raw_data = gene ? JSON.stringify(gene["variants"].length) : ""

    return (
      <>
        <GeneSearch onChange={this.onGeneChange}/>
        {gene_data}
        {variant_data}
        {raw_data}
        {variant_data ? variant_data.length : ""}
      </>
    )
  }

}

export default DisplayInfo;
