import { Input } from '../ui/input';

const MainProduct = () => {

  return (
    <div className='p-4 m-4 rounded-md border border-slate-900 w-[60vw]'>
      <h1 className='text-center text-blue-500'>Ajouter un nouveau produit</h1>
      <form method='post' className=' flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label htmlFor="product-name">Nom du produit</label>
          <Input type='text' placeholder='Entrer ici le nom du produit' name='product-name' required/>
        </div>

        <div className='flex flex-col'>
          <label htmlFor="">Categorie du produit</label>
          <select className='p-2 rounded-md' name="" id="">
            <option value="">Nom</option>
            <option value="">Prenom</option>
            <option value="">Classe</option>
          </select>
        </div>
        <div className='flex justify-between'>
          <div>
            <label htmlFor="">Prix d'un produit  en Ariary</label>
            <Input type='number' min={0}/>
          </div>
          <div>
            <label htmlFor="">Nombre produit</label>
            <Input type='number' min={0}/>
          </div>
        </div>
        
        <Input value="Enregistrer" className='bg-blue-500 text-center cursor-pointer text-white !text-xl p-4'/>
      </form>
    </div>
  )
}

export default MainProduct