import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`min-h-screen ${inter.className} bg-gray-100 overflow-scroll`}
    >
      {/* CANVAS */}
      <div className='w-[1280px] min-h-[720px] bg-white m-6'>

      </div>
      {/* DATA POPUP */}
    </main>
  )
}
