"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { MenuItemIcon } from "@/components/menu-icons";
import type { NavGroup, NavLink } from "@/lib/nav";

export function isPlainLeftClick(event: MouseEvent) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function MegaMenu({ menu }: { menu: NavGroup }) {
  return (
    <div
      id={`mega-${menu.id}`}
      className="hidden border-t border-mist/10 px-5 py-6 lg:block"
    >
      <p className="text-sm font-bold text-mist">{menu.label}</p>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-2">
        {menu.items.map((item) => (
          <li key={`${item.href}-${item.label}`} className="min-w-0">
            <MegaMenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MegaMenuItem({ item }: { item: NavLink }) {
  const pathname = usePathname();
  const router = useRouter();
  const active = !item.hash && pathname === item.href;

  const content = (
    <>
      {item.icon ? (
        <span className="mt-0.5 shrink-0">
          <MenuItemIcon name={item.icon} />
        </span>
      ) : null}
      <span className="flex min-w-0 flex-col gap-1">
        <span
          className={`text-base font-semibold ${
            active ? "text-sunflower" : "text-mist group-hover:text-sunflower"
          }`}
        >
          {item.heading ?? item.label}
        </span>
        {item.description ? (
          <span className="text-sm font-light text-mist/55">{item.description}</span>
        ) : null}
      </span>
    </>
  );

  const className = `group flex h-full w-full flex-row items-start gap-3 rounded-xl px-4 py-4 text-left transition-colors hover:bg-mist/10 ${
    active ? "bg-mist/10" : ""
  }`;

  if (item.hash) {
    return (
      <a href={item.href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      onClick={(event) => {
        if (!isPlainLeftClick(event)) {
          return;
        }
        event.preventDefault();
        router.push(item.href);
      }}
    >
      {content}
    </Link>
  );
}
