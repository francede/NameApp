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
        this.handleChange = this.handleChange.bind(this);
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
    
    handleChange(e){
        this.setState({inputValue: e.target.value});
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
                    Name:<input type="text" value={this.state.inputValue} onChange={this.handleChange} onKeyDown={this.handleClick}></input>
                    <button onClick={this.handleClick} className="material-icons">search</button>
                </div>
                <br/>
                {nameElement}
            </div>
        );
    }
}