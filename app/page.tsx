import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"


const font = Montserrat({ subsets: ['latin'], weight: "600" })


export default function Home() {
  return (
    <main className="h-screen flex flex-col space-y-6 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <h1 className={cn('text-5xl font-bold text-white drop-shadow-md', font.className)}>🔐 Auth</h1>
      <p className='text-white text-lg font-medium'> A simple auth service</p>
      <LoginButton >
        <Button variant='secondary' size='lg'> Se connecter</Button>
      </LoginButton>
    </main>
  )
}
