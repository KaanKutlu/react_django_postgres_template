import React, {Component} from "react";
import styled from "styled-components";
import Select from 'react-select'
import AssertionCard from "./AssertionCards";
import EvidenceCard from "./EvidenceCard";

class VariantCard extends Component {

  center_div = styled.div`
    margin: auto;
    text-align: center;
    width: 80%;
    padding: 1rem;
  `

  grid_for_sources = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  `

  grid_item = styled.div`
    margin: .25rem;
    background-color: lightblue;
    padding: .25rem;
    text-decoration: none;
    color: black;
    column-gap: 2rem;
    grid-column: span ${props => props.column_count};

    :hover {
      background-color: lightgray;
      cursor: pointer;
    }

  `

  variant_header = styled.h1`
  
  `

  variant_type = styled.h2`
     
  `

  variant_description = styled.div`
    
  `
  variant_link = styled.a`
    padding: 1rem;
    margin: 1rem; 
  `

  variant_link_div = styled.div`
    grid-column: span 2;
    background-color: lightslategray;;
    color: black;
    text-decoration: none;
  `


  constructor(props) {
    super(props)
    this.state = {
      variant_id: null,
      variants_info: null,
    }
    this.displayVariantInfo = this.displayVariantInfo.bind(this)

    this.grid_item.defaultProps = {
      column_count: 1
    } 

  }

  displayVariantInfo(e) {
    let variant_id = e.target.id;

    if (this.state.variant_id == e.target.id) {
      this.setState({variant_info: null, variant_id: null})
      return;
    }

    fetch(
      "https://civicdb.org/api/variants/" + variant_id,
      {
        method: 'GET',
      }
    )
    .then((response) => response.json())
    .then((result) => {
      this.setState({variant_info: result, variant_id: variant_id})
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }

  doNothing(e) {
    e.stopPropagation();
  }

  variantFullDisplay(variant) {
    let assertions = []
    let evidences = []
    if (variant?.assertions?.length > 0) {
      assertions = variant.assertions.map(
        e =>
          <AssertionCard assertion={e} />
      )
    }

    if (variant?.evidence_items?.length > 0) {
      evidences = variant.evidence_items.map(
        e =>
          <EvidenceCard evidence={e} />
      )
    }

    let full_card = <this.grid_item onClick={this.displayVariantInfo} id={variant.id} key={variant.id} title={variant.description} column_count={4}>
        <this.variant_header>
          {variant.name}
        </this.variant_header>
        <this.variant_type>
          variant type: {(variant.variant_types.length != 0 ? (": " + variant.variant_types.map(variant => variant.display_name).join(" ")) : "N/A")}
          <br />
          {"alias" + (variant.variant_aliases?.length > 1 ? "es: " : ": ") }
          {variant.variant_aliases?.length > 0 ? variant?.variant_aliases.join(", ") : "N/A"}
        </this.variant_type>
        <this.variant_description>
          {variant.description}
        </this.variant_description>


        <this.grid_for_sources>
        {variant.allele_registry_id ? <this.variant_link href={"https://reg.genome.network/redmine/projects/registry/genboree_registry/by_caid?caid=" + variant.allele_registry_id} target="_blank">
          <this.variant_link_div onClick={this.doNothing}>
            canonical allele identifier: {variant.allele_registry_id}
          </this.variant_link_div> 
        </this.variant_link> : null}

        {variant.clinvar_entries.map(e => <this.variant_link key={e} href={"https://www.ncbi.nlm.nih.gov/clinvar/variation/"+ e} target="_blank">
            <this.variant_link_div onClick={this.doNothing}>
              clinvar link id: {e}
            </this.variant_link_div> 
          </this.variant_link>
        )}
        </this.grid_for_sources>

        {assertions}
        {evidences}
      </this.grid_item>;
    return full_card;
  }

  render() {

    let actionalble_variants = []
    let non_actionable_variants = []
    let assertion_cards = []
    
    for (let e of this.props.variants) {
      let data = e.name + (e.variant_types.length != 0 ? (": " + e.variant_types.map(e => e.display_name).join(" ")) : "")
      let card = null;

      if (this.state.variant_id == e.id) {
        card = this.variantFullDisplay(this.state.variant_info)
      } else {
        card = <this.grid_item onClick={this.displayVariantInfo} id={e.id} key={e.id} title={e.description} column_count={this.state.variant_id == e.id ? 4 : 1}>
          {e.name + (e.variant_types.length != 0 ? (": " + e.variant_types.map(e => e.display_name).join(" ")) : "")}
          {this.state.variant_id == e.id ? JSON.stringify(this.state.variant_info.description): ""}
        </this.grid_item>
      }
      if (e.civic_actionability_score != 0) {
        actionalble_variants.push(card)
      } else {
        non_actionable_variants.push(card)
      }
    }

    return (
      <this.center_div>
        <this.grid_for_sources>
          {actionalble_variants}
        </this.grid_for_sources>

        <div> Non-actionable variants </div>

        <this.grid_for_sources>
          {non_actionable_variants}
        </this.grid_for_sources>

        
      </this.center_div>
    )
  }

}

export default VariantCard;