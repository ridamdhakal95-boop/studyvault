import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
const schema=z.object({email:z.string().email(),password:z.string().min(1).max(200)});
export async function POST(req:Request){try{const input=schema.parse(await req.json());const admin=await prisma.admin.findUnique({where:{email:input.email.toLowerCase()}});if(!admin||!(await bcrypt.compare(input.password,admin.passwordHash)))return NextResponse.json({error:"Invalid email or password."},{status:401});await createSession({adminId:admin.id,email:admin.email});return NextResponse.json({ok:true});}catch{return NextResponse.json({error:"Invalid request."},{status:400});}}
