import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { contentSchema } from "@/lib/validation";
export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){if(!(await getSession()))return NextResponse.json({error:'Unauthorized'},{status:401});const {id}=await params;try{const input=contentSchema.parse(await req.json());const old=await prisma.content.findUnique({where:{id}});if(!old)return NextResponse.json({error:'Content not found.'},{status:404});const content=await prisma.content.update({where:{id},data:input});return NextResponse.json({content})}catch{return NextResponse.json({error:'Invalid content data.'},{status:400})}}
export async function DELETE(_req:Request,{params}:{params:Promise<{id:string}>}){if(!(await getSession()))return NextResponse.json({error:'Unauthorized'},{status:401});const {id}=await params;try{await prisma.content.delete({where:{id}});return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Content not found.'},{status:404})}}
