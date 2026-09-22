import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req:Request){const q=new URL(req.url).searchParams.get("q")?.trim()||"";if(q.length<2)return NextResponse.json({results:[]});const results=await prisma.content.findMany({where:{status:"PUBLISHED",OR:[{title:{contains:q,mode:"insensitive"}},{body:{contains:q,mode:"insensitive"}},{tags:{has:q}}]},select:{id:true,title:true,type:true,difficulty:true,body:true,chapter:{select:{title:true,slug:true}}},orderBy:{updatedAt:"desc"},take:30});return NextResponse.json({results});}
