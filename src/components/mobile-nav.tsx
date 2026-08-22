"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MegaMenuItem } from "@/components/mega-menu";
import { headerMenus } from "@/lib/nav";

export function MobileNav() {
  const pathname = usePathname();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedMenu = headerMenus.find((menu) => menu.id === selectedId);

  return (
    <div
      id="mobile-nav"
      className="min-h-0 overflow-y-auto border-t border-mist/10 px-4 py-4 lg:hidden"
    >
      <nav aria-label="Mobile">
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              href="/"
              className={`block rounded-lg px-3 py-2.5 text-base text-mist ${
                selectedId === null && pathname === "/"
                  ? "bg-mist/10"
                  : "hover:bg-mist/10"
              }`}
            >
              Home
            </Link>
          </li>
          {headerMenus.map((menu) => {
            const selected = selectedId === menu.id;

            return (
              <li key={menu.id}>
                <button
                  type="button"
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-base text-mist ${
                    selected ? "bg-mist/10" : "hover:bg-mist/10"
                  }`}
                  aria-expanded={selected}
                  aria-controls={`mobile-section-${menu.id}`}
                  onClick={() => setSelectedId(menu.id)}
                >
                  {menu.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {selectedMenu ? (
        <div
          id={`mobile-section-${selectedMenu.id}`}
          className="mt-4 border-t border-mist/10 pt-4"
        >
          <p className="px-3 text-sm font-bold text-mist">{selectedMenu.label}</p>
          <ul className="mt-2 flex flex-col">
            {selectedMenu.items.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <MegaMenuItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
