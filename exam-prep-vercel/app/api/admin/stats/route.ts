import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
export async function GET(){if(!(await getSession()))return NextResponse.json({error:"Unauthorized"},{status:401});const [chapters,content,published,drafts]=await Promise.all([prisma.chapter.count(),prisma.content.count(),prisma.content.count({where:{status:"PUBLISHED"}}),prisma.content.count({where:{status:"DRAFT"}})]);return NextResponse.json({chapters,content,published,drafts});}
