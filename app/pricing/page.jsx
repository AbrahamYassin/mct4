import SiteNavbar from '@/components/SiteNavbar'
export default function Pricing(){
  return (<div><SiteNavbar/>
    <div className="container py-16">
      <h1 className="text-3xl font-extrabold text-center mb-8">Tarifs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {[['Gratuit','0€','1 CV, Export HTML'],['Pro','7,90€/mois','CV illimités, Export PDF, Templates premium'],['Équipe','Contact','Admin, rôles, support prioritaire']].map(([n,p,d])=>(
          <div key={n} className="card p-6 text-center">
            <div className="text-lg font-semibold">{n}</div><div className="text-4xl font-extrabold my-2">{p}</div><div className="text-slate-600 mb-4">{d}</div>
            <form action="/api/billing/create-checkout-session" method="post"><button className="btn btn-primary w-full" type="submit">Choisir {n}</button></form>
          </div>
        ))}
      </div>
    </div></div>)
}
