# Book Assets Directory

This directory holds book-related assets for the Northbound bookshelf.

## Adding a new book

1. Place the PDF in `pdfs/`
2. Place a cover image in `covers/` (optional — the shelf uses gradient covers by default)
3. Add/update an entry in `src/data/books.json`

### books.json entry format:

```json
{
  "id": "unique-slug",
  "title": "Book Title",
  "author": "Author Name",
  "curatorNote": "Why this book matters in this context.",
  "whyFits": "How it connects to the Dehradun / college journey.",
  "pdfUrl": "/assets/books/pdfs/filename.pdf",
  "coverBg": "linear-gradient(135deg, #color1 0%, #color2 100%)",
  "accentColor": "#hex",
  "excerpt": [
    "Paragraph 1 of a short excerpt...",
    "Paragraph 2...",
    "Paragraph 3..."
  ]
}
```

The bookshelf component will render it automatically.
