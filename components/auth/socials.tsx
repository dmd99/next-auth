'use client'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { REDIRECT_AUTH } from '@/route'

const Socials = () => {
  return (
    <div className='w-full flex items-center gap-2'>
      <Button className='w-full shadow-sm' variant='outline' size='lg' onClick={() => {
        signIn('google', { callbackUrl: REDIRECT_AUTH })
      }}>
        <FcGoogle className='w-5 h-5' />
      </Button>
      <Button className='w-full shadow-sm' variant='outline' size='lg' onClick={() => {
        signIn('github', { callbackUrl: REDIRECT_AUTH })
      }}>
        <FaGithub className='w-5 h-5' />
      </Button>
    </div>
  )
}

export default Socials