import { ProductType } from '@/typed'
import React from 'react'
import Product from './Product'

type Props = {
  products: ProductType[]
}

const ProductFeed = ({ products }: Props) => {
  return (
    <div className="grid grid-flow-row-dense gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -mt-8 sm:-my-20 md:-mt-32 lg:-mt-64 xl:-mt-80 z-20 px-2">
      {products.slice(0, 4).map((product) => (
        <Product key={product.id} product={product} />
      ))}

      <img src="https://links.papareact.com/dyz" alt="adv" className="col-span-full" />

      {products.slice(4, 5).map((product) => (
        <div key={product.id} className="col-span-1 md:col-span-2">
          <Product product={product} />
        </div>
      ))}

      {products.slice(5, products.length).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductFeed
