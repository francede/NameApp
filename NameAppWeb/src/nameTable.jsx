'use strict';

class NameTable extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            names:[],
            isLoaded: false,
            error: null,
            
            //Localized strings
            string_waiting_for_data: "",
            string_sort: "",
            string_by_amount: "",
            string_by_name: ""
        }
        this.getLocalizedStrings();
    }
    
    componentDidMount(){
        fetch(baseUrl + "/api/names")
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({names:res.names, isLoaded:true});
                this.sortNames("amount");
            })
        .catch(
            (error) => {
                alert(error);
            });
    }
    
    getLocalizedStrings(){
        localizator.getTranslation("waiting_for_data", "Waiting for data", (str)=>{this.setState({string_waiting_for_data: str})});
        localizator.getTranslation("sort", "Sort", (str)=>{this.setState({string_sort: str})});
        localizator.getTranslation("by_amount", "By amount", (str)=>{this.setState({string_by_amount: str})});
        localizator.getTranslation("by_name", "By name", (str)=>{this.setState({string_by_name: str})});
    }
    
    sortNames(by){
        switch(by){
            case "amount":
                this.setState({
                    names:[].concat(this.state.names).sort(
                        (a,b) => parseInt(a.amount) > parseInt(b.amount) ? -1 : 1 //descending by amount
                    )
                });
                break;
            case "name":
                this.setState({
                    names:[].concat(this.state.names).sort(
                        (a,b) => a.name > b.name ? 1 : -1 //ascending by name
                    )
                });
                break;
        }   
    }
        
    render() {
        var names = <div>{this.state.string_waiting_for_data}</div>
        if(this.state.isLoaded){
            names = 
                <div>
                    {this.state.names.map( (nameObj, index) => 
                        <NameItem key={nameObj.name} name={nameObj.name} amount={nameObj.amount} parity={index%2}/>
                    )}
                </div>
        }
        
        return (
            <div className="subContainer">
                <div onChange={(e) => this.sortNames(e.target.value)} id="radioContainer">
                    {this.state.string_sort} <br/>
                    <input type="radio" 
                        value="amount" 
                        name="sort" 
                        defaultChecked="true"/>
                    
                    <label>{this.state.string_by_amount}</label><br/>
                    
                    <input type="radio" 
                        value="name" 
                        name="sort"/>
                    
                    <label>{this.state.string_by_name}</label>
                </div>
                
                {names} 
            </div>
        );
    }
}