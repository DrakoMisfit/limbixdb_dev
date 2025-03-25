import * as UTILS from "./Utils.js";
import connection from "./MySQL.js";
import { CONF } from "../index.js";


const LoginUser=async(req,res)=>{
    let reqData=req.body;
    let result_data_obj={
        user_id:null,
        // first_name:null,
        // last_name:null,
        user_email:null,
        user_level_permissions:null,
        user_perrmision:{

        }
    }

    // Pobieramy dane użytkownika o ile taki jest w bazie hehe.
    let query_user_data=`SELECT * FROM users WHERE email='${reqData.login}' AND password='${reqData.password}'`;
    let result_user_data=await connection.query(query_user_data);
    if(result_user_data.length==0)
    {
        res.status(401).json({
            status:401,
            message:"Unauthorized",
            data:null
        });
    }
    else{
        let data=result_user_data[0];
        result_data_obj.user_id=data.id;   
        result_data_obj.user_email=data.email;
        result_data_obj.user_level_permissions=data.level_permissions
        res.status(200).json({
            status:200,
            message:"Authorized",
            data:result_data_obj
        });
    }
}

export{
    LoginUser
}