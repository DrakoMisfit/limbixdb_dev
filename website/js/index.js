window.addEventListener("DOMContentLoaded",async()=>{
    const initConfig={
        debugMode:true,
        defaultLang:"PL",
        website_favicon:"./imgs/favicon/icon.png",
        startMode:"LOGIN_PAGE"
    };
    const pluginList=[
        {js:"Auth-Users",css:"Auth-Users",class:"AUTH_USERS"},
        {js:"Translator",css:"",class:"TRANSLATOR"},
    ];
    globalThis.cloudEngine=new CloudEngine(initConfig,pluginList);
})