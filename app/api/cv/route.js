import { getUserIdFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(){ const uid=getUserIdFromCookie(); if(!uid) return Response.json({error:'Unauthorized'},{status:401}); const items=await prisma.cv.findMany({ where:{ userId: uid }, orderBy:{ updatedAt:'desc' } }); return Response.json(items) }
export async function POST(req){ const uid=getUserIdFromCookie(); if(!uid) return Response.json({error:'Unauthorized'},{status:401}); const body=await req.json(); const cv=await prisma.cv.create({ data: { userId: uid, personal: body.personal||{}, skills:body.skills||[], languages:body.languages||[], experiences:body.experiences||[], education:body.education||[], projects:body.projects||[], template:body.template||'modern', themeColor:body.themeColor||'#2563eb' } }); return Response.json(cv) }
