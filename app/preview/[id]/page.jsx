export default function P({params}){return(<div className='container py-6 card p-2'><iframe src={`/api/cv/${params.id}/export`} className='w-full h-[80vh] border rounded-xl'></iframe></div>)}
