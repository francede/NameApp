'use strict';

if(window.localStorage.getItem("language")===null){
    window.localStorage.setItem("language","en");
}

const localizator = new Localizator("localization/translations.json", window.localStorage.getItem("language"));

function changeLanguage(language){
    window.localStorage.setItem("language",language);
    location.reload();
}



class App extends React.Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div className="appContainer">
                <div className="header">
                    <img src="localization/icon_en.svg" height="40px" className="langButton" onClick={(e)=>changeLanguage("en")} title="English"/>
                    <img src="localization/icon_fi.svg" height="40px" className="langButton" onClick={(e)=>changeLanguage("fi")} title="Suomi"/>
                    <img src="localization/icon_it.svg" height="40px" className="langButton" onClick={(e)=>changeLanguage("it")} title="Italiano"/>
                </div>
                <div className="mainContainer">
                    <NameSearch/>
                    <TotalAmount/>
                    <NameTable/>
                </div>
            </div>
        );
    }
    
}

ReactDOM.render(<App/>, document.getElementById("root"));