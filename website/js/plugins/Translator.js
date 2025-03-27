class TRANSLATOR extends CloudEngine.Plugin{
    constructor()
    {
        super();
        this.actualLangContent=null;
        this.selectedLang=null;
        this.defaultLang=null;
        this.langList=null;
    }
    async InitModule(){
        let langList=await(await fetch("./lang/config-languages.json")).json();
        let langContent=await(await fetch(`./lang/${langList.defaultLang}.json`)).json();
        this.langList=langList;
        this.actualLangContent=langContent;
        this.defaultLang=langList.defaultLang;
        this.TranslateApp(langList.defaultLang,this.engine.CONF.startMode);
    }
    async TranslateApp(selectedLangCode,AppMode)
    {
        const _translateElem=(langEl)=>{
            let ElementToTranslate=document.querySelector(`*[translate-id="${langEl.translate_id}"]`);
            if(ElementToTranslate!=null)
            {
                switch(langEl.element_type)
                {
                    case "div":{ElementToTranslate.innerHTML=langEl.value;}break;
                    case "input-placeholder":{ElementToTranslate.placeholder=langEl.placeholder;}break;
                    case "button":{ElementToTranslate.value=langEl.value;}break;
                    default:{console.log("Brak możliwości przetłumaczenia elementu:",langEl);}break;
                }
            }
        }
        let _lang=null;
        if(this.actualLangContent!=null)
        {
            _lang=this.actualLangContent;
        }
        else{
            _lang=await(await fetch(`./lang/${selectedLangCode}.json`)).json();
        }

        switch(AppMode)
        {
            case "LOGIN_PAGE":
            {
                this.engine.SetTitle(_lang.LOGIN_PAGE.title_website);
                _lang.LOGIN_PAGE.content_lang.forEach(el => {
                    _translateElem(el);
                });
            }
            break;
            case "LOGGED_USER":
            {
                this.engine.SetTitle(_lang.APP_PAGE.title_website);
                _lang.APP_PAGE.content_lang.forEach(el => {
                    _translateElem(el);
                });
            }
            break;
            default:
            {
                alert("Brak tłumaczenia !!!!");
            }
            break;
        }
    }
}