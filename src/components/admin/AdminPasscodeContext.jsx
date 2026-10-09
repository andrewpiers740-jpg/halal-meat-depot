'use client'
import { createContext, useContext, useCallback } from 'react'

const Ctx = createContext({ passcode: '', signOut: () => {} })

export function AdminPasscodeProvider({ passcode, signOut, children }) {
  return <Ctx.Provider value={{ passcode, signOut }}>{children}</Ctx.Provider>
}

// useAdmin().api('/api/admin/orders/') — every admin request carries the
// passcode header; the passcode itself is only ever what the operator typed.
export function useAdmin() {
  const { passcode, signOut } = useContext(Ctx)
  const api = useCallback(
    async (path, opts = {}) => {
      const res = await fetch(path, {
        ...opts,
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Passcode': passcode, ...(opts.headers || {}) },
      })
      if (res.status === 401) signOut()
      const data = await res.json().catch(() => ({}))
      return { ok: res.ok && data.ok !== false, status: res.status, data }
    },
    [passcode, signOut]
  )
  return { passcode, signOut, api }
}
