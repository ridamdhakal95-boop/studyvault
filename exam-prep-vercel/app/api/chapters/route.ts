import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { chapterSchema } from "@/lib/validation";
function slugify(s:string){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")||`chapter-${Date.now()}`}
export async function GET(req:Request){const admin=new URL(req.url).searchParams.get('admin')==='1';const session=await getSession();if(admin&&!session)return NextResponse.json({error:"Unauthorized"},{status:401});const chapters=await prisma.chapter.findMany({where:admin?{}:{published:true},orderBy:{order:'asc'},include:{_count:{select:{content:true}}}});const content=admin?await prisma.content.findMany({orderBy:{updatedAt:'desc'},take:100}):[];return NextResponse.json({chapters,content});}
export async function POST(req:Request){if(!(await getSession()))return NextResponse.json({error:'Unauthorized'},{status:401});try{const input=chapterSchema.parse(await req.json());const base=slugify(input.title);let slug=base;let i=2;while(await prisma.chapter.findUnique({where:{slug}})){slug=`${base}-${i++}`}const chapter=await prisma.chapter.create({data:{...input,slug}});return NextResponse.json({chapter},{status:201})}catch{return NextResponse.json({error:'Invalid chapter data.'},{status:400})}}
