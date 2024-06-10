import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import authApi from "@/app/utils/api/AuthApi";

export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const payload: { email: string } = await req.json();   
    authApi.resetPassword(payload.email).then((res) => {
        console.log("res: ", res.data)
    });
    console.log('HERE', payload.email);


    return Response.json('Sent!');
    
}
