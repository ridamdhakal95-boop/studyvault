import Link from "next/link";
import { PublicNav } from "@/components/PublicNav";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export default async function ChaptersPage(){
 const chapters=await prisma.chapter.findMany({where:{published:true},orderBy:{order:"asc"},include:{_count:{select:{content:{where:{status:"PUBLISHED"}}}}}});
 return <><PublicNav/><main className="section container"><div className="section-head"><div><span className="eyebrow">Library</span><h1 style={{fontSize:42,marginTop:12}}>All chapters</h1><p className="muted">Choose a chapter to explore its published material.</p></div></div>{chapters.length?<div className="grid">{chapters.map(c=><Link className="card" href={`/chapters/${c.slug}`} key={c.id}><span className="badge">Chapter {c.order}</span><h3>{c.title}</h3><p>{c.description||"Explore this chapter."}</p><div style={{marginTop:16}} className="muted">{c._count.content} resources</div></Link>)}</div>:<div className="empty">No published chapters yet.</div>}</main></>;
}
