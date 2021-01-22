'use strict';

class TotalAmount extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            amount:"",
            isLoaded: false,
            error: null
        }
        
    }
    
    componentDidMount(){
        fetch(baseUrl + "/api/amount")
        .then(res => res.json())
        .then(
            
            (res) => {
                this.setState({amount:res.sum_of_amounts, isLoaded:true});
            },

            (error) => {
                console.log(error);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }
        
    render() {
        return (
            <div className="subContainer">
                Total number of names: {this.state.isLoaded ? this.state.amount : "waiting for data"}
            </div>
        );
    }
}