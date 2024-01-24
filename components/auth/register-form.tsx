'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterAuthShema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { register } from "@/actions/register"
import FormError from "@/components/form-error"
import { startTransition, useState } from "react"
import * as z from "zod"
import FormSuccess from "../form-success"
import CardWrapper from "./card-wrapper"

const LoginForm = () => {
  
  const [success, setSucces] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof RegisterAuthShema>>({
    resolver: zodResolver(RegisterAuthShema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const handleSubmit =(data: z.infer<typeof RegisterAuthShema>)=>{
    startTransition(()=>{
      register(data).then( data => {
        setError(data.error);
        setSucces(data.success)
      })
    })
  }

  return (
    <div>
      <CardWrapper headerLabel="Welcome to the register service"
        backButtonLabel="Vous êtes dèja inscrit?"
        backButtonHref="/auth/login"
        showsocials
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Jhon Doe" name="name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            
            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit" className="w-full" size='lg'> Connexion  </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default LoginForm