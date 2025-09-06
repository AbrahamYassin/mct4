import { getUserIdFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { cloudEnabled, configCloud } from '@/lib/cloud'

export async function POST(req,{ params }){
  const uid=getUserIdFromCookie(); if(!uid) return Response.json({error:'Unauthorized'},{status:401})
  if(!cloudEnabled()) return Response.json({error:'Upload désactivé (USE_CLOUDINARY=true requis)'},{status:501})
  const form = await req.formData(); const file = form.get('avatar'); if(!file) return Response.json({error:'No file'},{status:400})
  const buf = Buffer.from(await file.arrayBuffer()); const b64 = `data:${file.type};base64,${buf.toString('base64')}`
  const cloud = configCloud(); const up = await cloud.uploader.upload(b64, { folder: 'mycvtop/avatars' })
  const prev = await prisma.cv.findUnique({ where:{ id: params.id } })
  if(!prev || prev.userId!==uid) return Response.json({error:'CV not found'},{status:404})
  const cv = await prisma.cv.update({ where:{ id: params.id }, data: { personal: { ...(prev.personal||{}), avatarUrl: up.secure_url } } })
  return Response.json(cv)
}
