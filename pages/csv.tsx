import { useEffect } from 'react'

import { getCycles } from '../firebase/firestore'
import Cycle from '../interfaces/Cycle'
function download(filename: string, text: string) {
  const pom = document.createElement('a')
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  pom.setAttribute('download', filename)
  pom.click()
}
export default function Csv({ cycles }: { cycles: Cycle[] }) {
  let csv = 'brand, price, title, gear, features, id'
  cycles.forEach((cycle) => {
    csv += `\n${cycle.model}, ${cycle.price}, ${cycle.title}, ${cycle.gear}, ${cycle.features.join(
      ' '
    )}, ${cycle.id}`
  })
  useEffect(() => {
    download('data.csv', csv)
  }, [])
  return null
}

export async function getServerSideProps() {
  const cycles = await getCycles()

  return {
    props: {
      cycles: cycles.filter((c) => !c.paused),
    },
  }
}
