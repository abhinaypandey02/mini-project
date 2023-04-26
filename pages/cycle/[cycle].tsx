import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { FieldValues, useForm } from 'react-hook-form'
import { v4 } from 'uuid'

import Button from '../../components/atoms/Button'
import Container from '../../components/atoms/Container'
import Input from '../../components/atoms/Input'
import SEO from '../../components/atoms/Seo'
import Wrapper from '../../components/atoms/Wrapper'
import Layout from '../../components/organisms/Layout'
import ProductDesSection from '../../components/organisms/ProductDesSection'
import { signInGoogle } from '../../firebase/auth'
import { getClientBookings, getCycle, getCycleBookings } from '../../firebase/firestore'
import Booking from '../../interfaces/Booking'
import Cycle from '../../interfaces/Cycle'
import { useUser } from '../../pages/_app'
import getStripe from '../../stripe'
export const SLOTS = [
  { code: '1', from: 6, to: 8, timeString: '6am - 8am', title: 'Slot 1' },
  { code: '2', from: 8, to: 10, timeString: '8am - 10am', title: 'Slot 2' },
  { code: '3', from: 10, to: 12, timeString: '10am - 12pm', title: 'Slot 3' },
  { code: '4', from: 12, to: 14, timeString: '12pm - 2pm', title: 'Slot 4' },
  { code: '5', from: 14, to: 16, timeString: '2pm - 4pm', title: 'Slot 5' },
  { code: '6', from: 16, to: 18, timeString: '4pm - 6pm', title: 'Slot 6' },
  { code: '7', from: 18, to: 20, timeString: '6pm - 8pm', title: 'Slot 7' },
  { code: '8', from: 20, to: 22, timeString: '8pm - 10pm', title: 'Slot 8' },
]
export default function CyclePage({
  cycle,
  bookings,
  similarBoughtCycles,
  similarCycles,
}: {
  cycle: Cycle | null
  bookings: Booking[]
  similarBoughtCycles: Cycle[]
  similarCycles: Cycle[]
}) {
  const { rawUser } = useUser()
  var curr = new Date()
  const [loading, setLoading] = useState(false)

  curr.setDate(curr.getDate() + 1)
  const date = curr.toISOString().substring(0, 10)

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      date,
    },
  })
  const selectedDate = watch('date' as any) as Date
  const selectedDateBookings =
    typeof selectedDate === 'string'
      ? []
      : bookings.filter(
          (booking) => new Date(booking.date).toDateString() === selectedDate.toDateString()
        )
  // console.log(selectedDate.toDateString(), new Date(bookings[0].date).toDateString())
  const slots = SLOTS.filter(
    (slot) => !selectedDateBookings.some((booking) => booking.slot === slot.code)
  )
  if (!cycle) {
    return null
  }
  async function onSubmit(data: FieldValues) {
    const slot = SLOTS.find((slot) => slot.code === data.slot)
    if (!slot) return
    if (!cycle || !rawUser) {
      signInGoogle()
      return
    }
    setLoading(true)
    const booking: Booking = {
      slot: slot.code,
      cycle: cycle.id,
      date: data.date.getTime(),
      client: rawUser?.email || '',
      host: cycle.host,
      id: v4(),
      price: cycle.price,
    }
    const response = await fetch('/api/stripe-checkout', {
      method: 'POST',
      body: JSON.stringify({
        plan: {
          name: 'Book ' + cycle?.title,
          description: `Book ${cycle?.title} for ${data.date.toLocaleDateString()} ${
            slot.timeString
          }`,
          price: cycle?.price * 100 || 0,
        },
        booking,
      }),
    }).then((data) => data.json())
    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) alert(error.message)
  }
  return (
    <Layout className={'rounded-xl bg-white shadow'}>
      <SEO image={cycle.image} title={cycle.title + ' ' + cycle.model} />

      <Wrapper>
        <Container className={''}>
          <div className={' mx-auto w-full md:w-1/2'}>
            <Image
              width={1000}
              height={1000}
              className={'h-full w-full object-center'}
              src={cycle.image || 'cycle'}
              alt={''}
            />
          </div>
          <div className=" flex flex-wrap-reverse justify-between gap-10 px-4 pt-[50px] pb-[100px] sm:px-10 md:flex-nowrap ">
            <ProductDesSection
              similarCycles={similarCycles}
              similarBoughtCycles={similarBoughtCycles}
              cycle={cycle}
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              name={'product'}
              className={`top-[120px] h-fit w-full flex-shrink-0  rounded-sm border-[1px] border-[#d7d7d7] border-b-yellow-400 pt-5 shadow-lg md:sticky md:w-1/4  `}
            >
              <div className="grid grid-flow-row grid-cols-1">
                <span className="mx-3 px-2 pt-3 pb-1 text-sm font-medium">Start Date</span>
              </div>
              <div className={'px-3'}>
                <input
                  type="date"
                  {...register('date', { valueAsDate: true })}
                  className="my-1 w-full  rounded-md   border-[1px] border-gray-300 px-2 py-2"
                  placeholder="Trip Start"
                  min={curr.toISOString().split('T')[0]}
                />
              </div>
              <div className="grid grid-flow-row grid-cols-1">
                <span className="mx-3 px-2 pt-3 pb-1 text-sm font-medium">Slot</span>
              </div>
              <div className={'px-3'}>
                <select
                  {...register('slot' as any)}
                  className="mt-1 block  w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value={undefined}>Select Slot</option>
                  {slots.map((slot) => (
                    <option key={slot.code} value={slot.code}>
                      {slot.title} - {slot.timeString}
                    </option>
                  ))}
                </select>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="mt-7 w-full rounded-md border-[1px]  border-[#FFC300] bg-[#FFC300] py-5 text-white"
              >
                {!loading && (
                  <div className="flex justify-between px-11  font-semibold">
                    <h4>Book this car </h4> &nbsp;
                    <span className={'text-xl'}>₹ {cycle.price || 0}</span>
                  </div>
                )}
                {loading && <div className={'text-center'}>Loading...</div>}
              </button>
            </form>
          </div>
        </Container>
      </Wrapper>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const cycle: Cycle | null = await getCycle(params?.cycle?.toString())
  const bookings = await getCycleBookings(params?.cycle?.toString() || '')
  const users = new Set<string>()
  bookings.forEach((booking) => {
    users.add(booking.client)
  })
  const alsoBoughtCycles: any = {}
  const userArray = Array.from(users)
  await Promise.all(
    userArray.map(async (user) => {
      const userBookings = await getClientBookings(user)
      userBookings.forEach((booking) => {
        if (alsoBoughtCycles[booking.cycle as any]) alsoBoughtCycles[booking.cycle as any]++
        else {
          alsoBoughtCycles[booking.cycle as any] = 1
        }
      })
    })
  )
  const similarBoughtCycles = await Promise.all(
    Object.keys(alsoBoughtCycles)
      .sort((a, b) => alsoBoughtCycles[b as any] - alsoBoughtCycles[a as any])
      .slice(0, 3)
      .map(getCycle)
  )
  let similarCycles = []
  if (cycle) {
    try {
      const formdata = new FormData()
      formdata.append(
        'data',
        `${cycle.model}, ${cycle.price}, ${cycle.title}, ${cycle.gear}, ${cycle.features.join(' ')}`
      )
      const res = await fetch('https://6b86dd124d61.ngrok.app/search', {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      })
      const resCycles = await res.json()
      if (resCycles)
        similarCycles = await Promise.all(resCycles.slice(0, 3).map(() => getCycle(resCycles.id)))
    } catch (e) {
      console.error(e)
    }
  }

  return {
    props: { cycle, bookings, similarBoughtCycles: similarBoughtCycles, similarCycles },
  }
}
