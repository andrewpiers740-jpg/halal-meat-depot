// Further extension blocks (batch H) for new posts, keyed by post key.
const sec = (title, paras) => [['h2', title], ...paras.map((p) => (Array.isArray(p) ? ['ul', p] : ['p', p]))]

export const POST_EXTRA_V4_H = {
}
