import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const API_SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

  if (!API_SERVER_URL) {
    throw new Error("API 서버 주소가 설정되지 않았습니다.");
  }

  const url = `${API_SERVER_URL}/book/random`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`추천 도서를 불러오지 못했습니다. (${response.status})`);
  }

  const books: BookData[] = await response.json();

  return books;
}
