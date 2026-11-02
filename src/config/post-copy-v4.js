// Hand-written copy for blog keyword map v4 (owner, 2026-11-02), keyed by the post's slug before v4.
// title = H1 (carries the new focus keyword); seoTitle ≤ 60 chars with 1–2 power words; excerpt = meta description
// (110–158 chars, focus keyword included); lead = opening sentence with the focus keyword; add = new sections that
// place every missing secondary verbatim, with links, and take the post past 1,500 words.
// Recipes stay halal: no pork, no alcohol.
import { POST_COPY_V4_1 } from './post-copy-v4-1.js'
import { POST_COPY_V4_2 } from './post-copy-v4-2.js'
import { POST_COPY_V4_3 } from './post-copy-v4-3.js'
import { POST_COPY_V4_4 } from './post-copy-v4-4.js'
import { POST_COPY_V4_5 } from './post-copy-v4-5.js'
import { POST_COPY_V4_6 } from './post-copy-v4-6.js'
import { POST_COPY_V4_7 } from './post-copy-v4-7.js'
import { POST_COPY_V4_8 } from './post-copy-v4-8.js'
import { POST_COPY_V4_9 } from './post-copy-v4-9.js'
import { POST_COPY_V4_10 } from './post-copy-v4-10.js'
import { POST_COPY_V4_11 } from './post-copy-v4-11.js'
import { POST_COPY_V4_12 } from './post-copy-v4-12.js'
import { POST_COPY_V4_13 } from './post-copy-v4-13.js'
import { POST_COPY_V4_14 } from './post-copy-v4-14.js'
import { POST_COPY_V4_15 } from './post-copy-v4-15.js'
import { POST_COPY_V4_16 } from './post-copy-v4-16.js'
import { POST_EXTRA_V4_A } from './post-extra-v4-a.js'
import { POST_EXTRA_V4_B } from './post-extra-v4-b.js'
import { POST_EXTRA_V4_C } from './post-extra-v4-c.js'
import { POST_EXTRA_V4_D } from './post-extra-v4-d.js'

const EXTRA = { ...POST_EXTRA_V4_A, ...POST_EXTRA_V4_B }
const TIPS = { ...POST_EXTRA_V4_C, ...POST_EXTRA_V4_D }

const ALL = {
  ...POST_COPY_V4_1,
  ...POST_COPY_V4_2,
  ...POST_COPY_V4_3,
  ...POST_COPY_V4_4,
  ...POST_COPY_V4_5,
  ...POST_COPY_V4_6,
  ...POST_COPY_V4_7,
  ...POST_COPY_V4_16,
  ...POST_COPY_V4_15,
  ...POST_COPY_V4_14,
  ...POST_COPY_V4_13,
  ...POST_COPY_V4_12,
  ...POST_COPY_V4_11,
  ...POST_COPY_V4_10,
  ...POST_COPY_V4_9,
  ...POST_COPY_V4_8,
}

// Each post: its hand-written sections, then a Q&A section that completes the 1,500 words.
export const POST_COPY_V4 = Object.fromEntries(Object.entries(ALL).map(([k, v]) => [k, { ...v, add: [...v.add, ...(EXTRA[k] || []), ...(TIPS[k] || [])] }]))
