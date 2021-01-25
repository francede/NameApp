'use strict';

class TotalAmount extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            amount:"",
            isLoaded: false,
            error: null,
            
            //Localisation strings
            string_total_number_of_names: "",
            waiting_for_data: ""
        }
        this.getLocalizedStrings();
    }
    
    componentDidMount(){
        fetch(baseUrl + "/api/sum")
        .then(res => res.json())
        .then(
            
            (res) => {
                this.setState({amount:res.sum, isLoaded:true});
            },

            (error) => {
                console.log(error);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }
    
    getLocalizedStrings(){
        localizator.getTranslation("total_number_of_names", "Total number of names:", (str)=>{this.setState({string_total_number_of_names: str})});
        localizator.getTranslation("waiting_for_data", "Waiting for data...", (str)=>{this.setState({waiting_for_data: str})});
    }
        
    render() {
        return (
            <div className="subContainer">
                {this.state.string_total_number_of_names} {this.state.isLoaded ? this.state.amount : "waiting for data"}
            </div>
        );
    }
}