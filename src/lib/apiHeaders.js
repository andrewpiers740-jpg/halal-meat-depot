export const PUBLIC_JSON_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, max-age=300',
}

export const json = (data, init = {}) => Response.json(data, { ...init, headers: { ...PUBLIC_JSON_HEADERS, ...(init.headers || {}) } })
