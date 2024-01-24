'use client'

import { login } from "@/actions/login"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginAuthShema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

import { startTransition, useState } from "react"
import * as z from "zod"
import CardWrapper from "./card-wrapper"
import { useSearchParams } from "next/navigation"

const LoginForm = () => {
  const searchParams = useSearchParams();

  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' 
  ? 'Le mail est deja lié à un autre compte' 
  : undefined;

  const [success, setSucces] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof LoginAuthShema>>({
    resolver: zodResolver(LoginAuthShema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const handleSubmit =(data: z.infer<typeof LoginAuthShema>)=>{
    startTransition(()=>{
      login(data).then( data => {
        setError(data?.error);
        setSucces(data?.success)
      })
    })
  }

  return (
    <div>
      <CardWrapper headerLabel="Welcome Back"
        backButtonLabel="Vous n'avez pas de compte?"
        backButtonHref="/auth/register"
        showsocials
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Mab@ecsam.ma" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" size='lg'>Connexion</Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default LoginForm