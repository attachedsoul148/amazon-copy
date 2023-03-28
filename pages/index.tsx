import Banner from '@/components/Banner'
import Header from '@/components/Header'
import ProductFeed from '@/components/ProductFeed'
import { ProductType } from '@/typed'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

interface Props {
  products: ProductType[]
}
export default function Home({ products }: Props) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
        <link
          rel="shortcut icon"
          href="https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png"
        />
      </Head>

      <Header />

      <main className="max-w-[1500px] mx-auto">
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const products: ProductType[] = await fetch('https://fakestoreapi.com/products').then((res) =>
    res.json(),
  )

  return {
    props: {
      products,
      session,
    },
  }
}
