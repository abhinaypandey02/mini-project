import Image from 'next/image'
import Link from 'next/link'

import Container from '../atoms/Container'
import Wrapper from '../atoms/Wrapper'
const ROUTES = [
  {
    title: 'Home',
    slug: '/',
  },
  {
    title: 'Listings',
    slug: '/listings',
  },
]
export default function Footer() {
  return (
    <Wrapper className={'bg-black'}>
      <Container className={'grid grid-cols-1 gap-8 py-10  px-2 text-white md:grid-cols-3'}>
        <div>
          <div>Logo</div>
          <div>Lorem Ipsum</div>
          <div className={'flex gap-4'}>
            <div
              className={
                'flex h-5 w-5 items-center justify-center rounded-full border border-white'
              }
            >
              f
            </div>
            <div
              className={
                'flex h-5 w-5 items-center justify-center rounded-full border border-white'
              }
            >
              f
            </div>
            <div
              className={
                'flex h-5 w-5 items-center justify-center rounded-full border border-white'
              }
            >
              f
            </div>
            <div
              className={
                'flex h-5 w-5 items-center justify-center rounded-full border border-white'
              }
            >
              f
            </div>
          </div>
        </div>

        <div className={'flex flex-col'}>
          <div>Pages</div>
          <div>
            {ROUTES.map((route) => (
              <div key={route.slug}>
                <Link href={route.slug}>{route.title}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className={'flex flex-col gap-2 text-center md:text-left'}>
          <div className={'text-xl font-semibold'}>Get in touch</div>
          <div className={'mx-auto flex  gap-3 md:mx-0'}>
            <div>Email</div>
            <div>lci2020012@iiitl.ac.in</div>
          </div>
          <div className={'mx-auto flex gap-3 md:mx-0'}>
            <div>Phone</div>
            <div>+919456679268</div>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
