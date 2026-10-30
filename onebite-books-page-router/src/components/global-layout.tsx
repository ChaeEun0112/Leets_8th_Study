import type { ReactNode } from "react";
import Link from "next/link";
import style from "./global-layout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header>
        <Link href="/">ONEBITE BOOKS</Link>
      </header>

      <main>{children}</main>

      <footer>@winterlood</footer>
    </div>
  );
}
