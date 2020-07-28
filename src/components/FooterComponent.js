import React, { Component } from 'react';

class FooterComponent extends Component {

    render() {
        return (
            <>
                <div className="footer-component">
                    <button className="generate-chart-button" onClick={this.props.generateCharButtonClicked} >
                        GENERATE CHART
                    </button>
                </div>
            </>
        )
    }
}
export default FooterComponent;