import Link from "next/link";
import { siteConfig } from "@/lib/seo/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-emerald-100 bg-emerald-950 text-emerald-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex gap-6 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
