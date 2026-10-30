import Link from "next/link";
import { BookData } from "@/types";

type BookItemProps = BookData;

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookItemProps) {
  return (
    <Link
      href={`/book/${id}`}
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textDecoration: "none",
        color: "inherit",
        marginBottom: "16px",
      }}
    >
      <img
        src={coverImgUrl}
        alt={title}
        style={{
          width: "120px",
          height: "160px",
          objectFit: "cover",
        }}
      />

      <div>
        <h3>{title}</h3>
        <p>{subTitle}</p>
        <p>저자: {author}</p>
        <p>출판사: {publisher}</p>
      </div>
    </Link>
  );
}
