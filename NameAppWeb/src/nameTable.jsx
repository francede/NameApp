'use strict';

class NameTable extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            names:[],
            isLoaded: false,
            error: null
        }
    }
    
    componentDidMount(){
        fetch(baseUrl + "/api/names")
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({names:res.names, isLoaded:true});
            })
        .catch(
            (error) => {
                alert(error);
            });
    }
    
    sortNames(e){
        switch(e.target.value){
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
        var names = <div>Waiting for data...</div>
        if(this.state.isLoaded){
            names = 
                <div className="subContainer">
                    {this.state.names.map( (nameObj, index) => 
                        <NameItem key={nameObj.name} name={nameObj.name} amount={nameObj.amount} parity={index%2}/>
                    )}
                </div>
        }
        
        return (
            <div className="subContainer">
                <div onChange={(e) => this.sortNames(e)}>
                    Sort<br/>
                    <input type="radio" value="amount" name="sort" defaultChecked="true"/><label>By amount</label><br/>
                    <input type="radio" value="name" name="sort"/><label>By name</label>
                </div>
                {names} 
            </div>
        );
    }
}