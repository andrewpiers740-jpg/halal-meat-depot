import { timingSafeEqual } from 'node:crypto'

// First line of every /api/admin/* route. 503 when the passcode is not set
// (the portal is never open by default), 401 when wrong, null when OK.
export function checkAdminPasscode(request) {
  const expected = process.env.ADMIN_PASSCODE
  if (!expected) return Response.json({ ok: false, error: 'admin-not-configured' }, { status: 503 })
  const given = request.headers.get('x-admin-passcode') || ''
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }
  return null
}
