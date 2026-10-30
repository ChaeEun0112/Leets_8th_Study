import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

import fetchBooks from "@/lib/fetch-books";
import fetchOneBook from "@/lib/fetch-one-book";

export async function getStaticPaths() {
  const books = await fetchBooks();

  return {
    paths: books.map((book) => ({
      params: {
        id: String(book.id),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params!.id;

  const book = await fetchOneBook(Number(id));

  return {
    props: {
      book,
    },
  };
}

export default function BookDetailPage({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) {
    return (
      <>
        <Head>
          <title>한입북스 - 도서 정보</title>
          <meta property="og:title" content="한입북스 - 도서 정보" />
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
          <h2>오류가 발생했습니다.</h2>
          <p>도서 정보를 불러오지 못했습니다. 다시 시도해주세요.</p>
        </main>
      </>
    );
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={coverImgUrl} />
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
        <header style={{ marginBottom: "24px" }}>
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

        <img
          src={coverImgUrl}
          alt={title}
          style={{
            width: "100%",
            maxHeight: "350px",
            objectFit: "contain",
            marginBottom: "12px",
          }}
        />

        <h1 style={{ fontSize: "20px", margin: "0 0 8px" }}>{title}</h1>

        <p style={{ color: "#888", margin: "0 0 8px" }}>{subTitle}</p>

        <p style={{ color: "#888", margin: "0 0 12px" }}>
          {author} | {publisher}
        </p>

        <section
          style={{
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
            lineHeight: 1.7,
          }}
        >
          {description}
        </section>

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
