import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  Flame, 
  ChefHat, 
  Tag, 
  Share2, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'beef' | 'lamb' | 'goat' | 'exotic' | 'halal' | 'recipes';
  author: string;
  readTime: string;
  date: string;
  image: string;
  summary: string;
  content: string[];
  tips: string[];
  recommendedMeatCategory: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-beef-primals',
    title: 'The Master Guide to Australian Halal Beef Primal Cuts & Aging',
    slug: 'guide-to-australian-halal-beef-primals',
    category: 'beef',
    author: 'Chef Ahmad (Master Butcher, Greenacre)',
    readTime: '6 min read',
    date: '12 Oct 2026',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    summary: 'Discover how Riverina Angus primals, Scotch fillets, briskets, and Full-Blood Wagyu MB7+ are portioned and aged for peak tenderness.',
    content: [
      'Australian grass-fed beef is renowned globally for its natural pasture diet, deep mineral flavor, and high nutritional density. When shopping for wholesale primals, understanding the anatomical origin of each cut transforms your cooking and butchery.',
      'The Scotch Fillet (Ribeye) sits along the upper rib section where muscles do minimal weight-bearing work. This ensures fine muscle fibers and natural marbling that bastes the steak from within during grilling.',
      'For pitmasters and slow cookers, the Brisket (Packer Cut) contains the point and flat muscles separated by a thick seam of fat. In Halal butchery, we leave a 6mm fat cap to shield the meat over 12 hours of low-and-slow hickory smoke.',
      'Full-Blood Wagyu with Marble Scores 7+ through 9+ delivers unparalleled melt-in-the-mouth texture due to unsaturated oleic acid fat that melts at human body temperature.'
    ],
    tips: [
      'Always allow steaks to temper at room temperature for 30 minutes before grilling.',
      'Season heavily with coarse kosher salt right before hitting a blazing hot iron skillet.',
      'Rest cooked beef for half the duration of its cooking time to redistribute juices.'
    ],
    recommendedMeatCategory: 'beef',
  },
  {
    id: 'blog-goat-curry',
    title: 'Authentic Slow-Cooked Halal Goat Curry: Bone-In Cuts & Cooking Secrets',
    slug: 'authentic-slow-cooked-halal-goat-curry',
    category: 'goat',
    author: 'Master Butcher Tariq',
    readTime: '7 min read',
    date: '08 Oct 2026',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=80',
    summary: 'Why bone-in tender Australian Boer goat is the undisputed champion of traditional South Asian biryanis and Middle Eastern stews.',
    content: [
      'Australian Boer goat meat is lean, healthy, and packed with gelatin that dissolves into a velvety gravy when simmered gently. The marrow inside bone-in cuts imparts an earthy richness impossible to replicate with boneless meat alone.',
      'When ordering goat curry cuts from Halal Meat Depot, our butchers dice both shoulder and leg portions with bones intact to ensure the ideal balance between tender morsels and marrow extraction.',
      'The secret to zero gamy aroma is searing the meat in ghee with whole aromatics — black cardamom, cloves, cinnamon sticks, and bay leaves — before adding onions and yogurt.',
      'Cook on gentle low heat for at least 90 minutes. When the meat can be pulled effortlessly from the bone with a spoon, your curry has reached perfection.'
    ],
    tips: [
      'Use bone-in curry cuts with marrow pockets for maximum gravy body.',
      'Whisk yogurt with ground coriander before folding into the gravy to prevent curdling.',
      'Let the curry rest for 30 minutes off heat before serving with basmati rice.'
    ],
    recommendedMeatCategory: 'goat',
  },
  {
    id: 'blog-lamb-cutlets',
    title: 'Victorian Spring Lamb: Why French-Trimmed Cutlets are King',
    slug: 'victorian-spring-lamb-french-trimmed-cutlets',
    category: 'lamb',
    author: 'Zayd Al-Husseini (Quality Inspector)',
    readTime: '5 min read',
    date: '02 Oct 2026',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80',
    summary: 'The art of French trimming lamb ribs, achieving tender medium-rare doneness, and pairing with fresh rosemary and garlic.',
    content: [
      'Pasture-fed Victorian lambs benefit from cool climates and rich green grasslands, resulting in pale pink flesh with a clean, delicate sweetness.',
      'French trimming is a specialized butchery technique where the fat, meat, and intercostal sinew are meticulously scraped off the rib bones, leaving a pristine white bone handle for elegant presentation.',
      'Because the eye of the loin is exceptionally tender, cutlets require only 2 to 3 minutes of high heat per side. Overcooking lamb cutlets beyond medium renders the delicate meat dry.',
      'Whole lamb carcasses are also available at our depot, ideal for traditional whole spit roasting, family gatherings, and Eid banquets.'
    ],
    tips: [
      'Sear fat edge first by holding cutlets upright with tongs to render crispy fat.',
      'Target an internal meat temperature of 56°C to 58°C for juicy pink center.',
      'Dress immediately with fresh lemon juice, crushed mint, and extra virgin olive oil.'
    ],
    recommendedMeatCategory: 'lamb',
  },
  {
    id: 'blog-exotic-meats',
    title: 'Cooking Australian Halal Exotic Meats: Camel, Water Buffalo & Kangaroo',
    slug: 'cooking-australian-halal-exotic-meats',
    category: 'exotic',
    author: 'Chef Ahmad & Sourcing Team',
    readTime: '8 min read',
    date: '28 Sep 2026',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80',
    summary: 'A complete guide to wild rangeland exotic meats — nutrition profiles, leanness, and culinary techniques for camel, buffalo, and kangaroo.',
    content: [
      'Australia’s vast rangelands are home to some of the cleanest, most organic wild game meats on Earth. Halal Meat Depot is one of Sydney’s rare depots offering camel, water buffalo, and kangaroo certified Halal by Halal Control Australia.',
      'Camel meat is deeply prized across the Arabian Peninsula and North Africa. It is remarkably lean with higher protein and lower cholesterol than commercial beef. Camel hump is pure delicate fat, ideal for rendering into fragrant cooking oil, while camel striploin and ribs braise into succulent barbecue dishes.',
      'Water Buffalo offers an iron-rich flavor similar to prime beef but with 70% less fat. Buffalo striploin and ribeye can be grilled exactly like beef steaks, retaining moisture and hearty aroma.',
      'Wild Kangaroo is recognized as one of the leanest red meats in the world (under 2% fat). It must be cooked quickly to medium-rare or slow-braised with root vegetables in aromatic stocks.'
    ],
    tips: [
      'Always slice kangaroo against the grain and never cook beyond medium-rare.',
      'Camel curry cuts should be braised for 2 hours with caramelized onions and warm spices.',
      'Water buffalo steaks benefit from a light butter baste during the final minute of pan-searing.'
    ],
    recommendedMeatCategory: 'camel',
  },
  {
    id: 'blog-halal-integrity',
    title: 'Hand Zabiha vs Mechanical Slaughter: Understanding Halal Integrity',
    slug: 'hand-zabiha-vs-mechanical-slaughter',
    category: 'halal',
    author: 'Halal Compliance Board HMD',
    readTime: '6 min read',
    date: '20 Sep 2026',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=1000&q=80',
    summary: 'Why hand slaughter by practicing Muslim slaughtermen with continuous Tasmiyah is the gold standard of Halal certification in Australia.',
    content: [
      'In modern commercial poultry and meat production, automated rotary slaughter blades process thousands of animals per hour. For many observant Muslim families and restaurants, this mechanical method raises serious questions of Islamic compliance.',
      'In Zabiha slaughter, each animal is individually slaughtered by a trained Muslim slaughterman who invokes the name of Allah (Bismillah Allahu Akbar) at the precise moment of incision.',
      'The jugular veins, carotid arteries, and windpipe are cleanly severed with a razor-sharp blade. At Halal Meat Depot, all of our products are certified Halal by Halal Control Australia.',
      'This humane, swift cut ensures rapid blood drainage, producing hygienic, pure meat (Tayyib) with optimal shelf stability and peace of mind for every family.'
    ],
    tips: [
      'Verify Halal certificates have genuine abattoir plant registration numbers.',
      'Ask whether poultry is hand-slaughtered or mechanically processed.',
      'Look for a recognised Halal certifier’s seal on all commercial wholesale cartons.'
    ],
    recommendedMeatCategory: 'halal-certificate',
  },
  {
    id: 'blog-smoked-brisket',
    title: 'Smoked Halal Beef Brisket: Pitmaster Temperature & Trim Guide',
    slug: 'smoked-halal-beef-brisket-guide',
    category: 'recipes',
    author: 'Depot Pitmaster Team',
    readTime: '7 min read',
    date: '15 Sep 2026',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    summary: 'How to trim, rub, and smoke a full 6kg Halal Black Angus beef brisket over ironbark and oak for a competition-grade smoke ring.',
    content: [
      'The beef brisket is the holy grail of low-and-slow barbecue. Because cattle chest muscles support 60% of the animal’s body weight, they are dense with collagen that requires 10 to 14 hours of controlled heat to convert into gelatin.',
      'Begin by trimming the hard deckle fat while the meat is cold. Leave an even 6mm fat blanket across the top of the flat to prevent drying out during the stall.',
      'Apply a Texas-style rub: equal parts 16-mesh coarse black pepper and kosher salt, with a hint of garlic powder. Maintain your offset smoker at 110°C (225°F) using seasoned Australian ironbark.',
      'When internal temperature hits 74°C (the stall), wrap tightly in peach butcher paper with beef tallow. Continue smoking until an instant-read probe slides in like warm butter at 95°C (203°F).'
    ],
    tips: [
      'Wrap with peach butcher paper rather than foil to preserve the crunchy bark.',
      'Rest the wrapped brisket in an insulated dry cooler for at least 3 hours before slicing.',
      'Always slice against the grain — separate the flat and point before carving.'
    ],
    recommendedMeatCategory: 'beef',
  }
];

export const BlogPage: React.FC = () => {
  const { setCurrentTab, setSelectedCategory } = useCart();
  const [selectedCategory, setFilterCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'beef', label: 'Beef & Wagyu' },
    { id: 'lamb', label: 'Lamb' },
    { id: 'goat', label: 'Goat' },
    { id: 'exotic', label: 'Exotic Meats' },
    { id: 'halal', label: 'Halal Standards' },
    { id: 'recipes', label: 'Butcher Recipes' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const handleShopCategory = (cat: string) => {
    setActiveArticle(null);
    if (cat === 'halal-certificate') {
      setCurrentTab('halal-certificate');
    } else {
      setSelectedCategory?.(cat);
      setCurrentTab('shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-900 border border-rose-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-rose-700" />
            <span>Master Butchery &amp; Culinary Journal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight">
            Halal Meat Depot Guides &amp; Recipes
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto">
            Insights, portioning advice, and traditional recipes from our master Australian butchers in Greenacre NSW.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10 text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-xl transition uppercase tracking-wider ${
                selectedCategory === cat.id
                  ? 'bg-rose-900 text-white shadow-md'
                  : 'bg-white text-zinc-700 hover:text-zinc-950 border border-zinc-200 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="group bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:border-rose-700/60"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-zinc-800 px-2.5 py-0.5 rounded-md text-[10px] font-semibold flex items-center gap-1 shadow">
                    <Clock className="w-3 h-3 text-rose-700" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="text-zinc-600 font-semibold">{post.author}</span>
                  </div>

                  <h2 className="text-base sm:text-lg font-black text-zinc-950 leading-snug group-hover:text-rose-800 transition line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-rose-800">
                <span className="group-hover:underline">Read Full Butchery Guide</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-zinc-200 max-h-[90vh] flex flex-col">
            
            {/* Header Sticky Action */}
            <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                {activeArticle.category} • {activeArticle.readTime}
              </span>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200 transition"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Article Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-zinc-800">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="text-xs text-zinc-500 font-semibold mb-2">
                  Published on {activeArticle.date} by {activeArticle.author}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
                  {activeArticle.title}
                </h2>
              </div>

              {/* Main Content Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-4">
                {activeArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Master Butcher Pro Tips Box */}
              {activeArticle.tips && activeArticle.tips.length > 0 && (
                <div className="p-5 bg-rose-50/70 rounded-2xl border border-rose-200 text-xs space-y-3">
                  <div className="flex items-center gap-2 font-black text-rose-950 uppercase tracking-wider">
                    <ChefHat className="w-4 h-4 text-rose-700" />
                    <span>Master Butcher Cooking Tips</span>
                  </div>
                  <ul className="space-y-2 list-disc list-inside text-rose-900 font-medium">
                    {activeArticle.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Halal Guarantee Banner */}
              <div className="p-4 bg-zinc-950 text-white rounded-2xl flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>100% Halal Certified by Halal Control Australia.</span>
                </div>
                <span className="text-[11px] text-zinc-400 uppercase font-mono">Greenacre NSW</span>
              </div>
            </div>

            {/* Modal Bottom Call to Action */}
            <div className="p-4 sm:p-5 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="text-xs font-bold text-zinc-600 hover:text-zinc-900"
              >
                Close Article
              </button>

              <button
                type="button"
                onClick={() => handleShopCategory(activeArticle.recommendedMeatCategory)}
                className="bg-rose-800 hover:bg-rose-900 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow transition flex items-center gap-1.5 uppercase"
              >
                <span>Shop Related Cuts</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
