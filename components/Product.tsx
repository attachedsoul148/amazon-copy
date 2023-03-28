/* eslint-disable @next/next/no-img-element */
import { ProductType } from '@/typed'
import React, { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import Currency from 'react-currency-formatter'
import { useAppDispatch } from '@/pages/_app'
import { addToBasket } from '@/redux/basketSlice'

type Props = {
  product: ProductType
}

const Product = ({ product }: Props) => {
  const [rate] = useState(product.id % 2 === 0 ? 4 : 5)
  const [prime] = useState(product.id % 3 === 0 ? true : false)

  const dispatch = useAppDispatch()

  return (
    <div className="relative flex flex-col bg-white p-10">
      <div className="absolute top-2 right-2">
        <p className="text-xs text-gray-500 italic">{product.category}</p>
      </div>

      <img src={product.image} alt="icon" className="mx-auto object-contain w-[200px] h-[200px]" />

      <p className="text-xl my-3">{product.title}</p>

      <div className="flex">
        {Array(rate)
          .fill(null)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs line-clamp-2 my-2">{product.description}</p>

      {prime && (
        <div className="flex items-center space-x-2">
          <img src="https://links.papareact.com/fdw" alt="prime" className="h-10" />
          <p className="text-sm text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <div className="mb-5 font-bold text-lg flex-grow">
        <Currency quantity={product.price} currency="GBP" />
      </div>

      <button
        className="button"
        onClick={() =>
          dispatch(
            addToBasket({
              ...product,
              count: 1,
              hasPrime: prime,
              rate,
            }),
          )
        }>
        Add to Basket
      </button>
    </div>
  )
}

export default Product
