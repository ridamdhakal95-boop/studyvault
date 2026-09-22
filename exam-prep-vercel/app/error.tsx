"use client";
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main className="container" style={{padding:'80px 0'}}><div className="empty"><h2>Something went wrong</h2><p>We couldn't load this page right now.</p><button className="btn btn-primary" onClick={()=>reset()}>Try again</button></div></main>}
