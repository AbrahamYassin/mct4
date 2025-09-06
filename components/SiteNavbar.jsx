'use client'
import Link from 'next/link'
import Logo from './Logo'
export default function SiteNavbar(){
  return (<div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
    <div className="container flex items-center justify-between py-3">
      <Link href="/" className="flex items-center gap-2"><Logo/><span className="hidden sm:block text-sm text-slate-600">Créez & exportez vos CV</span></Link>
      <div className="flex items-center gap-3">
        <Link href="/pricing" className="btn btn-outline">Tarifs</Link>
        <Link href="/login" className="btn">Connexion</Link>
        <Link href="/register" className="btn btn-primary">Commencer</Link>
      </div>
    </div></div>)
}
