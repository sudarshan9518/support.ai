import { scalekit } from "@/lib/Scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {searchParams} = new URL(req.url)
    const code = searchParams.get("code")
      const redirectUri = `${process.env.Next_public_app_url}/api/auth/callback`

    if(!code){
        return NextResponse.json({
            message:"code is not found", },{status:400}
        )

    }

    const session = await scalekit.authenticateWithCode(code, redirectUri )
  console.log(session);
  
    const response = NextResponse.redirect(`${process.env.Next_public_app_url}`)

    response.cookies.set("accessToken",  session.accessToken, {
        httpOnly:true,
        maxAge:24*60*60,
        secure:false,
        path:"/"
    })

    return response

}