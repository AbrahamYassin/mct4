import SiteNavbar from '@/components/SiteNavbar'
export default function Home(){
  return (<div><SiteNavbar/>
    <section className="bg-gradient-to-b from-white to-blue-50">
      <div className="container py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 mb-3">SaaS CV Builder</div>
          <h1 className="text-5xl font-extrabold leading-tight">Créez des CV <span className="text-brand-700">professionnels</span> en quelques minutes</h1>
          <p className="mt-4 text-slate-600 max-w-xl">Modèles modernes, export PDF/HTML, gestion multi-CV, partage.</p>
          <div className="mt-6 flex gap-3">
            <a href="/register" className="btn btn-primary">Commencer gratuitement</a>
            <a href="/pricing" className="btn btn-outline">Voir les tarifs</a>
          </div>
        </div>
        <div className="rounded-2xl shadow-soft overflow-hidden border bg-white">
          <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1600&auto=format&fit=crop" className="w-full h-72 object-cover" />
          <div className="p-4 text-sm text-slate-600">Aperçu d’un CV moderne — couleurs et sections personnalisables.</div>
        </div>
      </div>
    </section>
  </div>)
}
