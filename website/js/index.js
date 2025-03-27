window.addEventListener("DOMContentLoaded",async()=>{
    const initConfig={
        debugMode:true,
        defaultLang:"PL",
        website_favicon:"./imgs/favicon/icon.png",
        startMode:"LOGIN_PAGE",
        API:{
            Login:"http://127.0.0.1:3000/api/auth/login"
        }
    };
    const pluginList=[
        {js:"Auth-Users",css:"Auth-Users",class:"AUTH_USERS"},
        {js:"Translator",css:"",class:"TRANSLATOR"},
    ];
    globalThis.cloudEngine=new CloudEngine(initConfig,pluginList);
})