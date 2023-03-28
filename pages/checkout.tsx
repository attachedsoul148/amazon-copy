import Header from '@/components/Header'
import Image from 'next/image'
import React from 'react'
import Head from 'next/head'
import { useAppSelector } from './_app'
import BasketProduct from '@/components/BasketProduct'
import Currency from 'react-currency-formatter'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromise = loadStripe(process.env.stripe_p_key as string)

type Props = {}

const Checkout = (props: Props) => {
  const { data: session } = useSession()

  const items = useAppSelector((state) => state.basket.items)
  const total = useAppSelector((state) => state.basket.totalPrice)

  const createCheckoutSession = async () => {
    const stripe = await stripePromise

    //backend call to receive the session id
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session?.user?.email,
    })

    // redirect
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })

    //error while redirect process
    if (result?.error) {
      alert(result.error)
    }
  }

  return (
    <div className="bg-gray-100 h-screen overflow-scroll scrollbar-hide">
      <Head>
        <title>Amazon</title>
        <link
          rel="shortcut icon"
          href="https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png"
        />
      </Head>

      <Header />
      <div className="grid grid-cols-5 xl:grid-cols-6 max-w-[1500px] mx-auto p-5 gap-4">
        <div className="flex flex-col col-span-5">
          <div className="relative w-full h-[250px]">
            <Image fill src="https://links.papareact.com/ikj" alt="adv" className="object-cover" />
          </div>

          <div className="flex flex-col mt-5 bg-white">
            <h3 className="text-3xl px-5 mt-5">
              {items.length === 0 ? 'Add something to Basket' : 'Shopping Basket'}
            </h3>
            <div className="my-5 border-b w-full mx-auto" />
            {items.map((item) => (
              <BasketProduct key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="bg-gray-200 w-full h-full p-3 flex flex-col space-y-4 col-span-5 xl:col-span-1">
          <p className="text-xl">
            Total Price : <Currency quantity={total} currency="GBP" />
          </p>
          <button
            className={`button ${
              session
                ? ''
                : 'cursor-not-allowed from-gray-300 to-gray-500 border border-gray-400 active:from-gray-300 active:to-gray-500 active:ring-0'
            }`}
            disabled={!session}
            role="link"
            onClick={createCheckoutSession}>
            {!session ? 'Sign in to checkout' : 'Proceed the checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
