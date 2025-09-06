'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SiteNavbar from '@/components/SiteNavbar'
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState(''); const r=useRouter()
  const submit=async(e)=>{ e.preventDefault(); setErr(''); const res=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); if(!res.ok){const j=await res.json(); setErr(j.error||'Erreur'); return;} r.push('/dashboard')}
  return (<div><SiteNavbar/><div className="container max-w-md mt-10 card p-6">
    <h1 className="text-2xl font-bold mb-4">Connexion</h1>
    <form onSubmit={submit} className="space-y-3">
      <input className="w-full border p-2 rounded-xl" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input type="password" className="w-full border p-2 rounded-xl" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)}/>
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button className="btn btn-primary w-full">Se connecter</button>
    </form></div></div>)
}
