import React from 'react'

import Carousel from '../atoms/Carousel'
import Container from '../atoms/Container'
import Wrapper from '../atoms/Wrapper'

const SLIDES = [
  {
    name: 'Log In',
    image: '/slide1.svg',
    desc: 'Complete a simple authorization process through Google Sign-in.',
  },
  {
    name: 'Select a cycle',
    image: '/slide2.svg',
    desc: 'Choose from the variety of cycles available.',
  },
  {
    name: 'Complete Payment',
    image: '/slide3.svg',
    desc: 'Complete your payment through our fast and secure payment portal',
  },
]
export default function HomeHowItWorks() {
  return (
    <Wrapper className={'mx-2 md:mx-14'}>
      <Container className="flex !max-w-[955px] flex-col items-center pt-14 pb-6 text-center md:pt-20 md:pb-12">
        <div>
          <div className={'relative mb-1 md:mb-3'}>
            {/*<Text text={'Hassle free'} textStyle={'dm-700-41-51'} className={'absolute text-center left-1/2 w-full -translate-x-1/2 -top-6 !text-[#0D152E0F]'} />*/}
            <span className={'text-4xl font-bold'}>Here’s how it works</span>
          </div>
        </div>
        <div>
          <div className={'mb-4 max-w-[533px] md:mb-20 md:pb-2'}>
            <span className={'!text-p3 opacity-70'}>Rent your cycle in just a few clicks</span>
          </div>
        </div>
        <Carousel>
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className={'flex flex-wrap justify-between pb-10 text-start md:flex-nowrap '}
            >
              <div className={'w-full flex-shrink-0 md:w-auto md:max-w-[50%]'}>
                <img
                  loading="lazy"
                  alt={'Image for ' + slide.name}
                  src={slide.image}
                  className={'mx-auto md:mx-0 '}
                />
              </div>
              <div className={'mt-5 md:mt-0 md:ml-12 md:mr-auto'}>
                <div className={'flex  items-center md:mb-4'}>
                  <div
                    className={'mr-5 flex flex-shrink-0 items-center rounded-lg bg-p1 px-2 py-1.5'}
                  >
                    <span className={'!text-white'}>{'Step ' + (index + 1).toString()}</span>
                  </div>

                  <span className={'!text-[#183B56]'}>{slide.name}</span>
                </div>
                <div>
                  <span className={'!text-[#5A7184] '}>{slide.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    </Wrapper>
  )
}
