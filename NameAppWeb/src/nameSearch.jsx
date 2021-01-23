'use strict';

class NameSearch extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            amount:"",
            isLoaded: false,
            isFound: false,
            error: "",
            
            inputValue: ""
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    
    handleClick(e){
        if(e.type === "keydown" && e.keyCode !== 13) return; //Check that key is enter (keyCode===13)
        
        var name = this.state.inputValue;
        
        fetch(baseUrl + "/api/name/"+name)
        .then(res => {
            if(!res.ok && res.status === 404){
                this.setState({isLoaded:true, isFound:false});
                throw new Error("404: Name not found in the database.");
            }else{
                res.json().then(
                    (res) => {
                        this.setState({name:res.name, amount:res.amount, isLoaded:true, isFound:true});
                    }
                );
            }
        })
        .catch(
            (error) => {
                alert(error);
            });
    }
    
    handleValueChange(value){
        this.setState({inputValue: value});
    }
        
    render() {
        var nameElement = <div>Waiting for search</div>
        if(this.state.isLoaded && this.state.isFound){
            nameElement = <div>Name: {this.state.name} <br/> Amount: {this.state.amount}</div>
        }else if(this.state.isLoaded && !this.state.isFound){
            nameElement = <div>Name not found in database</div>
        }
        
        return (
            <div className="subContainer">
                <div>
                    Name:
                    <AutocompleteInput id="search_input" onValueChange={(value) => this.handleValueChange(value)}/>
                    <button onClick={this.handleClick} className="material-icons">search</button>
                </div>
                <br/>
                {nameElement}
            </div>
        );
    }
}