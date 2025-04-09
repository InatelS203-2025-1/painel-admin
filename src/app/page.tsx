import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4 md:p-8">
      <LoginForm />
    </main>
  )
}
