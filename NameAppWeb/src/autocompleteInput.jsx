class AutocompleteInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            autocompleteList:[],
            hasFocus: false,
            inputValue: ""
        }
    }
    
    fetchNames(nameStart){
        if(nameStart === "") {
            this.setState({autocompleteList:[]});
            return
        }
        
        fetch(baseUrl + "/api/names/" + nameStart)
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({autocompleteList:res});
            }
        )
        .catch(
            (error) => {
                alert(error);
            }
        )
    }
    
    handleChange(e){
        this.changeInput(e.target.value);
        this.fetchNames(e.target.value);
    }
    
    toggleFocus(e){
        switch(e.type){
            case "focus":
                this.setState({hasFocus: true});
                this.fetchNames(e.target.value);
                break;
            case "blur":
                if(e.relatedTarget == null || 
                   e.relatedTarget.id !== this.props.id+"_autocompleteList"){
                    this.setState({hasFocus: false});
                }
                break;
            case "click":
                this.setState({hasFocus: false});
                break;
        }
    }
    
    handleClick(e){
        this.changeInput(e.target.getAttribute("value")); //e.target.value will not work, because value is not a default attribute of <div>
        this.toggleFocus(e);
    }
    
    changeInput(value){
        this.setState({inputValue: value});
        this.props.onValueChange(value);
    }
    
    
    render(){
        const autocompleteList = (
            <div id={this.props.id + "_autocompleteList"} className="autocompleteList" onClick={(e)=>this.handleClick(e)} tabIndex="0">
                {this.state.autocompleteList.map( (name) => 
                    <div key={name} value={name}>{name}</div>
                )}
            </div>
        );
        
        return (
            <div className="autocomplete" onFocus={(e) => this.toggleFocus(e)} onBlur={(e) => this.toggleFocus(e)}>
                <input type="text" onChange={(e)=>this.handleChange(e)} value={this.state.inputValue} />
                {this.state.hasFocus && autocompleteList}
            </div>
        );
    }
}