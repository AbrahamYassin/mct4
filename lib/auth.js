import { cookies } from 'next/headers'
import { verifyJWT } from './jwt'
export function getUserIdFromCookie(){
  const c = cookies().get('token')?.value
  if(!c) return null
  try{ return verifyJWT(c).id }catch{ return null }
}
