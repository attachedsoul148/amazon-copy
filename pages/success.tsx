import Header from '@/components/Header'
import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import Head from 'next/head'

type Props = {}

const Success = (props: Props) => {
  const router = useRouter()
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <Head>
        <title>Amazon</title>
        <link
          rel="shortcut icon"
          href="https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png"
        />
      </Head>

      <main className="mx-auto max-w-5xl p-5">
        <div className="bg-white p-5 rounded-lg flex flex-col space-y-4">
          <div className="flex space-x-4 items-center flex-col sm:flex-row">
            <CheckCircleIcon className="w-12 h-12 rounded-full text-green-500" />
            <h1 className="text-xl sm:text-3xl text-center sm:text-start">
              Thank you , your order has been confirmed!
            </h1>
          </div>
          <p className="px-2 text-xs sm:text-sm">
            Thank you for shopping with us. We{"'"}ll send a confirmation once your item has
            shipped, if you would like to check the status of your orders(s) please press the link
            below.
          </p>
          <button className="button" onClick={() => router.push('/orders')}>
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  )
}

export default Success
