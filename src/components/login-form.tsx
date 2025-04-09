"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/lib/auth"

const loginSchema = z.object({
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(data.username, data.password)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Falha na autenticação")
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-blue-200 shadow-lg">
      <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-lg">
        <div className="flex items-center justify-center mb-2">
          <div className="relative h-16 w-16 overflow-hidden">
            <Image
              src="/pokeball.png?height=64&width=64"
              alt="Pokemon Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Pokéadmin</CardTitle>
        <CardDescription className="text-blue-100 text-center">
          Faça login para acessar o painel de administração
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                {...form.register("username")}
                placeholder="Insira seu nome de usuário"
                className="border-blue-200 focus-visible:ring-blue-500"
                aria-invalid={!!form.formState.errors.username}
              />
              {form.formState.errors.username && (
                <p className="text-sm text-red-500">{form.formState.errors.username.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Button
                  type="button"
                  variant="link"
                  className="text-xs text-blue-600 p-0 h-auto font-normal"
                  onClick={() => { }}
                >
                  Esqueceu a senha?
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  {...form.register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Insira sua senha"
                  className="border-blue-200 focus-visible:ring-blue-500"
                  aria-invalid={!!form.formState.errors.password}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-blue-600 hover:text-blue-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || form.formState.isSubmitting}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t border-blue-100 bg-blue-50 rounded-b-lg">
        <p className="text-center text-sm text-blue-500">Nunca compartilhe sua senha com ninguém.</p>
      </CardFooter>
    </Card>
  )
}
