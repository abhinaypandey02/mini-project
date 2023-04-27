import React from 'react'
import Link from 'next/link'

import Cycle from '../../interfaces/Cycle'
import UserInterface from '../../interfaces/User'
import { useUser } from '../../pages/_app'
import Button from '../atoms/Button'
import CycleCard from '../molecules/CycleCard'
const ProductDesSection = ({
  cycle,
  similarBoughtCycles,
  similarCycles,
  host,
}: {
  cycle: Cycle
  similarBoughtCycles: Cycle[]
  similarCycles: Cycle[]
  host: UserInterface
}) => {
  const { rawUser } = useUser()
  return (
    <div className=" flex-grow">
      <span className="font-inter mb-3 text-sm capitalize text-[#8a8a8a]">by - {host?.name}</span>
      <h1 className="mb-7 text-4xl font-semibold text-black">
        {cycle.title} {cycle.model}
      </h1>
      {rawUser?.email === cycle.host && (
        <Link href={'/edit/' + cycle.id}>
          <Button>Edit</Button>
        </Link>
      )}
      <div className="mb-16 flex flex-wrap gap-5">
        {cycle.features?.map((item, index) => {
          return (
            <div
              key={item}
              className="flex items-center gap-3 rounded-full bg-p2 px-8 py-3 font-semibold capitalize shadow-lg"
            >
              <h6 className="font-inter">{item}</h6>
            </div>
          )
        })}
      </div>
      {similarBoughtCycles.length > 0 && (
        <h1 className="mb-7 text-2xl font-semibold text-black">People Also Booked</h1>
      )}
      <div className={'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'}>
        {similarBoughtCycles.map((cycle) => cycle && <CycleCard key={cycle.id} cycle={cycle} />)}
      </div>

      {similarCycles.length > 0 && (
        <h1 className="my-7 text-2xl font-semibold text-black">Similar Cycles</h1>
      )}
      <div className={'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'}>
        {similarCycles.map((cycle) => cycle && <CycleCard key={cycle.id} cycle={cycle} />)}
      </div>
    </div>
  )
}

export default ProductDesSection
