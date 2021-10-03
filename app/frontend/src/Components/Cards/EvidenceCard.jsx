import React, {Component} from "react";
import styled from "styled-components";
import Select from 'react-select'

class EvidenceCard extends Component {

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
    grid-column: span 4;
    :hover {
      background-color: gray;
      cursor: pointer;
    }
  ` 

  drug_link_grid_item = styled.div`
    margin: .25rem;
    background-color: lightblue;
    padding: .25rem;
    text-decoration: none;
    color: black;
    column-gap: 2rem;
    grid-column: span 2;
    border: 1px black solid;
    :hover {
      background-color: darkgray;
      cursor: pointer;
    }
  `
  evidence_header = styled.h1`
  
  `

  evidence_type = styled.h3`
     
  `

  variant_description = styled.div`
    
  `
  evidence_link = styled.a`
    padding: 1rem;
    margin: 1rem; 
  `

  evidence_link_div = styled.div`
    background-color: blue;
    color: black;
    text-decoration: none;
  `


  constructor(props) {
    super(props)
    this.state = {
      variant_id: null,
      variants_info: null,
    }

    this.grid_item.defaultProps = {
      column_count: 1
    } 

  }

  doNothing(e) {
    e.stopPropagation();
  }

  render() {
    let evidence = this.props.evidence
    let clinical_significance = evidence.clinical_significance
    let disease_string = evidence.disease
    let description = evidence.description
    let drugs = evidence.drugs.map(e => e.name).join(", ")

    let drug_links = evidence.drugs.map(e => 
      <>
      <this.drug_link_grid_item>
        <this.evidence_link href={"https://www.mycancergenome.org/content/drugs/" + e.name} onClick={this.doNothing} target="_blank">
            MyCancerGenome: {e.name}
        </this.evidence_link>
      </this.drug_link_grid_item>

      <this.drug_link_grid_item>
        <this.evidence_link href={"https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&code=" + e.ncit_id} onClick={this.doNothing} target="_blank">
            NCI NCIT Lookup: {e.name}
        </this.evidence_link>
      </this.drug_link_grid_item>
      </>
    )

    return (
      <a href={evidence.source.source_url} target="_blank">

      <this.center_div onClick={this.doNothing}>
        <this.grid_for_sources>
          <this.grid_item column_count={4}>
            <this.evidence_type>
              Evidence 
              {" for disease " + evidence.disease.name}
              {evidence.drugs.length > 0? " with drugs " + drugs : " "} 
            </this.evidence_type>
            {description}

            <this.grid_for_sources>
              {drug_links}
            </this.grid_for_sources>
          </this.grid_item>

        </this.grid_for_sources>
      </this.center_div>
      </a>
    )
  }

}

export default EvidenceCard;