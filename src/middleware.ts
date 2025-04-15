import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { COOKIE_NAME } from "./lib/constants"

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname

  // Obter o cookie de sessão
  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value

  // Verificar se o usuário está autenticado
  const isAuthenticated = sessionCookie ? true : false

  // Rotas que requerem autenticação
  const protectedRoutes = ["/dashboard"]

  // Verificar se a rota atual requer autenticação
  const isProtectedRoute = protectedRoutes.some((route) => currentPath === route || currentPath.startsWith(`${route}/`))

  // Redirecionar para a página de login se a rota for protegida e o usuário não estiver autenticado
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirecionar para o dashboard se o usuário já estiver autenticado e tentar acessar a página de login
  if (currentPath === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
