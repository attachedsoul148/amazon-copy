/* eslint-disable @next/next/no-img-element */
import { useAppDispatch } from '@/pages/_app'
import { addToBasket, removeFromBasket } from '@/redux/basketSlice'
import { BasketType } from '@/typed'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter'

type Props = {
  item: BasketType
}

const BasketProduct = ({ item }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div className="grid grid-cols-5 p-5 gap-4">
      <div className="relative w-full h-[200px] mx-auto col-span-2 md:col-span-1">
        <Image fill src={item.image} alt="logo" className="object-contain" />
      </div>

      <div className="col-span-3">
        <h3 className="text-md sm:text-xl">
          {item.title} | x{item.count}
        </h3>

        <div className="flex">
          {Array(item.rate)
            .fill(null)
            .map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 my-2 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs line-clamp-2 capitalize my-3">{item.description}</p>

        {item.hasPrime && (
          <div className="flex items-center space-x-2">
            <img src="https://links.papareact.com/fdw" alt="prime" className="h-10" />
            <p className="text-xs sm:text-sm text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}

        <div className=" font-bold text-lg flex-grow">
          <Currency quantity={item.price} currency="GBP" />
        </div>
      </div>

      <div className="col-span-5 md:col-span-1 flex flex-col justify-center space-y-4">
        <button className="button" onClick={() => dispatch(addToBasket({ ...item }))}>
          Add to Basket
        </button>
        <button className="button" onClick={() => dispatch(removeFromBasket(item.id))}>
          Remove from Basket
        </button>
      </div>
    </div>
  )
}

export default BasketProduct
