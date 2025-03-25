class AUTH_USERS extends CloudEngine.Plugin{
    constructor(engine){
        super();
        this.engine=engine;
        this.#InitModule();
    }
    async #InitModule(){
        this.parent.innerHTML=null;
        this.parent.append(await this.GetHTMLtemplate("./templates/screens/login-screen.html"));
    }
}