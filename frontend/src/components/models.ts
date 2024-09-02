export interface Book {
  id: number;
  title: string;
}

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export interface Author {
  id: number;
  name: string;
}

export interface AuthorState {
  authors: Author[];
  loading: boolean;
  error: string | null;
}

export interface AuthorBook{
  book_id: number;
  author_ir: number;
}

export interface AuthorBookState{
  author_book: AuthorBook[];
  loading: boolean;
  error: string | null;
}