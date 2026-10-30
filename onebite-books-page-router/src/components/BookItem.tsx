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
        alignItems: "flex-start",
        gap: "16px",
        padding: "20px 8px",
        borderBottom: "1px solid #e5e5e5",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <img
        src={coverImgUrl}
        alt={title}
        style={{
          width: "80px",
          height: "100px",
          objectFit: "contain",
          flexShrink: 0,
        }}
      />

      <div>
        <h3 style={{ fontSize: "15px", margin: "0 0 4px" }}>{title}</h3>

        <p style={{ fontSize: "14px", margin: "0 0 4px" }}>{subTitle}</p>

        <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
          {author} | {publisher}
        </p>
      </div>
    </Link>
  );
}
