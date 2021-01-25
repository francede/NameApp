class AutocompleteInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            autocompleteList:[],
            autocompleteOpen: false,
            inputValue: "",
            hoveredIndex: -1
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
    
    updateAutocomplete(value){
        this.fetchNames(value);
        
        if(this.state.autocompleteOpen) return;
        this.setState({
            autocompleteOpen: true,
            hoveredIndex: -1
        });
    }
    
    closeAutocomplete(){
        if(!this.state.autocompleteOpen) return;
        
        this.setState({
            autocompleteOpen: false,
            autocompleteList: [] //Reset list to prevent the old list showing up briefly on next open
        })
    }
    
    changeInput(value){
        this.setState({inputValue: value});
        this.props.onValueChange(value);
    }
    
    handleOptionClick(e){
        this.changeInput(e.target.getAttribute("value")); //e.target.value will not work, because value is not a default attribute of <div>
        this.closeAutocomplete();
    }
    
    handleKeyPress(e){
        switch(e.keyCode){
            case 13: //Enter, handles same way as click
                this.changeInput(this.state.autocompleteList[this.state.hoveredIndex]);
                this.closeAutocomplete();
                break;
            case 38: //Up arrow
                var newIndex;
                
                switch(this.state.hoveredIndex){
                    case -1: //None selected => wrap around
                        newIndex = this.state.autocompleteList.length-1;
                        break;
                    case 0: //First selected => deselect
                        newIndex = -1;
                        break;
                    default:
                        newIndex = this.state.hoveredIndex-1;
                        break;
                }
                
                this.setState({hoveredIndex: newIndex});
                break;
            case 40: //Down arrow
                var newIndex;
                
                switch(this.state.hoveredIndex){
                    case -1: //None selected => wrap around
                        newIndex = 0;
                        break;
                    case  this.state.autocompleteList.length-1: //Last selected => deselect
                        newIndex = -1;
                        break;
                    default:
                        newIndex = this.state.hoveredIndex+1;
                        break;
                }
                this.setState({hoveredIndex: newIndex});
                break;
        }
        if(e.keyCode===38 || e.keyCode===40) e.preventDefault(); //Disable arrow keys moving left and right in the input
    }
    
    handleInputChange(e){
        this.changeInput(e.target.value);
        this.updateAutocomplete(e.target.value);
    }
    
    handleFocus(e){
        this.updateAutocomplete(this.state.inputValue);
    }
    
    handleBlur(e){
        if(e.relatedTarget == null || 
            e.relatedTarget.id !== this.props.id+"_autocompleteList"){
                this.closeAutocomplete();
        }
    }
    
    
    render(){
        const autocompleteList = (
            <div id={this.props.id + "_autocompleteList"} 
                className="autocompleteList" 
                onClick={(e)=>this.handleOptionClick(e)} 
                tabIndex="0">
                
                {this.state.autocompleteList.map( (name, i) => 
                    <div 
                        key={name} 
                        value={name} 
                        onMouseEnter={(e)=>this.setState({hoveredIndex:i})} 
                        className={this.state.hoveredIndex===i ? "hovered" : ""}>{name}</div>
                )}
                
            </div>
        );
        
        return (
            <div className="autocomplete"
                onFocus={(e) => this.handleFocus(e)} 
                onBlur={(e) => this.handleBlur(e)} 
                onKeyDown={(e)=>this.handleKeyPress(e)}>
                
                <input type="text" 
                    onChange={(e)=>this.handleInputChange(e)} 
                    value={this.state.inputValue}/>
                {this.state.autocompleteOpen && autocompleteList}
            </div>
        );
    }
}