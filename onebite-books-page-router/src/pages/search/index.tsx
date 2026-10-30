import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import BookItem from "@/components/BookItem";
import fetchBooks from "@/lib/fetch-books";

type Book = Awaited<ReturnType<typeof fetchBooks>>[number];

export default function SearchPage() {
  const router = useRouter();
  const q = router.query.q;

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || typeof q !== "string") return;

    const fetchSearchBooks = async () => {
      setIsLoading(true);

      try {
        const searchBooks = await fetchBooks(q);
        setBooks(searchBooks);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchBooks();
  }, [q, router.isReady]);

  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나보세요"
        />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>

      <main
        style={{
          maxWidth: "568px",
          minHeight: "100vh",
          margin: "0 auto",
          padding: "20px 16px",
          backgroundColor: "#fff",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.08)",
          boxSizing: "border-box",
        }}
      >
        <header style={{ marginBottom: "40px" }}>
          <Link
            href="/"
            style={{
              color: "#000",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            ONEBITE BOOKS
          </Link>
        </header>

        <h2 style={{ fontSize: "20px" }}>
          &apos;{typeof q === "string" ? q : ""}&apos; 검색 결과
        </h2>

        {isLoading ? (
          <p>검색 중입니다...</p>
        ) : books.length > 0 ? (
          books.map((book) => <BookItem key={book.id} {...book} />)
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}

        <footer
          style={{
            marginTop: "100px",
            paddingBottom: "30px",
            color: "#888",
            fontSize: "14px",
          }}
        >
          @winterlood
        </footer>
      </main>
    </>
  );
}
