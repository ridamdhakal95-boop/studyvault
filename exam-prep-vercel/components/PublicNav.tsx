import Link from "next/link";
import { BookOpen, Search, ShieldCheck } from "lucide-react";

export function PublicNav() {
  return <header className="topbar"><div className="container nav">
    <Link className="brand" href="/"><span className="logo"><BookOpen size={19}/></span>ExamPrep</Link>
    <nav className="navlinks">
      <Link href="/chapters">Chapters</Link>
      <Link href="/search"><Search size={16}/> Search</Link>
      <Link className="btn btn-primary keep" href="/login"><ShieldCheck size={16}/> Admin</Link>
    </nav>
  </div></header>;
}
