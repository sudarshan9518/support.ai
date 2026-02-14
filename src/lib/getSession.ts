import { cookies } from "next/headers"
import { scalekit } from "./Scalekit"

export async function getSession() {

    const session = await cookies()
    const token = session.get("accessToken")?.value
    if(!token){
        return null
    }
    try{
    const result:any =await scalekit.validateToken(token)

const user = await scalekit.user.getUser(result.sub)

   return user
    }
catch(e){
    console.log(e);
    

}
    


    
}