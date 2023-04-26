import React, { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from 'firebase/auth'

import { signInGoogle } from '../../firebase/auth'
import Button from '../atoms/Button'
export default function Sidebar({
  user,
  ROUTES,
  currentPath,
}: {
  user?: User
  ROUTES: any
  currentPath: string
}) {
  const [loading, setLoading] = useState(false)

  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setScrollY(window.scrollY)
      setTimeout(() => {
        document.body.style.position = 'fixed'
        document.body.style.top = `-${window.scrollY}px`
      }, 300)
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])
  return (
    <>
      {!isOpen ? (
        <button
          className="absolute right-3 top-5 z-10 flex cursor-pointer items-center md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={'1.5'}
            stroke="currentColor"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      ) : null}

      <div
        onScroll={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        className={`fixed top-0 right-0 z-10 min-h-full w-full bg-white ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } duration-300 ease-in-out`}
      >
        <div className={'z-20  mt-5 flex items-center justify-between pr-3 pl-4'}>
          <div className=" flex items-center">
            <Link href={'/'} className={'flex items-center gap-3'}>
              <div className={'h-12 w-12'}>
                <Image width={300} height={300} src={'/logo.png'} alt={'cycle management system'} />
              </div>
              <div
                className={'text-1.5xl hidden text-center font-bold hover:text-purple-900 md:block'}
                style={{ color: '#F5C300' }}
              >
                Cycle Management System
              </div>
            </Link>
          </div>

          <button className="z-20 text-xl text-black" onClick={() => setIsOpen(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-10 w-10"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={'mt-7 px-4'}>
          <div className={'my-5 flex flex-col gap-5 text-center'}>
            {ROUTES.map((route: any) => (
              <div key={route.slug}>
                <Link
                  className={currentPath === route.slug ? 'text-xl font-bold text-p1 ' : 'text-xl'}
                  key={route.slug}
                  href={route.slug}
                >
                  {route.title}
                </Link>
              </div>
            ))}
          </div>
          {!user && (
            <Button
              width={150}
              height={50}
              id={'google'}
              variant={'outline'}
              className={
                'mx-auto flex gap-3 rounded-lg border bg-white p-4 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:text-white'
              }
              onClick={() => {
                setLoading(true)
                if (!user) signInGoogle().finally(() => setLoading(false))
              }}
            >
              {loading && (
                <div
                  className="text-success inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-p1 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}
              {!loading && !user && 'Start Now'}
              {!loading && !user && (
                <img
                  alt={'google'}
                  width={20}
                  src="https://img.icons8.com/color/48/null/google-logo.png"
                />
              )}
            </Button>
          )}
          {user && (
            <Link
              href={'/account'}
              className={'mx-auto mt-20 flex flex-col items-center justify-center gap-4'}
            >
              <div className={'  h-16 w-16 overflow-hidden rounded-full border border-p1'}>
                <Image
                  alt={'user photo'}
                  width={64}
                  height={64}
                  src={user.photoURL || '/profile.png'}
                />
              </div>
              <span className={'text-lg'}>{user.displayName}</span>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
