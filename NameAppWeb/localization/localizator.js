class Localizator{
    constructor(translations, language){
        this.waiting = [];
        this.language = language;
        this.hasLoaded = false;
        this.error = false;
        this.translations = null;
        
        fetch(translations)
        .then(res=>res.json())
        .then(json=>{
            this.translations=json;
            this.hasLoaded = true;
            for(var w of this.waiting){
                this.getTranslation(w.name, w.def, w.cb);
            }
        })
        .catch(err=>{
            this.error = true;
            console.log(err);
        });
    }
    
    /*
    If translation is found calls cb with the translation (string).
    If translation is not found or an error was raised during loading, calls cb(def).
    If translations are not loaded yet, waits for them to load and then calls cb
    */
    getTranslation(name, def, cb){
        if(this.error){
            cb(def);
            return;
        }
        
        if(this.hasLoaded){
            if(this.translations.translations[name][this.language] != undefined){
                cb(this.translations.translations[name][this.language]);
                return;
            }else{
                cb(def);
                return;
            }
        }
        
        if(!this.hasLoaded){
            this.waiting.push({name:name, def:def, cb:cb});
            return;
        }
    }
}