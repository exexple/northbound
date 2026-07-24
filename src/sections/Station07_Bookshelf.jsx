import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import booksData from '../data/books';
import { BookOpen, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const BookComponent = memo(({ book, onSelect }) => {
  return (
    <div className="flex flex-col items-center group relative shrink-0">
      {/* Visual vertical book on shelf */}
      <motion.div
        whileHover={{ 
          y: -20, 
          rotateY: -12,
          z: 20,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => onSelect(book.id)}
        className="w-[100px] h-[155px] md:w-[120px] md:h-[180px] rounded-r-md cursor-pointer relative shadow-lg shadow-black/40 origin-left flex items-stretch border-y border-r border-white/5"
        style={{
          background: book.coverBg,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
      >
        {/* Book spine */}
        <div className="w-[10px] md:w-[12px] bg-black/30 border-r border-white/8 shrink-0 shadow-inner flex flex-col items-center justify-center">
          <div className="w-[2px] h-6 bg-white/10 rounded" />
        </div>

        {/* Book cover text */}
        <div className="flex-1 flex flex-col justify-between p-2 md:p-2.5 select-none">
          <div className="border border-brand-cream/10 p-1 rounded-sm flex-1 flex flex-col justify-between">
            <span className="text-[6px] md:text-[7px] font-sans tracking-widest text-brand-muted/60 group-hover:text-brand-cream/70 transition-colors uppercase block leading-tight">
              {book.author}
            </span>
            <h4 className="text-[10px] md:text-xs font-serif text-brand-cream text-center font-semibold leading-tight my-auto px-0.5">
              {book.title}
            </h4>
            <div className="w-4 h-[1px] bg-brand-earth/30 mx-auto" />
          </div>
        </div>

        {/* Subtle depth shadow at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-black/30 to-transparent rounded-b" />
      </motion.div>

      {/* Book details tooltip on hover */}
      <div className="absolute top-[170px] md:top-[200px] w-[240px] bg-brand-surface/95 border border-brand-surface-light/50 p-3.5 rounded-md shadow-2xl shadow-black/50 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-30 backdrop-blur-md">
        <h4 className="text-sm font-serif font-bold text-brand-cream">{book.title}</h4>
        <span className="text-[9px] font-sans text-brand-earth uppercase tracking-wider">{book.author}</span>
        <p className="text-[10px] text-brand-muted mt-1.5 leading-relaxed font-light line-clamp-2">{book.curatorNote}</p>
        <div className="w-full h-[1px] bg-brand-surface-light/40 my-2" />
        <span className="text-[9px] italic font-serif text-brand-cream/60 block mb-2.5 line-clamp-2">"{book.whyFits}"</span>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(book.id); }}
          className="w-full py-1.5 bg-brand-surface-light border border-brand-earth/20 hover:border-brand-earth text-brand-text text-[9px] tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3 h-3 text-brand-earth" />
          Open Book
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
            <div className="flex justify-center gap-3 md:gap-6 items-end relative z-10 min-w-max px-4 mx-auto" style={{ maxWidth: 'fit-content' }}>
              {booksData.map((book) => (
                <BookComponent
                  key={book.id}
                  book={book}
                  onSelect={handleOpenBook}
                />
              ))}
            </div>
          </div>

          {/* Wooden Shelf */}
          <div className="w-full max-w-2xl mx-auto h-4 bg-gradient-to-r from-[#1c1d22] via-[#252730] to-[#1c1d22] border-t border-white/5 rounded-sm shadow-2xl relative mt-[-2px] z-0">
            <div className="absolute top-4 left-0 w-full h-2 bg-black/40 blur-[2px]" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/8" />
          </div>

          {/* Second shelf row for more books if needed (empty for now, shows shelf depth) */}
          <div className="w-full max-w-xl mx-auto h-3 bg-gradient-to-r from-[#191a1f] via-[#1f2025] to-[#191a1f] border-t border-white/3 rounded-sm shadow-xl relative mt-8 z-0 opacity-40">
            <div className="absolute top-3 left-0 w-full h-1 bg-black/30 blur-[1px]" />
          </div>
        </div>

        {/* Description */}
        <p className="text-brand-muted text-xs font-light leading-relaxed text-center max-w-sm mx-auto mt-2">
          A small shelf of books for the valley. Hover to see notes, click to read an excerpt.
        </p>

        {/* PDF link hint */}
        <p className="text-brand-muted/40 text-[10px] font-mono text-center mt-2">
          {booksData.length} volumes curated
        </p>

        {/* Premium Reading Modal */}
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
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-2xl bg-[#f5f3e9] border-8 border-[#e7e3d1] rounded-lg shadow-2xl overflow-hidden text-black min-h-[460px] flex flex-col justify-between p-6 md:p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 paper-texture pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={handleCloseReader}
                  className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition-colors p-1.5 rounded-full hover:bg-stone-200 cursor-pointer z-10"
                  aria-label="Close reader"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Book Metadata */}
                <div className="border-b border-stone-300 pb-4 text-center select-none relative">
                  <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-stone-500 uppercase block mb-1">
                    THE BOOKSHELF • EXCERPT
                  </span>
                  <h3 className="font-serif text-lg text-stone-800 font-semibold italic">{selectedBook.title}</h3>
                  <span className="text-xs text-stone-600 font-medium">by {selectedBook.author}</span>
                </div>

                {/* Excerpt Content */}
                <div className="flex-1 my-6 flex flex-col justify-center max-w-md mx-auto relative">
                  {selectedBook.excerpt && selectedBook.excerpt.length > 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={readerPage}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="font-serif text-[#2a2723] text-sm md:text-base leading-relaxed text-justify whitespace-pre-line"
                      >
                        {selectedBook.excerpt[readerPage]}
                      </motion.p>
                    </AnimatePresence>
                  ) : (
                    <p className="font-serif text-stone-500 text-sm italic text-center">
                      No excerpt available yet. Check the PDF for the full text.
                    </p>
                  )}
                </div>

                {/* Navigation & PDF Link */}
                <div className="border-t border-stone-300 pt-4 flex items-center justify-between text-xs text-stone-600 font-sans select-none relative">
                  {selectedBook.excerpt && selectedBook.excerpt.length > 1 ? (
                    <>
                      <button
                        onClick={() => setReaderPage(Math.max(0, readerPage - 1))}
                        disabled={readerPage === 0}
                        className="flex items-center gap-1 hover:text-stone-800 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      
                      <span className="font-medium font-serif">
                        Page {readerPage + 1} of {selectedBook.excerpt.length}
                      </span>

                      <button
                        onClick={() => setReaderPage(Math.min(selectedBook.excerpt.length - 1, readerPage + 1))}
                        disabled={readerPage === selectedBook.excerpt.length - 1}
                        className="flex items-center gap-1 hover:text-stone-800 disabled:opacity-30 cursor-pointer"
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
                  <div className="mt-3 flex justify-center relative">
                    <a
                      href={selectedBook.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-[10px] tracking-wider uppercase font-semibold rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
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
