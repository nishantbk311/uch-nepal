import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  image: string;
  author: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    category: 'Sourcing',
    author: 'Aarav Sharma',
    title: 'The Legacy of Kashmir Wool',
    excerpt: 'The name cashmere originates from an old spelling of Kashmir, the area where its fabrication and give-and-take started.',
    content: [
      "The name cashmere originates from an old spelling of Kashmir, the area where its fabrication and give-and-take started centuries ago.",
      "Cashmere is a sort of wool produced from the hair of a specific kind of goat uniquely reared for their delicate undercoat, from which the cashmere strands are made. Cashmere development is fueled by the nippy air — it develops in Winter; in reality, the colder it gets, the more it develops to protect and shield the goats from severe temperatures.",
      "While cashmere is not as insulate as different kinds of fur, it is a lot lenient and advanced, which makes it conceivable to mesh into exceptionally profuse yet reedy textures. Top-notch cashmere can be multiple times hotter than sheep's fleece regardless of its lightweight."
    ],
    date: 'Oct 24, 2024',
    image: 'images/blog/blog-img3.jpeg'
  },
  {
    id: '2',
    category: 'Sustainability',
    author: 'Uch',
    title: 'Types of Crafts',
    excerpt: 'Exploring how we transform organic bamboo into the silkiest fibers known to man through green chemistry.',
    content: [
      "There are tons of various styles of crafts. The subsequent list of crafts is enclosed just for illustrative functions.",
      "The process begins with organic bamboo stalks, which are processed using a closed-loop system. This means that 99% of the water and solvents used in the extraction are recycled, minimizing our environmental footprint.",
      "The resulting fiber is naturally moisture-wicking, hypoallergenic, and possesses a subtle sheen that reflects light beautifully.",
      "Every thread of ZNPAL bamboo silk is a commitment to a circular economy, where beauty and responsibility coexist in every weave."
    ],
    date: 'Nov 02, 2024',
    image: 'images/blog/craft.jpeg'
  },
  {
    id: '3',
    category: 'Heritage',
    author: 'Tashi Lama',
    title: 'Weaving the Himalayas: Ancient Techniques',
    excerpt: 'A deep dive into the horizontal looms of the valley and the families preserving this heritage.',
    content: [
      "The rhythmic sound of the loom is the heartbeat of many Himalayan villages. For centuries, weaving has been more than just a trade; it is a spiritual practice, a way of recording history in thread.",
      "Our artisans use traditional horizontal looms, where every tension point and shuttle pass is controlled by hand and heart. This level of intimacy with the material results in fabrics that possess a 'soul'.",
      "Preserving these techniques is central to the ZNPAL mission. As machine-made mass production threatens to erase these skills, we provide a sustainable livelihood for master weavers.",
      "When you wear a ZNPAL piece, you are wearing generations of knowledge, a living tapestry of Himalayan resilience."
    ],
    date: 'Nov 12, 2024',
    image: 'images/blog/handicraft.jpeg'
  },
  {
    id: '4',
    category: 'Artistry',
    author: 'Maya Gurung',
    title: 'Sacred Symbols: The Language of Patterns',
    excerpt: 'Understanding the spiritual significance behind the traditional motifs found in our printed collections.',
    content: [
      "In the high valleys, geometry is a language of the divine. The patterns we print on our bamboo fibers are not merely decorative; they are ancient symbols meant to invoke protection and peace.",
      "The 'Lotus Bloom' represents purity emerging from the mud, while the 'Eternal Knot' symbolizes the interconnectedness of all things.",
      "We work with local scholars and monks to ensure that our use of these symbols remains respectful and true to their origins.",
      "Wearing these patterns is an invitation to mindfulness, a way to carry the serenity of the mountains with you throughout your day."
    ],
    date: 'Dec 05, 2024',
    image: 'images/blog/blog-img5.jpeg'
  },
  {
    id: '5',
    category: 'Process',
    author: 'Rajiv Thapa',
    title: 'Dyeing with the Earth: Mineral Pigments',
    excerpt: 'How we harness the colors of the valley using crushed minerals and botanical extracts.',
    content: [
      "The palette of ZNPAL is borrowed directly from the Himalayan landscape. We eschew harsh synthetic dyes in favor of mineral pigments and botanical extracts gathered by hand.",
      "Our deep indigos come from the indigofera plant, while our earthy ochres are derived from the very stones that form the valley floors.",
      "The process is slow, requiring multiple dips and careful sun-drying to achieve the desired saturation.",
      "By using earth-derived dyes, we protect the water systems of our mountain home, ensuring that the rivers run clear for the next generation of artisans."
    ],
    date: 'Dec 18, 2024',
    image: 'images/blog/blog-img4.jpeg'
  },
  {
    id: '6',
    category: 'Future',
    author: 'Sarah Chen',
    title: 'Circular Fashion: The Lifecycle of a Fiber',
    excerpt: 'Tracing our commitment to a zero-waste future through compostable textiles and fair-trade ethics.',
    content: [
      "The end of a garment's life is just as important as its beginning. At ZNPAL, we design for the entire lifecycle, ensuring that our fibers return to the earth as nutrients rather than waste.",
      "Because we use 100% natural bamboo cellulose and mineral dyes, our textiles are fully compostable under the right conditions.",
      "Beyond the material, our circularity includes the human element. Our fair-trade model ensures that wealth is distributed equitably back to the source.",
      "Investing in ZNPAL is an investment in a future where fashion is restorative, not extractive. It is a choice for the planet, for the people, and for enduring quality."
    ],
    date: 'Jan 10, 2025',
    image: 'images/blog/making-process.jpeg'
  },
  {
    id: '7',
    category: 'Future',
    author: 'Sarah Chen',
    title: 'Making of Cashmere',
    excerpt: 'Tracing our commitment to a zero-waste future through compostable textiles and fair-trade ethics.',
    content: [
      "The end of a garment's life is just as important as its beginning. At ZNPAL, we design for the entire lifecycle, ensuring that our fibers return to the earth as nutrients rather than waste.",
      "Because we use 100% natural bamboo cellulose and mineral dyes, our textiles are fully compostable under the right conditions.",
      "Beyond the material, our circularity includes the human element. Our fair-trade model ensures that wealth is distributed equitably back to the source.",
      "Investing in ZNPAL is an investment in a future where fashion is restorative, not extractive. It is a choice for the planet, for the people, and for enduring quality."
    ],
    date: 'Jan 10, 2025',
    image: 'images/blog/yoga.jpeg'
  }
];

const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const scrollPositionRef = useRef<number>(0);

  // Manage scroll behavior when switching views
  useEffect(() => {
    if (activePost) {
      // Entering post view: Scroll to top
      window.scrollTo(0, 0);
    } else {
      // Returning to list view: Restore saved position
      // Using requestAnimationFrame to ensure the list is rendered and measurable
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    }
  }, [activePost]);

  const handleOpenPost = (post: BlogPost) => {
    scrollPositionRef.current = window.scrollY;
    setActivePost(post);
  };

  const handleClosePost = () => {
    setActivePost(null);
  };

  if (activePost) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-[#faf9f6] min-h-screen"
      >
        {/* Article Hero */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={activePost.image} 
            className="absolute inset-0 w-full h-full object-cover object-[50%_30%] brightness-[0.6] grayscale-[0.2]"
            alt={activePost.title}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#faf9f6]"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleClosePost}
              className="mb-12 flex items-center space-x-4 text-[10px] tracking-[0.5em] font-black uppercase text-white hover:text-[#d4af37] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              <span>Back to Journal</span>
            </motion.button>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-6"
            >
              {activePost.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-8xl text-black serif italic leading-tight max-w-5xl"
            >
              {activePost.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center space-x-8 text-[10px] tracking-[0.3em] font-bold text-gray-500 uppercase"
            >
              <span>By {activePost.author}</span>
              <span className="w-8 h-[1px] bg-gray-300"></span>
              <span>{activePost.date}</span>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="space-y-12 text-xl md:text-2xl text-gray-700 font-light leading-relaxed serif italic">
             {activePost.content.map((paragraph, i) => (
               <motion.p 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
               >
                 {paragraph}
               </motion.p>
             ))}
          </div>
          
         
        </section>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#faf9f6]">
      {/* Hero Header */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden -mt-20">
        <img 
          // src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1920" 
          src="images/blog/blog-img1.jpeg" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
          alt="Writing journal"
        />
        <div className="relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] font-black mb-6 block"
          >
            THE JOURNAL
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl text-white serif italic"
          >
            Refined Notes
          </motion.h1>
        </div>
      </section>

      {/* Featured Article: Cashmere - Displayed in full as requested, centered vertically */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 rounded-sm shadow-2xl">
               <img 
                src={BLOG_POSTS[0].image} 
                alt="Cashmere texture" 
                className="w-full h-full object-cover"
               />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-[#d4af37] font-bold">Featured Story</span>
            <h2 className="text-5xl md:text-7xl serif leading-[1] text-black">
              The Legacy of <br/><span className="italic">Kashmir Wool</span>
            </h2>
            <div className="space-y-8 text-gray-600 font-light leading-relaxed text-lg lg:text-xl">
              <p>
                The name <span className="text-black font-semibold">cashmere</span> originates from an old spelling of <span className="italic">Kashmir</span>, the area where its fabrication and give-and-take started centuries ago.
              </p>
              <p>
                Cashmere is a sort of wool produced from the hair of a specific kind of goat uniquely reared for their delicate undercoat, from which the cashmere strands are made. Cashmere development is fueled by the nippy air — it develops in Winter; in reality, the colder it gets, the more it develops to protect and shield the goats from severe temperatures.
              </p>
              <p>
                While cashmere is not as insulate as different kinds of fur, it is a lot lenient and advanced, which makes it conceivable to mesh into exceptionally profuse yet reedy textures. Top-notch cashmere can be multiple times hotter than sheep's fleece regardless of its lightweight.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-20">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-gray-400 font-bold">Chronicles</span>
              <h2 className="text-4xl serif mt-4">Latest from the Studio</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
            {BLOG_POSTS.slice(1).map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleOpenPost(post)}
              >
                <div className="aspect-[16/10] overflow-hidden rounded-sm mb-8 bg-gray-50 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] tracking-[0.2em] font-bold text-[#d4af37] uppercase">
                    <span>{post.category}</span>
                    <span className="text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-2xl serif leading-tight text-black group-hover:text-[#d4af37] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="text-[10px] tracking-[0.3em] font-black uppercase border-b border-black pb-1 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-all">
                    Read More
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-black text-white py-32 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl serif italic mb-8">Stay informed on the heritage.</h3>
          <p className="text-gray-400 font-light mb-12 tracking-wide leading-relaxed">
            Subscribe to our seasonal journal for deep dives into Himalayan craftsmanship and sustainable fiber innovations.
          </p>
          <form className="flex max-w-md mx-auto border-b border-white/20 pb-4 focus-within:border-[#d4af37] transition-colors" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-transparent border-none text-white text-xs tracking-[0.3em] flex-grow focus:outline-none placeholder:text-gray-700"
            />
            <button className="text-[10px] font-black tracking-[0.4em] uppercase text-[#d4af37]">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;