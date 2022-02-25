import type { NextPage } from 'next'
import Head from 'next/head'
import Dashboard from '../components/Dashboard'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Spotify Redesigned</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </div>
  )
}

export default Home
