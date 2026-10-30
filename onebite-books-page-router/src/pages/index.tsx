import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import BookItem from "@/components/BookItem";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export async function getStaticProps() {
  const allBooks = await fetchBooks();
  const randomBooks = await fetchRandomBooks();

  return {
    props: {
      allBooks,
      randomBooks,
    },
    revalidate: 3,
  };
}

export default function Home({
  allBooks,
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const q = formData.get("q")?.toString().trim();

    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:title" content="한입북스" />
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
        <header style={{ marginBottom: "26px" }}>
          <strong>ONEBITE BOOKS</strong>
        </header>

        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "36px",
          }}
        >
          <input
            type="search"
            name="q"
            placeholder="검색어를 입력하세요"
            style={{
              flex: 1,
              minWidth: 0,
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "72px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            검색
          </button>
        </form>

        <section style={{ marginBottom: "36px" }}>
          <h3>지금 추천하는 도서</h3>

          {randomBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>

        <section>
          <h3>등록된 모든 도서</h3>

          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>

        <footer
          style={{
            marginTop: "100px",
            paddingBottom: "30px",
            color: "#888",
          }}
        >
          @winterlood
        </footer>
      </main>
    </>
  );
}
