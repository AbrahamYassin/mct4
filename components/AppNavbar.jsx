'use client'
import Link from 'next/link'
import Logo from './Logo'
import { useRouter } from 'next/navigation'
export default function AppNavbar(){
  const r = useRouter()
  const logout = async ()=>{ await fetch('/api/auth/logout',{method:'POST'}); r.push('/login') }
  return (<div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
    <div className="container flex items-center justify-between py-3">
      <Link href="/dashboard" className="flex items-center gap-2"><Logo/></Link>
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="btn btn-outline">Dashboard</Link>
        <Link href="/admin" className="btn btn-outline">Admin</Link>
        <button onClick={logout} className="btn">Déconnexion</button>
      </div>
    </div></div>)
}
