import { prisma } from '@/lib/prisma'
import { getUserIdFromCookie } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export default async function Admin(){
  const uid = getUserIdFromCookie()
  if(!uid) return <div className="container py-10">Unauthorized</div>
  const me = await prisma.user.findUnique({ where:{ id: uid } })
  const roles = (me?.rolesJson||[])
  if(!roles.includes('admin')) return <div className="container py-10">Admin uniquement</div>
  const users = await prisma.user.findMany({ orderBy:{ createdAt:'desc' }, take:200 })
  const cvs = await prisma.cv.findMany({ orderBy:{ updatedAt:'desc' }, take:200 })
  return (<div className="container py-8"><h1 className="text-2xl font-extrabold mb-6">Admin Dashboard</h1>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-4"><div className="font-semibold mb-2">Utilisateurs ({users.length})</div><ul className="space-y-2 text-sm">{users.map(u=>(<li key={u.id} className="flex justify-between border-b py-1"><span>{u.email} — {u.name}</span><span className="opacity-70">[{(u.rolesJson||[]).join(', ')}]</span></li>))}</ul></div>
      <div className="card p-4"><div className="font-semibold mb-2">CV ({cvs.length})</div><ul className="space-y-2 text-sm">{cvs.map(c=>(<li key={c.id} className="flex justify-between border-b py-1"><span>{c.userId} — {c.template}</span><span className="opacity-70">{new Date(c.updatedAt).toLocaleString()}</span></li>))}</ul></div>
    </div></div>)
}
