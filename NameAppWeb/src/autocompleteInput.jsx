class AutocompleteInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            autocompleteList:[],
            hasFocus: false,
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
    
    changeInput(value){
        this.setState({inputValue: value});
        this.props.onValueChange(value);
    }
    
    handleClick(e){
        this.changeInput(e.target.getAttribute("value")); //e.target.value will not work, because value is not a default attribute of <div>
        this.setState({hasFocus: false});
    }
    
    handleKeyPress(e){
        switch(e.keyCode){
            case 13: //Enter, handles same way as click
                this.changeInput(this.state.autocompleteList[this.state.hoveredIndex]);
                this.setState({hasFocus: false});
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
        console.log(this.state.hoveredIndex);
    }
    
    handleChange(e){
        if(!this.state.hasFocus) this.setState({hasFocus:true});
        this.changeInput(e.target.value);
        this.fetchNames(e.target.value);
        
        console.log(this.state.hoveredIndex, this.state.autocompleteList.length-1);
        if(this.state.hoveredIndex > this.state.autocompleteList.length-1){
            this.setState({hoveredIndex:-1});
        }
    }
    
    handleFocus(e){
        if(this.state.hasFocus) return;
        
        this.setState({hasFocus: true});
        this.fetchNames(e.target.value);
    }
    
    handleBlur(e){
        if(e.relatedTarget == null || 
            e.relatedTarget.id !== this.props.id+"_autocompleteList"){
                this.setState({hasFocus: false});
        }
    }
    
    
    render(){
        const autocompleteList = (
            <div id={this.props.id + "_autocompleteList"} className="autocompleteList" onClick={(e)=>this.handleClick(e)} tabIndex="0">
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
            <div className="autocomplete" onFocus={(e) => this.handleFocus(e)} onBlur={(e) => this.handleBlur(e)} onKeyDown={(e)=>this.handleKeyPress(e)}>
                <input type="text" onChange={(e)=>this.handleChange(e)} value={this.state.inputValue}/>
                {this.state.hasFocus && autocompleteList}
            </div>
        );
    }
}