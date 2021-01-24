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
            inputValue: "",
            
            //Localized strings
            string_name: "",
            string_amount: "",
            string_name_not_found_in_database: ""
        }
        this.getLocalizedStrings();
        
        this.handleClick = this.handleClick.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    
     getLocalizedStrings(){
        localizator.getTranslation("name", "Name:", (str)=>{this.setState({string_name: str})});
        localizator.getTranslation("amount", "Amount:", (str)=>{this.setState({string_amount: str})});
        localizator.getTranslation("name_not_found_in_database", "Name not found in database", (str)=>{this.setState({string_name_not_found_in_database: str})});
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
        var nameElement = <div></div>
        if(this.state.isLoaded && this.state.isFound){
            nameElement = <div>{this.state.string_name} {this.state.name} <br/> {this.state.string_amount} {this.state.amount}</div>
        }else if(this.state.isLoaded && !this.state.isFound){
            nameElement = <div>{this.state.string_name_not_found_in_database}</div>
        }
        
        return (
            <div className="subContainer">
                <div>
                    {this.state.string_name}
                    <AutocompleteInput id="search_input" onValueChange={(value) => this.handleValueChange(value)}/>
                    <button onClick={this.handleClick} className="material-icons">search</button>
                </div>
                <br/>
                {nameElement}
            </div>
        );
    }
}