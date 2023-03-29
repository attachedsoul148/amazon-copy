import Header from '../components/Header'
import { collection, orderBy, query, getDocs } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import { db } from '../firebase.js'
import moment from 'moment'
import { OrderType } from '@/typed'
import Head from 'next/head'
import Order from '@/components/Order'

type Props = { orders: OrderType[] }

const Orders = ({ orders }: Props) => {
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

      <main className="max-w-5xl mx-auto p-5 sm:p-10">
        <div>
          {orders ? (
            <h1 className="text-3xl">Your orders | {orders.length} Orders</h1>
          ) : (
            <h1 className="text-3xl">Log in to see your orders</h1>
          )}
          <div className="my-4 border-b w-full mx-auto border-yellow-500" />
          <div className="flex flex-col mt-2 space-y-5">
            {orders?.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Orders

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  const session = await getSession(context)
  if (!session) {
    return {
      props: {},
    }
  }

  const ordersByUserRef = collection(db, `users/${session.user?.email as string}/orders`)
  const q = query(ordersByUserRef, orderBy('timestamp'))
  const ordersSnap = await getDocs(q)
  const orders = await Promise.all(
    ordersSnap.docs.map(async (doc) => ({
      id: doc.id,
      amount: doc.data().amount,
      amountShipping: doc.data().amount_shipping,
      images: doc.data().images,
      timestamp: moment(doc.data().timestamp.toDate()).unix(),
      // better format coz timestamp in firebase changes format , and now it isn't that that we are expecting to be
      items: await stripe.checkout.sessions.listLineItems(doc.id, {
        limit: 100,
      }), // info from stripe
    })),
  )

  return {
    props: {
      orders,
    },
  }
}
