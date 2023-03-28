import { OrderType } from '@/typed'
import React from 'react'
import moment from 'moment'
import Currency from 'react-currency-formatter'

type Props = {
  order: OrderType
}

const Order = ({ order }: Props) => {
  return (
    <div className="flex flex-col border-2 border-gray-300 rounded-md">
      <div className="bg-gray-200 flex relative p-5 space-x-2 sm:space-x-10">
        <div>
          <p className="uppercase text-sm text-gray-400 font-semibold">Order placed</p>
          <p className="text-sm">{moment.unix(order.timestamp).format('DD MMM YYYY')}</p>
        </div>
        <div>
          <p className="uppercase text-sm text-gray-400 font-semibold">Total</p>
          <p className="text-sm">
            <Currency quantity={order.amount + order.amountShipping} currency="GBP" />
          </p>
        </div>
        <p className="flex-grow self-end text-right text-blue-400 font-medium">
          {order.items.data.length} Items
        </p>
        <p className="absolute w-20 sm:w-40 lg:w-72 truncate text-xs top-2 right-2">{order.id}</p>
      </div>

      <div className="flex overflow-x-auto bg-white p-5 space-x-5">
        {order.images.map((image) => (
          <img key={image} className="w-20 h-20 md:w-32 md:h-32" src={image} />
        ))}
      </div>
    </div>
  )
}

export default Order
