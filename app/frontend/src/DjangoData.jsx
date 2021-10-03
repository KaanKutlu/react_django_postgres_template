import React, {Component} from "react";

class SNPDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      snps: null
    }
    
    // Fetch the original lab
    fetch(
			"/api/snps/",
			{
				method: 'GET',
			}
		)
		.then((response) => response.json())
		.then((snps) => {
       this.setState({snps: snps})
		})
  }
  
  render() {
    let snp_data = this.state.snps ? this.state.snps.map((e) => <p>{"Name: " + e["patient"] + " Chrom: " + e["chromosome"] + " Position:" + e["pos"]}</p>) : null
    return (
      <>
        {snp_data}
      </>
    )
  }

}

export default SNPDisplay;
