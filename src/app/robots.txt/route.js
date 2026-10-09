import { SITE } from '@/config/site'

export const dynamic = 'force-static'

const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot', 'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai']
const PRIVATE = ['/admin/', '/api/admin/', '/api/account/', '/cart/', '/checkout/', '/account/', '/search/', '/order/', '/thank-you-contact/', '/thank-you-order/', '/thank-you-wholesale/']

export function GET() {
  const u = SITE.url
  const block = (ua) => [`User-agent: ${ua}`, 'Allow: /', ...PRIVATE.map((p) => `Disallow: ${p}`)].join('\n')
  const body = [
    block('*'),
    '',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    '',
    '# AI crawlers — welcome to index product and content pages',
    ...AI_BOTS.flatMap((ua) => [block(ua), '']),
    '# Agent-readable resources',
    `# llms.txt: ${u}/llms.txt`,
    `# API Catalog: ${u}/.well-known/api-catalog`,
    `# Agent Skills: ${u}/.well-known/agent-skills/index.json`,
    `# MCP Server Card: ${u}/.well-known/mcp/server-card.json`,
    `# MCP endpoint: ${u}/api/mcp/`,
    '',
    `Sitemap: ${u}/sitemap.xml`,
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
