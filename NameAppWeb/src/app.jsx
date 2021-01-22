'use strict';


class App extends React.Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div className="mainContainer">
                <NameSearch/>
                <TotalAmount/>
                <NameTable/>
            </div>
        );
    }
    
}

ReactDOM.render(<App/>, document.getElementById("root"));