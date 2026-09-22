import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicNav } from "@/components/PublicNav";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export default async function ChapterPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const chapter=await prisma.chapter.findUnique({where:{slug},include:{content:{where:{status:"PUBLISHED"},orderBy:[{priority:"desc"},{updatedAt:"desc"}]}}});
 if(!chapter||!chapter.published) notFound();
 return <><PublicNav/><main className="content-page container"><Link className="muted" href="/chapters">← All chapters</Link><h1 style={{fontSize:48,marginTop:16}}>{chapter.title}</h1><p className="muted">{chapter.description}</p><div className="filters">{Array.from(new Set(chapter.content.map(x=>x.type))).map(t=><span className="badge blue" key={t}>{t.replaceAll("_"," ")}</span>)}</div><div style={{display:"grid",gap:16,marginTop:22}}>{chapter.content.length?chapter.content.map(c=><article className="card" key={c.id}><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><span className="badge blue">{c.type.replaceAll("_"," ")}</span><span className="badge">{c.difficulty}</span></div><h2 style={{marginTop:12,fontSize:24}}>{c.title}</h2>{c.body&&<div className="content-body">{c.body}</div>}{c.type==="NUMERICAL"&&<div className="solution-box">{c.given&&<><strong>Given</strong><div className="content-body">{c.given}</div></>}{c.required&&<><strong>To find</strong><div className="content-body">{c.required}</div></>}{c.formula&&<><strong>Formula</strong><div className="content-body">{c.formula}</div></>}{c.solution&&<><strong>Solution</strong><div className="content-body">{c.solution}</div></>}{c.finalAnswer&&<><strong>Final answer</strong><div className="content-body">{c.finalAnswer}{c.units?` ${c.units}`:""}</div></>}</div>}</article>):<div className="empty">This chapter has no published resources yet.</div>}</div></main></>;
}
