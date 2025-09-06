import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main(){
  const admin = await prisma.user.upsert({
    where:{ email:'admin@mycvtop.com' },
    update:{},
    create:{ name:'Admin Tester', email:'admin@mycvtop.com', passwordHash: await bcrypt.hash('admin1234',10), rolesJson:['user','admin'] }
  })
  const demo = await prisma.user.upsert({
    where:{ email:'demo@mycvtop.com' },
    update:{},
    create:{ name:'Demo User', email:'demo@mycvtop.com', passwordHash: await bcrypt.hash('demo1234',10), rolesJson:['user'] }
  })
  await prisma.cv.create({
    data:{
      userId: demo.id,
      personal: { fullName:'Yassin Brahim', title:'Contrôleur de gestion', email:'yassin@example.com', phone:'+212 6 12 34 56 78', location:'Oujda, Maroc', summary:'Contrôleur de gestion orienté résultats, passionné par la digitalisation (PHP/React).' },
      skills:['Gestion budgétaire','SQL','PHP','React','Excel avancé'],
      languages:['Arabe','Français','Anglais'],
      experiences:[{ title:'Contrôleur de gestion', company:'Enabel', startDate:'2023', endDate:'Présent', description:'Suivi des dépenses, tableaux de bord, automatisation.' }],
      education:[{ degree:'Master Finance', school:'Université Mohammed I', startDate:'2019', endDate:'2021', description:'Contrôle de gestion et audit.' }],
      projects:[{ name:'DigiCard+', link:'https://digicardplus.com', description:'Cartes de visite numériques & CRM partenaires.' }],
      template:'modern', themeColor:'#2563eb'
    }
  })
  console.log('Seed OK:', { admin: admin.email, demo: demo.email })
}
main().finally(()=>prisma.$disconnect())
