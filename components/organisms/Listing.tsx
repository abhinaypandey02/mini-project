import Link from 'next/link'

import Cycle from '../../interfaces/Cycle'
import Container from '../atoms/Container'
import Wrapper from '../atoms/Wrapper'
import CycleCard from '../molecules/CycleCard'

export default function Listing({ cycles }: { cycles: Cycle[] }) {
  return (
    <Wrapper>
      <Container>
        {/* Component: sections/HeroFeaturedProducts.tsx props: {JSON.stringify(props)} */}

        <div className="m-auto flex flex-col justify-center py-[114px] text-black">
          <div className="flex justify-between py-10">
            <div className="text-3xl font-semibold">Our Best Picks</div>

            <div className="col-start-3 hidden sm:block ">
              <Link href={'/cycles'}>
                <button className="rounded-full border bg-[#ffffff]  py-2 px-4 text-black">
                  <span className="px-2">View all</span>
                  <svg
                    className="inline"
                    width="20"
                    height="13"
                    viewBox="0 0 20 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5303 7.03033C19.8232 6.73744 19.8232 6.26256 19.5303 5.96967L14.7574 1.1967C14.4645 0.903806 13.9896 0.903806 13.6967 1.1967C13.4038 1.48959 13.4038 1.96447 13.6967 2.25736L17.9393 6.5L13.6967 10.7426C13.4038 11.0355 13.4038 11.5104 13.6967 11.8033C13.9896 12.0962 14.4645 12.0962 14.7574 11.8033L19.5303 7.03033ZM0 7.25H19V5.75H0V7.25Z"
                      fill="#222222"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 justify-between gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {cycles?.map((cycle) => (
              <CycleCard key={cycle.id} cycle={cycle} />
            ))}
          </div>
          <div className="flex max-h-max justify-center py-12 sm:hidden">
            <Link href={'/vehicles'}>
              <button className="rounded-full border bg-[#ffffff]  py-2 px-4 text-black">
                <span className="px-2">View all</span>
                <svg
                  className="inline"
                  width="20"
                  height="13"
                  viewBox="0 0 20 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5303 7.03033C19.8232 6.73744 19.8232 6.26256 19.5303 5.96967L14.7574 1.1967C14.4645 0.903806 13.9896 0.903806 13.6967 1.1967C13.4038 1.48959 13.4038 1.96447 13.6967 2.25736L17.9393 6.5L13.6967 10.7426C13.4038 11.0355 13.4038 11.5104 13.6967 11.8033C13.9896 12.0962 14.4645 12.0962 14.7574 11.8033L19.5303 7.03033ZM0 7.25H19V5.75H0V7.25Z"
                    fill="#222222"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
