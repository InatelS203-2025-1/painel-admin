"use server"

import { cookies } from "next/headers"
import { COOKIE_NAME } from "./constants";

const users = [
  {
    id: "1",
    username: "admin",
    password: "pokemon123",
    name: "Administrador",
    role: "admin",
  },
  {
    id: "2",
    username: "ash",
    password: "pikachu",
    name: "Ash Ketchum",
    role: "trainer",
  },
]

export async function login(username: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password)

  if (!user) {
    return {
      success: false,
      error: "Nome de usuário ou senha inválidos",
    }
  }

  const session = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 horas
  }

  const sessionCookie = await cookies();

  sessionCookie.set(COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 dia
    path: "/",
  })


  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    },
  }
}

export async function getSession() {
  const sessionCookie = await cookies();

  const pokemonSession = sessionCookie.get(COOKIE_NAME);

  if (!sessionCookie || !pokemonSession) {
    return null
  }

  try {
    const session = JSON.parse(pokemonSession.value)

    if (session.expires < Date.now()) {
      sessionCookie.delete(COOKIE_NAME)
      return null
    }

    return session
  } catch (error) {
    return null
  }
}

export async function logout() {
  const sessionCookie = await cookies();
  sessionCookie.delete(COOKIE_NAME);
  return { success: true }
}
