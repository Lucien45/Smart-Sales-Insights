import React from 'react'
import { Product } from '../../types/Product'
import { AddAllProducts } from '../../components/products/AddAllProducts';
import { Input } from '../../components/ui/input';
type ProductManagerProps = Omit<Product, 'id'>;

const ProductManager: React.FC<ProductManagerProps> = (props: ProductManagerProps) => {
  return (
    <div>
      Manage your product here
      <AddAllProducts />
      <Input type='text' placeholder='Type ypur name'/>
    </div>
  )
}

export default ProductManager