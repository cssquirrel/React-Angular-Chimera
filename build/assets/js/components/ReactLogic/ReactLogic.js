import React from 'react';

/**
 * @class ReactLogic
 * @description A react logic container component that acts as the parent of 
 * any react components used in the property editor. It gets its props from the 
 * AngularWrapper in ../controllers/AngularWrapper.js, and passes any changes 
 * to the provided value via this.props.onValueChange().
 */
class ReactLogic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onValueChange = this.onValueChange.bind(this);
    }

    // React Lifecycle Methods /////////////////////////////////////////////////
    
    // Helper Functions ////////////////////////////////////////////////////////
    
    // Event Handlers //////////////////////////////////////////////////////////

    onValueChange (e) {
        this.props.onValueChange(e.target.value);
    };    
    
    // Render Assisting Methods ////////////////////////////////////////////////

	// Render //////////////////////////////////////////////////////////////////       

    render () {
        const props = this.props;

        return (<div>
            <strong>React-generated input: </strong>
            <input type="text" value={props.value} onChange={this.onValueChange} />
        </div>);
    }
};

module.exports = ReactLogic;