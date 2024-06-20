import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Cognito from 'next-auth/providers/Cognito'

export const authConfig = {
   providers: [
      Cognito({
         clientId: process.env.COGNITO_CLIENT_ID,
         clientSecret: process.env.COGNITO_CLIENT_SECRET,
         issuer: process.env.COGNITO_ISSUER,
      }),
   ],
   callbacks: {
      authorized({ auth, request: { nextUrl } }) {
         const isLoggedIn = !!auth?.user
         const allowedPrefixes = ['/interviews', '/client']
         const isOnPage = allowedPrefixes.some((prefix) =>
            nextUrl.pathname.startsWith(prefix),
         )
         if (isOnPage) {
            if (isLoggedIn) return true
            return false
         }
         return true
      },
   },
} satisfies NextAuthConfig

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig)
