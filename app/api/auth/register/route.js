import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signJWT } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function POST(req){
  const { name, email, password } = await req.json()
  if(!name || !email || !password) return Response.json({error:'Missing fields'},{status:400})
  const exist = await prisma.user.findUnique({ where: { email } })
  if(exist) return Response.json({ error:'Email exists' }, { status:409 })
  const user = await prisma.user.create({ data: { name, email, passwordHash: await bcrypt.hash(password,10), rolesJson: ['user'] } })
  const token = signJWT({ id: user.id })
  cookies().set('token', token, { httpOnly:true, secure:true, sameSite:'lax', path:'/' })
  return Response.json({ user: { id:user.id, name:user.name, email:user.email } })
}
