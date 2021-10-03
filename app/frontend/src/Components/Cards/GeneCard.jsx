import React, {Component} from "react";
import styled from "styled-components";
import Select from 'react-select'

class GeneCard extends Component {

  center_div = styled.div`
    margin: auto;
    background-color: gray;
    text-align: center;
    width: 60%;

    padding: 1rem;
  `

  info_div = styled.div`
    
  `

  header_div = styled.h1`

  `
  gene_meta_information = styled.h2`

  `

  description_div = styled.div`
    text-align: left;
  `

  grid_for_sources = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `
  grid_item = styled.div`
    margin: .25rem;
    background-color: lightblue;
    padding: .25rem;
    text-decoration: none;
    color: black;
    :hover {
      background-color: lightgray;
      cursor: pointer;
    }

  `


  constructor(props) {
    super(props)
  }

  render() {
    let aliases_plural = "alias" + (this.props.aliases.length > 1 ? "es" : "");
    console.log(this.props)
    console.log(this.props.sources)
    let sources = this.props.sources.map(e => <a href={e.source_url} target="_blank">
      <this.grid_item key={e.id}>Journal: {e.full_journal_title}<br />{e.name}</this.grid_item>
    </a>)


    return (
      <this.center_div>
        <div>
          <this.header_div>
            {this.props.geneName}
          </this.header_div>
          <this.gene_meta_information>
            entrez_id: {this.props.entrez_id}
            <br />
            {aliases_plural}: {this.props.aliases.join(", ")}
          </this.gene_meta_information>
          
          <this.description_div>
            {this.props.description}
          </this.description_div>
          <this.grid_for_sources>
            {sources}
          </this.grid_for_sources>
        </div>
      </this.center_div>
    )
  }

}

export default GeneCard;