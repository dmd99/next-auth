import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

const DashboardPage = async () => {
  const session = await auth()
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-6'>
      <h1 className='text-3xl uppercase font-black'>
        Dashboard Page
      </h1>
      <pre className='bg-gray-50 border border-gray-100 w-1/2 h-[300px] overflow-y-auto'>{JSON.stringify(session)}</pre>
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <Button type='submit' size='lg' variant='destructive'>Sign Out</Button>
      </form>
    </div>
  )
}

export default DashboardPage