import Link from 'next/link';
export default function NotFound(){return <main className="container" style={{padding:'100px 0'}}><div className="empty"><h2>Page not found</h2><p>The resource you requested does not exist or is not published.</p><Link className="btn btn-primary" href="/">Back home</Link></div></main>}
