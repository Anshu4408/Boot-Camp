import React from 'react'
import AuthHero from '@/components/AuthHero'
import AuthForm from '@/components/AuthForm'

const page = () => {
  return (
    <main className='min-h-screen p-0 flex m-0'>
      <AuthHero />
      <AuthForm />
    </main>
  )
}

export default page
