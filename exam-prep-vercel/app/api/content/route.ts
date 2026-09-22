import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { contentSchema } from "@/lib/validation";
function slugify(s:string){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")||`content-${Date.now()}`}
export async function POST(req:Request){if(!(await getSession()))return NextResponse.json({error:'Unauthorized'},{status:401});try{const input=contentSchema.parse(await req.json());const chapter=await prisma.chapter.findUnique({where:{id:input.chapterId}});if(!chapter)return NextResponse.json({error:'Chapter not found.'},{status:400});const base=slugify(input.title);let slug=base;let i=2;while(await prisma.content.findUnique({where:{slug}})){slug=`${base}-${i++}`}const content=await prisma.content.create({data:{...input,slug}});return NextResponse.json({content},{status:201})}catch{return NextResponse.json({error:'Invalid content data.'},{status:400})}}
