import cors from "cors";
import bodyParser from "body-parser";
import Express from "express";
import fs from "fs";

let CONF=JSON.parse(fs.readFileSync("./config/conf.json","utf-8"));

const PORT=CONF.PORT;
const app=Express();

app.use(bodyParser.urlencoded({
    limit:"1024mb",
    extended:true
}));
app.use(Express.json({
    limit:"1024mb",
    extended:true
}));
app.use(cors());

import ruter from "./router.js";
app.use("/api",ruter);

app.listen(PORT,()=>{
    console.log(CONF);
    console.log(`Server start on port: ${PORT}`);
});

export{
    CONF
}