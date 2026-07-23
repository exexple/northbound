import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import booksData from '../data/books';
import { BookOpen, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Excerpts to render in our mock premium reader modal
const EXCERPTS = {
  'room-roof': {
    title: "The Room on the Roof",
    author: "Ruskin Bond",
    pages: [
      "Rusty was a quiet boy who lived with his guardian, the missionary Mr. Harrison, in the European community of Dehra Dun. He felt isolated and constrained by the strict rules of his home, where he was forbidden to mix with the local Indian population down in the bazaar. His world was one of quiet bungalows, gravel paths, and silent afternoons.",
      "But one afternoon, during the hot, dusty days before the monsoon, Rusty broke the rules. He walked down into the bazaar. There he met Somi, a Sikh boy riding a bicycle, and Ranbir, a wrestler. In the crowded, chaotic streets filled with the scent of spices, hot tea, sweet milk, and frying pakoras, he felt alive for the very first time.",
      "Somi found him a room to live in—a small room on the roof of a house belonging to the Kapoor family. It was a tiny room with a tin roof that rattled in the rain, but it had a window that looked out over the tree-tops and the distant blue hills. Here, Rusty would write, dream, and watch the monsoon clouds gather over the Dehra valley."
    ]
  },
  'rain-mountains': {
    title: "Rain in the Mountains",
    author: "Ruskin Bond",
    pages: [
      "Rain in the hills is different from rain in the plains. It does not just fall; it settles in. It rolls up the valley in great banks of white mist, swallowing the trees and the houses until only the peak of the ridge remains, floating like an island in a sea of clouds.",
      "The pine needles glisten with droplets, and the sound of water dripping from the tin roof is a steady, soothing rhythm. It is a time for hot ginger tea, for sitting by the fireplace with an old journal, and for listening to the wind sighing through the deodars. There is a deep, comforting solitude in these wet mountains.",
      "The ferns and wild begonias grow thick on the stone walls, and the moss grows rich and green on the oak trees. To live in the hills is to live in close company with nature, where every rainstorm is a cleaning of the soul and every misty morning a fresh beginning."
    ]
  },
  'letters-poet': {
    title: "Letters to a Young Poet",
    author: "Rainer Maria Rilke",
    pages: [
      "Paris, February 17, 1903.\n\nMy dear Sir,\nYour letter only reached me a few days ago. I want to thank you for the great trust you have placed in me. There is little I can say about your verses; for any critical attempt is too far removed from the work itself.",
      "You ask whether your verses are good. You ask me. You have asked others before. You send them to magazines. You compare them with other poems, and you are disturbed when certain editors reject your efforts. Now, I beg you to give up all that.",
      "Go into yourself. Search for the reason that bids you write; find out whether it is spreading its roots in the deepest place of your heart. Most of all, ask yourself in the most silent hour of your night: must I write? Build your life according to this necessity."
    ]
  }
};

const BookComponent = ({ book, onSelect }) => {
  return (
    <div className="flex flex-col items-center group relative">
      {/* Visual vertical book on shelf */}
      <motion.div
        whileHover={{ 
          y: -24, 
          rotateY: -15,
          z: 30,
          boxShadow: "0 25px 30px -10px rgba(0,0,0,0.6)"
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={onSelect}
        className="w-[120px] h-[180px] md:w-[140px] md:h-[210px] rounded-r-md cursor-pointer relative shadow-lg origin-left flex items-stretch border-y border-r border-white/5"
        style={{
          background: book.coverBg,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
      >
        {/* Book spine cloth texture and shadow overlay */}
        <div className="w-[12px] md:w-[15px] bg-black/35 border-r border-white/10 shrink-0 shadow-inner flex flex-col items-center py-4 text-[7px] font-mono text-brand-cream/40 uppercase tracking-widest writing-mode-vertical">
          {/* Spine design */}
        </div>

        {/* Book cover text */}
        <div className="flex-1 flex flex-col justify-between p-3 select-none">
          <div className="border border-brand-cream/15 p-1 rounded-sm flex-1 flex flex-col justify-between">
            <span className="text-[7px] font-sans tracking-widest text-brand-muted group-hover:text-brand-cream transition-colors uppercase block">
              {book.author}
            </span>
            <h4 className="text-sm md:text-base font-serif text-brand-cream text-center font-semibold leading-tight my-auto px-1">
              {book.title}
            </h4>
            <div className="w-4 h-[1px] bg-brand-earth/30 mx-auto" />
          </div>
        </div>
      </motion.div>

      {/* Book details appearing on shelf below book on hover */}
      <div className="absolute top-[200px] md:top-[230px] w-[260px] bg-brand-surface/95 border border-brand-surface-light/60 p-4 rounded-md shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-30 backdrop-blur-md">
        <h4 className="text-sm font-serif font-bold text-brand-cream">{book.title}</h4>
        <span className="text-[10px] font-sans text-brand-earth uppercase tracking-wider">{book.author}</span>
        <p className="text-[11px] text-brand-muted mt-2 leading-relaxed font-light">{book.curatorNote}</p>
        <div className="w-full h-[1px] bg-brand-surface-light/45 my-2.5" />
        <span className="text-[10px] italic font-serif text-brand-cream/70 block mb-3">"{book.whyFits}"</span>
        <button
          onClick={onSelect}
          className="w-full py-1.5 bg-brand-surface-light border border-brand-earth/20 hover:border-brand-earth text-brand-text text-[9px] tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
        >
          <BookOpen className="w-3 h-3 text-brand-earth" />
          Open Book
        </button>
      </div>
    </div>
  );
};

const Station07_Bookshelf = () => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [readerPage, setReaderPage] = useState(0);

  const selectedBook = booksData.find(b => b.id === selectedBookId);
  const excerpt = selectedBook ? EXCERPTS[selectedBook.id] : null;

  const handleOpenBook = (id) => {
    setSelectedBookId(id);
    setReaderPage(0);
  };

  const handleCloseReader = () => {
    setSelectedBookId(null);
  };

  return (
    <StationWrapper
      id="bookshelf"
      stationNumber="07"
      title="The Bookshelf"
      subtitle="Curated companions for the shelf by your desk"
    >
      <div className="max-w-4xl w-full mx-auto relative select-none">
        {/* Bookshelf wooden surface layout */}
        <div className="flex flex-col items-center w-full relative pt-12 pb-20">
          
          {/* Standing Books Row */}
          <div className="flex justify-center gap-4 md:gap-8 items-end relative z-10 w-full max-w-lg mx-auto">
            {booksData.map((book) => (
              <BookComponent
                key={book.id}
                book={book}
                onSelect={() => handleOpenBook(book.id)}
              />
            ))}
          </div>

          {/* Wooden Shelf Graphic */}
          <div className="w-full h-4 bg-gradient-to-r from-[#1c1d22] via-[#2a2c33] to-[#1c1d22] border-t border-white/5 rounded-sm shadow-2xl relative mt-[-2px] z-0">
            {/* Front lip shadow */}
            <div className="absolute top-4 left-0 w-full h-1 bg-black/60" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10" />
          </div>
        </div>

        {/* Curated summary message */}
        <p className="text-brand-muted text-xs font-light leading-relaxed text-center max-w-sm mx-auto mt-6">
          A small shelf of literature that shares the spirit of Dehradun or provides comfort during transitions. Hover and select to open a volume.
        </p>

        {/* Premium Reading Desk Modal Overlay */}
        <AnimatePresence>
          {selectedBookId && excerpt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-bg/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={handleCloseReader}
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-2xl bg-[#f5f3e9] border-8 border-[#e7e3d1] rounded-lg shadow-2xl overflow-hidden text-black min-h-[480px] flex flex-col justify-between p-8 relative"
                onClick={(e) => e.stopPropagation()} // stop click bubbling
              >
                {/* Paper texture overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                  }}
                />

                {/* Close Button */}
                <button
                  onClick={handleCloseReader}
                  className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition-colors p-1.5 rounded-full hover:bg-stone-200 cursor-pointer"
                  aria-label="Close reader"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Typeset Book Metadata */}
                <div className="border-b border-stone-300 pb-4 text-center select-none">
                  <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-stone-500 uppercase block mb-1">
                    THE BOOKSHELF • PREVIEW
                  </span>
                  <h3 className="font-serif text-lg text-stone-850 font-semibold italic">{excerpt.title}</h3>
                  <span className="text-xs text-stone-600 font-medium">by {excerpt.author}</span>
                </div>

                {/* Typeset Excerpt Page Content */}
                <div className="flex-1 my-8 flex flex-col justify-center max-w-md mx-auto">
                  <motion.p
                    key={readerPage}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif text-[#2a2723] text-sm md:text-base leading-relaxed text-justify whitespace-pre-line"
                  >
                    {excerpt.pages[readerPage]}
                  </motion.p>
                </div>

                {/* Page Navigation Controls */}
                <div className="border-t border-stone-300 pt-4 flex items-center justify-between text-xs text-stone-600 font-sans select-none">
                  <button
                    onClick={() => setReaderPage(Math.max(0, readerPage - 1))}
                    disabled={readerPage === 0}
                    className="flex items-center gap-1 hover:text-stone-800 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <span className="font-medium font-serif">
                    Page {readerPage + 1} of {excerpt.pages.length}
                  </span>

                  <button
                    onClick={() => setReaderPage(Math.min(excerpt.pages.length - 1, readerPage + 1))}
                    disabled={readerPage === excerpt.pages.length - 1}
                    className="flex items-center gap-1 hover:text-stone-800 disabled:opacity-30 cursor-pointer"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StationWrapper>
  );
};

export default Station07_Bookshelf;
