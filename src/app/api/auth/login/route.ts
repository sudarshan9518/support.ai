import { scalekit } from "@/lib/Scalekit";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
   const redirectUri = `${process.env.Next_public_app_url}/api/auth/callback`

    const url=  scalekit.getAuthorizationUrl(redirectUri)
    console.log(url);

    return NextResponse.redirect(url)


    

}