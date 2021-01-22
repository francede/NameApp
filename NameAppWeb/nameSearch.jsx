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
    
    handleClick(){
        var name = this.state.inputValue;
        
        fetch("http://localhost:5000/api/name/"+name)
        .then(res => {
            console.log(res);
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
                Name:<input value={this.state.inputValue} onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>Search</button>
                <br/>
                {nameElement}
            </div>
        );
    }
}