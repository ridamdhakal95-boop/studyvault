import Link from "next/link";
import { ArrowRight, Calculator, FileText, FlaskConical, Search, Sparkles } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [chapters, contentCount] = await Promise.all([
    prisma.chapter.findMany({ where: { published: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.content.count({ where: { status: "PUBLISHED" } }),
  ]);
  return <div className="shell"><PublicNav/><main>
    <section className="hero container">
      <span className="eyebrow"><Sparkles size={13}/> Built for focused exam prep</span>
      <h1>Everything important for your exam, organized beautifully.</h1>
      <p>Chapter-wise questions, numericals, formulas, notes and give-reason answers — powered by a real database so new study material can be published without changing the code.</p>
      <div className="actions"><Link className="btn btn-primary" href="/chapters">Explore chapters <ArrowRight size={17}/></Link><Link className="btn btn-soft" href="/search"><Search size={17}/> Search material</Link></div>
    </section>
    <section className="section container">
      <div className="section-head"><div><h2>Study library</h2><p className="muted">{contentCount} published resources available.</p></div></div>
      <div className="grid">
        {[{i:<FileText/>,t:"Important questions",d:"Review high-value questions before your exam."},{i:<Calculator/>,t:"Numericals",d:"See given data, formulas, steps and final answers."},{i:<FlaskConical/>,t:"Formulas & notes",d:"Keep essential concepts and formulas close at hand."}].map(x=><div className="card" key={x.t}>{x.i}<h3>{x.t}</h3><p>{x.d}</p></div>)}
      </div>
    </section>
    <section className="section container"><div className="section-head"><div><h2>Latest chapters</h2><p className="muted">Content is controlled dynamically from the Admin Panel.</p></div><Link className="btn btn-soft" href="/chapters">View all</Link></div>
      {chapters.length ? <div className="grid">{chapters.map(c=><Link className="card" href={`/chapters/${c.slug}`} key={c.id}><span className="badge blue">Chapter {c.order}</span><h3>{c.title}</h3><p>{c.description || "Explore the published study material in this chapter."}</p></Link>)}</div> : <div className="empty">No chapters have been published yet.</div>}
    </section>
  </main><footer className="footer"><div className="container">ExamPrep · Fast, focused, database-driven learning.</div></footer></div>;
}
