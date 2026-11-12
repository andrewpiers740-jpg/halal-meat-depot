import { SITE } from '@/config/site'

export const dynamic = 'force-static'

const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot', 'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai']
const PRIVATE = ['/admin/', '/api/admin/', '/api/account/','/checkout/', '/order/', '/thank-you-contact/', '/thank-you-order/', '/thank-you-wholesale/']

export function GET() {
  const u = SITE.url
  // Content Signals (owner OK 2026-11-02) belong INSIDE each User-agent group (contentsignals.org spec). A stray line between
  // groups was reported as "Invalid robots.txt format" (Semrush audit, 2026-11-12). Lighthouse 13.x accepts the directive
  // (SEO 100); 12.8 and older mark it "Unknown directive". Drop SIGNAL from block() if a checker you rely on still penalises it.
  const SIGNAL = 'Content-Signal: search=yes, ai-input=yes, ai-train=no'
  const block = (ua) => [`User-agent: ${ua}`, 'Allow: /', ...PRIVATE.map((p) => `Disallow: ${p}`), SIGNAL].join('\n')
  const body = [
    block('*'),
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
