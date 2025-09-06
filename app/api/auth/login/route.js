import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signJWT } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function POST(req){
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })
  if(!user) return Response.json({ error:'Invalid credentials' }, { status:401 })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if(!ok) return Response.json({ error:'Invalid credentials' }, { status:401 })
  const token = signJWT({ id: user.id })
  cookies().set('token', token, { httpOnly:true, secure:true, sameSite:'lax', path:'/' })
  return Response.json({ user: { id:user.id, name:user.name, email:user.email, roles:user.rolesJson } })
}
