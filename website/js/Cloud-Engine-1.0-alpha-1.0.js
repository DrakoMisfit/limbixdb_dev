

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

        this.#InitLoaderApp();
        
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
                    this.plugins[className].parent=document.querySelector("body div#root");
                    this.plugins[className].rootLoader=document.querySelector("body div#root-loader");
                    this.plugins[className].InitModule();
                    resolve();
                }
                script.onerror = () => reject(
                    console.log(`Can't load plugin: %c${scriptName}.js`,"color:#ff0000")
                );
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

    // GŁówny loader aplikacji.
    async #InitLoaderApp()
    {
        this.loaderWindow=document.createElement("div");
        this.loaderWindow.id="main-loader-container";
        this.loaderWindow.style.display="none";
        this.loaderWindow.innerHTML=`
            <div class="tiles-cotainer">
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
            </div>
        `;
        document.querySelector("body #root-loader").appendChild(this.loaderWindow)

        return 0;
    }
    static Plugin = class Plugin {
        constructor() {
            this.engine=null;
            this.parent=null;
            this.rootLoader=null;
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
