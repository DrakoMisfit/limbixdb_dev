class AUTH_USERS extends CloudEngine.Plugin{
    constructor(){
        super();
        this.UserData=new Object();
    }
    async InitModule(){
        this.parent.innerHTML=null;
        this.parent.append(await this.GetHTMLtemplate("./templates/screens/login-screen.html"));
        this.SetEventListeners();
    }
    SetEventListeners()
    {
        this.parent.querySelector("input.login-btn").addEventListener("click",()=>{
            this.#LoginUser();
        });
    }
    #LoginUser()
    {
        let login=this.parent.querySelector("#user-login").value;
        let password=this.parent.querySelector("#user-password").value;
        fetch(this.engine.CONF.API.Login,{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                "login":login,
                "password":password
            })
        }).then(response=>{
                if(response.ok==false)
                {
                    this.parent.querySelector(".error-login").style.visibility="visible";
                    setTimeout(() => {
                        this.parent.querySelector(".error-login").style.visibility="hidden";
                    }, 4000);
                }
                else{
                    this.parent.querySelector(".error-login").style.visibility="hidden";
                    this.rootLoader.querySelector("div").style.display="block";
                    this.parent.innerHTML=null;
                }
        }).catch(err=>{
            // console.log(err);
            console.log("%cError with connecting to RestAPI!","color:#ff0000;font-size:20px");
            alert("Error with connecting to RestAPI!");
        });
    }
}