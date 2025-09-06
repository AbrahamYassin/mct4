'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import AppNavbar from '@/components/AppNavbar'
export default function Dashboard(){
  const [items,setItems]=useState([]); const load=async()=>{ const r=await fetch('/api/cv'); if(r.ok) setItems(await r.json()) }; useEffect(()=>{ load() },[])
  const createCV=async()=>{ const r=await fetch('/api/cv',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({personal:{fullName:'Mon Nom'},template:'modern',themeColor:'#2563eb'})}); const j=await r.json(); if(r.ok) window.location.href=`/editor/${j.id||j._id}` }
  const del=async(id)=>{ await fetch(`/api/cv/${id}`,{method:'DELETE'}); load() }
  return (<div><AppNavbar/><div className="container py-6"><div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-extrabold">Mes CV</h1><p className="text-slate-600">Créez, modifiez et exportez vos CV</p></div><button onClick={createCV} className="btn btn-primary">+ Nouveau CV</button></div><div className="grid md:grid-cols-3 gap-4">{items.map(cv=>(<div key={cv.id||cv._id} className="card p-4 flex flex-col gap-2"><div className="font-semibold">{cv.personal?.fullName||'Sans titre'}</div><div className="text-sm text-slate-600">{cv.personal?.title}</div><div className="flex gap-2 pt-2"><Link href={`/editor/${cv.id||cv._id}`} className="btn btn-outline">Éditer</Link><Link href={`/preview/${cv.id||cv._id}`} className="btn btn-outline">Prévisualiser</Link><a href={`/api/cv/${cv.id||cv._id}/export`} target="_blank" className="btn btn-outline">Exporter HTML</a><a href={`/api/cv/${cv.id||cv._id}/pdf`} target="_blank" className="btn btn-outline">Exporter PDF</a><button onClick={()=>del(cv.id||cv._id)} className="btn btn-outline text-red-600">Supprimer</button></div></div>))}</div></div></div>)
}
