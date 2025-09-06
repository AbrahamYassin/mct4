import { getUserIdFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
function renderHTML(cv){ const head='<!doctype html><html><head><meta charset="utf-8"><title>'+ (cv.personal?.fullName||'CV') +'</title></head><body>'; const body = `<pre>${JSON.stringify(cv,null,2)}</pre>`; return head+body+'</body></html>' }
export async function GET(_, { params }){ const uid=getUserIdFromCookie(); if(!uid) return new Response('Unauthorized',{status:401}); const cv=await prisma.cv.findFirst({ where:{ id: params.id, userId: uid } }); if(!cv) return new Response('Not found',{status:404}); const html=renderHTML(cv); return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=utf-8'}}) }
