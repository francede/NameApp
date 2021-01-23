'use strict';

class NameItem extends React.Component{
    constructor(props) {
        super(props);
    }
        
    render() {
        const divClassName = "nameItem ".concat(this.props.parity===0 ? "oddItem" : "")
        
        return <div className={divClassName}><span>{this.props.name}</span><span>{this.props.amount}</span></div>;
    }
}