// MCP server — Streamable HTTP transport, stateless, JSON responses only.
// Read-only plus draft: tools never place orders, take payment or change state.
import { SITE } from '@/config/site'
import { TOOLS, runTool } from '@/lib/tools'

export const dynamic = 'force-dynamic'

const PROTOCOL_VERSION = '2025-11-25'
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}

export async function GET() {
  // No server-initiated stream for a read-only catalogue.
  return new Response(null, { status: 405, headers: { ...CORS, Allow: 'POST, OPTIONS' } })
}

async function handle(msg) {
  const reply = (result) => ({ jsonrpc: '2.0', id: msg.id, result })
  const fail = (code, message) => ({ jsonrpc: '2.0', id: msg?.id ?? null, error: { code, message } })
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') return fail(-32600, 'Invalid request')
  switch (msg.method) {
    case 'initialize':
      return reply({
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: SITE.name, version: '1.0.0' },
        instructions: `Catalogue of halal meat certified by ${SITE.certifier}. Prices in AUD. Agents may search and prepare a cart; a human completes every order.`,
      })
    case 'notifications/initialized':
      return null
    case 'ping':
      return reply({})
    case 'tools/list':
      return reply({ tools: TOOLS })
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === msg.params?.name)
      if (!tool) return fail(-32602, `Unknown tool: ${msg.params?.name}`)
      const out = await runTool(tool.name, msg.params?.arguments ?? {})
      return reply({ content: [{ type: 'text', text: JSON.stringify(out) }], structuredContent: Array.isArray(out) ? { items: out } : out })
    }
    default:
      return fail(-32601, `Unknown method: ${msg.method}`)
  }
}

export async function POST(request) {
  let msg
  try {
    msg = await request.json()
  } catch {
    return Response.json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, { headers: CORS })
  }
  if (Array.isArray(msg)) {
    const out = (await Promise.all(msg.map(handle))).filter(Boolean)
    return out.length ? Response.json(out, { headers: CORS }) : new Response(null, { status: 202, headers: CORS })
  }
  const out = await handle(msg)
  return out ? Response.json(out, { headers: CORS }) : new Response(null, { status: 202, headers: CORS })
}
