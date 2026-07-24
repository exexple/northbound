import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import booksData from '../data/books';
import { BookOpen, X, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';

const BookComponent = memo(({ book, onSelect }) => {
  return (
    <div className="flex flex-col items-center group relative shrink-0">
      {/* Visual vertical book on shelf */}
      <motion.div
        whileHover={{ 
          y: -22, 
          rotateY: -14,
          z: 30,
          scale: 1.03
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        onClick={() => onSelect(book.id)}
        className="w-[105px] h-[160px] md:w-[125px] md:h-[190px] rounded-r-md cursor-pointer relative shadow-2xl shadow-black/60 origin-left flex items-stretch border-y border-r border-white/10"
        style={{
          background: book.coverBg,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
      >
        {/* Book spine line & shadow */}
        <div className="w-[12px] md:w-[14px] bg-black/40 border-r border-white/10 shrink-0 shadow-inner flex flex-col items-center justify-between py-2">
          <div className="w-[2px] h-5 bg-white/20 rounded" />
          <div className="w-[2px] h-5 bg-white/20 rounded" />
        </div>

        {/* Book cover text */}
        <div className="flex-1 flex flex-col justify-between p-2.5 md:p-3 select-none">
          <div className="border border-brand-cream/15 p-1.5 rounded-sm flex-1 flex flex-col justify-between bg-black/10">
            <span className="text-[6px] md:text-[7px] font-sans tracking-widest text-brand-cream/60 group-hover:text-brand-cream transition-colors uppercase block leading-tight truncate">
              {book.author}
            </span>
            <h4 className="text-[10px] md:text-xs font-serif text-brand-cream text-center font-semibold leading-tight my-auto px-0.5 group-hover:scale-105 transition-transform">
              {book.title}
            </h4>
            <div className="w-5 h-[1px] bg-brand-earth/40 mx-auto" />
          </div>
        </div>

        {/* Subtle depth shadow at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-t from-black/40 to-transparent rounded-b" />
      </motion.div>

      {/* Book details tooltip on hover */}
      <div className="absolute top-[175px] md:top-[210px] w-[250px] glass-panel border border-brand-earth/30 p-4 rounded-xl shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-40">
        <h4 className="text-sm font-serif font-bold text-brand-cream leading-tight">{book.title}</h4>
        <span className="text-[9px] font-sans font-semibold text-brand-earth uppercase tracking-wider block mt-0.5">{book.author}</span>
        <p className="text-[10px] text-brand-muted mt-2 leading-relaxed font-light line-clamp-2">{book.curatorNote}</p>
        <div className="w-full h-[1px] bg-brand-surface-light/50 my-2.5" />
        <span className="text-[9px] italic font-serif text-brand-cream/70 block mb-3 leading-normal line-clamp-2">"{book.whyFits}"</span>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(book.id); }}
          className="w-full py-1.5 bg-brand-surface-light hover:bg-brand-earth hover:text-brand-bg border border-brand-earth/30 text-brand-cream text-[9px] tracking-wider uppercase font-bold rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
        >
          <BookOpen className="w-3 h-3 text-brand-earth fill-current" />
          Open Book Excerpt
        </button>
      </div>
    </div>
  );
});

const Station07_Bookshelf = () => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [readerPage, setReaderPage] = useState(0);

  const selectedBook = booksData.find(b => b.id === selectedBookId);

  const handleOpenBook = useCallback((id) => {
    setSelectedBookId(id);
    setReaderPage(0);
  }, []);

  const handleCloseReader = useCallback(() => {
    setSelectedBookId(null);
  }, []);

  return (
    <StationWrapper
      id="bookshelf"
      stationNumber="07"
      title="The Bookshelf"
      subtitle="Curated companions for the shelf by your desk"
    >
      <div className="max-w-4xl w-full mx-auto relative select-none">
        {/* Bookshelf layout */}
        <div className="flex flex-col items-center w-full relative pt-8 pb-16">
          
          {/* Books row — horizontally scrollable on mobile */}
          <div className="w-full overflow-x-auto pb-4 -mb-4">
            <div className="flex justify-center gap-4 md:gap-7 items-end relative z-10 min-w-max px-4 mx-auto" style={{ maxWidth: 'fit-content' }}>
              {booksData.map((book) => (
                <BookComponent
                  key={book.id}
                  book={book}
                  onSelect={handleOpenBook}
                />
              ))}
            </div>
          </div>

          {/* Wooden Shelf structure */}
          <div className="w-full max-w-2xl mx-auto h-5 bg-gradient-to-r from-[#1c1d23] via-[#2a2c35] to-[#1c1d23] border-t border-white/10 rounded-sm shadow-2xl relative mt-[-2px] z-0">
            <div className="absolute top-5 left-0 w-full h-3 bg-black/50 blur-[3px]" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/60" />
          </div>

          {/* Second lower shadow shelf line for perspective depth */}
          <div className="w-full max-w-xl mx-auto h-3.5 bg-gradient-to-r from-[#17181c] via-[#202127] to-[#17181c] border-t border-white/5 rounded-sm shadow-xl relative mt-10 z-0 opacity-40">
            <div className="absolute top-3.5 left-0 w-full h-2 bg-black/40 blur-[2px]" />
          </div>
        </div>

        {/* Section Notes */}
        <p className="text-brand-muted text-xs font-light leading-relaxed text-center max-w-sm mx-auto mt-2">
          A small shelf of books for the valley. Hover to read curator notes, click to open an excerpt.
        </p>

        {/* Premium Reading Room Modal */}
        <AnimatePresence>
          {selectedBookId && selectedBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-bg/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={handleCloseReader}
            >
              <motion.div
                initial={{ scale: 0.93, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.93, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-full max-w-2xl bg-[#f4f2e6] border-8 border-[#e4dfcd] rounded-xl shadow-2xl overflow-hidden text-black min-h-[480px] flex flex-col justify-between p-6 md:p-9 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 paper-texture pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={handleCloseReader}
                  className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 transition-colors p-1.5 rounded-full hover:bg-stone-200 cursor-pointer z-20"
                  aria-label="Close reader"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Book Metadata */}
                <div className="border-b border-stone-300 pb-4 text-center select-none relative z-10">
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-stone-500 uppercase block mb-1">
                    THE BOOKSHELF • EXCERPT
                  </span>
                  <h3 className="font-serif text-xl text-stone-900 font-semibold italic">{selectedBook.title}</h3>
                  <span className="text-xs text-stone-600 font-medium">by {selectedBook.author}</span>
                </div>

                {/* Excerpt Content */}
                <div className="flex-1 my-6 flex flex-col justify-center max-w-md mx-auto relative z-10">
                  {selectedBook.excerpt && selectedBook.excerpt.length > 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={readerPage}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.3 }}
                        className="font-serif text-[#23201c] text-sm md:text-base leading-relaxed text-justify whitespace-pre-line"
                      >
                        {selectedBook.excerpt[readerPage]}
                      </motion.p>
                    </AnimatePresence>
                  ) : (
                    <p className="font-serif text-stone-500 text-sm italic text-center">
                      No excerpt available yet. Check the PDF link for the full text.
                    </p>
                  )}
                </div>

                {/* Navigation & PDF Link */}
                <div className="border-t border-stone-300 pt-4 flex items-center justify-between text-xs text-stone-700 font-sans select-none relative z-10">
                  {selectedBook.excerpt && selectedBook.excerpt.length > 1 ? (
                    <>
                      <button
                        onClick={() => setReaderPage(Math.max(0, readerPage - 1))}
                        disabled={readerPage === 0}
                        className="flex items-center gap-1 font-semibold hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      
                      <span className="font-medium font-serif text-stone-600">
                        Page {readerPage + 1} of {selectedBook.excerpt.length}
                      </span>

                      <button
                        onClick={() => setReaderPage(Math.min(selectedBook.excerpt.length - 1, readerPage + 1))}
                        disabled={readerPage === selectedBook.excerpt.length - 1}
                        className="flex items-center gap-1 font-semibold hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Open PDF button */}
                {selectedBook.pdfUrl && (
                  <div className="mt-4 flex justify-center relative z-10">
                    <a
                      href={selectedBook.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-[10px] tracking-widest uppercase font-bold rounded-md transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Full PDF
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StationWrapper>
  );
};

export default Station07_Bookshelf;

