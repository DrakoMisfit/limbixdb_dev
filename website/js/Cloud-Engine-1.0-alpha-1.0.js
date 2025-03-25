

class CloudEngine{
    constructor(data,pluginsList)
    {
        this.CONF=data;
        this.pluginsList=pluginsList;
        this.debugMode=this.CONF?.debugMode || false;
        this.plugins=new Object();
        this.InitApp();
        this.SetFavicon(this.CONF.website_favicon);
    }
    async InitApp()
    {
        console.log("InitApp");
        this.pluginsList.forEach(plugin => {
            this.addPlugin(plugin.js,plugin.class,plugin.css)
        });
        delete this.pluginsList;
    }
    addUtils(scriptName,className)
    {
        // cooming soon.
    }
    addPlugin(scriptName,className,cssFilename)
    {
        return new Promise((resolve, reject) => {
            if(cssFilename!=""){
                const style=document.createElement("link");
                style.href=`css/${cssFilename}.css`;
                style.rel="stylesheet";
                document.head.appendChild(style);
            }
            if(scriptName!="")
            {
                const script = document.createElement('script');
                script.defer=true;
                script.src = `./js/plugins/${scriptName}.js`;
                script.onload = () => {
                    this.plugins[className]=eval(`new ${className}()`);
                    this.plugins[className].engine=globalThis.cloudEngine;
                    resolve();
                }
                script.onerror = () => reject(
                    //new Error(`Failed to load script: ${url}`)
                    console.log(`Can't load plugin: %c${scriptName}.js`,"color:#ff0000")
                );
                // script.onload=()=>{
                //     console.log(`Loaded plugin: %c${scriptName}.js`,"color:#20c000")
                // }
                document.head.appendChild(script);
                    console.log(`Loaded plugin: %c${scriptName}.js`,"color:#20c000")
            }
            
        });
    }

    // funkcja do ustawiania ikonki w zakładce przegldąrki.
    SetFavicon(path)
    {
        let link_favicon=document.createElement("link");
        link_favicon.rel="shortcut icon";
        link_favicon.type="image/x-icon";
        link_favicon.href=path;
        document.head.appendChild(link_favicon);
    }

    // ustawiamy tytuł strony w zakładce.
    SetTitle(title)
    {
        document.title=title;
    }

    static Plugin = class Plugin {
        constructor() {
            this.engine=undefined;
            this.parent=document.querySelector("#root")
        }
        async GetHTMLtemplate(src)
        {
            let raw_data=await(await fetch(src)).text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(raw_data, 'text/html');
            const htmlElement = doc.body.firstChild;
            return htmlElement;
        }

        // funkcja zatrzymana programu o konktretną ilość ms .
        delay(delayInms)
        {
            return new Promise(resolve => setTimeout(resolve, delayInms));
        }
    }
}
// 
// **********************************************
// 
