import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon, ShoppingCartIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/pages/_app'

type Props = {}

const Header = (props: Props) => {
  const items = useAppSelector((state) => state.basket.items)
  const totalCount = useAppSelector((state) => state.basket.totalCount)

  const { data: session } = useSession()
  const router = useRouter()

  return (
    <header className="w-full flex flex-col sticky top-0 z-10">
      <div className="flex bg-amazon_blue py-4 pl-2 pr-4 items-center space-x-4 justify-between">
        <div
          className="relative w-[130px] h-[35px] mt-2 cursor-pointer"
          onClick={() => router.push('/')}>
          <Image src="https://links.papareact.com/f90" alt="logo" fill className="object-contain" />
        </div>

        <div className="hidden md:flex w-[600px] h-[40px] rounded-md bg-white flex-grow">
          <input
            type="text"
            placeholder="Search Amazon"
            className="rounded-l-md flex-grow flex-shrink outline-none px-4 text-sm border-none"
          />
          <MagnifyingGlassIcon
            className="w-10 flex-shrink px-2 bg-yellow-500 rounded-r-md 
          cursor-pointer hover:bg-yellow-600 transition-colors"
          />
        </div>

        <div className="flex text-white text-xs space-x-4">
          <div
            className="link whitespace-nowrap"
            onClick={session ? () => signOut() : () => signIn()}>
            <p>Hello , {session ? session.user?.name : 'sign in'}</p>
            <p className="text-xs sm:text-sm font-bold">Account & Lists</p>
          </div>

          <div className="link whitespace-nowrap" onClick={() => router.push('/orders')}>
            <p>Returns</p>
            <p className="text-xs sm:text-sm font-bold">& Orders</p>
          </div>

          <div className="relative flex items-end link" onClick={() => router.push('/checkout')}>
            <div className="absolute w-4 h-4 text-center bg-yellow-500 text-black rounded-full top-0 left-[28px]">
              {totalCount}
            </div>
            <ShoppingCartIcon className="w-10 h-10" />
            <p className="hidden md:inline text-xs sm:text-sm font-bold">Cart</p>
          </div>
        </div>
      </div>

      <div className="flex bg-amazon_blue-light pl-4 pr-2 text-white text-xs sm:text-sm space-x-4 items-center py-1">
        <p className="inline-flex items-center font-bold">
          <Bars3Icon className="w-8 h-8" />
          All
        </p>
        <p className="cursor-pointer font-medium">Today{"'"}s Deals</p>
        <p className="cursor-pointer font-medium">Customer Service</p>
        <p className="hidden sm:inline cursor-pointer font-medium">Registry</p>
        <p className="hidden sm:inline cursor-pointer font-medium">Gift Cards</p>
        <p className="hidden sm:inline cursor-pointer font-medium">Sell</p>
      </div>
    </header>
  )
}

export default Header
