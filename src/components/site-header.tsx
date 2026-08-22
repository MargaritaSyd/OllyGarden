"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { MegaMenu } from "@/components/mega-menu";
import { MobileNav } from "@/components/mobile-nav";
import { ResourcesMegaMenu } from "@/components/resources-mega-menu";
import { headerMenus, type NavGroup } from "@/lib/nav";

export function SiteHeader() {
  const pathname = usePathname();

  return <SiteHeaderBar key={pathname} />;
}

function SiteHeaderBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeMenu = headerMenus.find((menu) => menu.id === openMenu);

  useEffect(() => {
    if (!openMenu && !mobileOpen) {
      return;
    }

    const onPointer = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu, mobileOpen]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 pb-2 sm:px-6">
      <div
        ref={panelRef}
        className={`surface-grain relative mx-auto max-w-7xl rounded-2xl border border-mist/20 bg-forest shadow-[0_8px_40px_rgba(0,40,14,0.45)] ${
          mobileOpen
            ? "flex h-auto max-h-[calc(100dvh-1.5rem)] flex-col overflow-x-hidden overflow-y-clip"
            : "overflow-hidden"
        }`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="shrink-0 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <BrandLogo className="h-5 md:h-7" height={28} />

            <nav aria-label="Primary" className="hidden flex-1 items-center justify-center lg:flex">
              <ul className="flex items-center gap-1">
                <li>
                  <Link
                    href="/"
                    className="rounded-lg px-3 py-2 text-sm text-mist/90 transition-colors hover:text-sunflower"
                  >
                    Home
                  </Link>
                </li>
                {headerMenus.map((menu) => (
                  <li key={menu.id}>
                    <MenuTrigger
                      menu={menu}
                      open={openMenu === menu.id}
                      onOpen={() => setOpenMenu(menu.id)}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href="/get-started"
              className="ml-auto inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-mist px-4 text-sm font-medium text-forest transition-colors hover:bg-sunflower"
            >
              Get Started
            </Link>

            <div className="flex basis-full md:contents lg:hidden">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-mist/25 bg-forest/60 text-mist"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => {
                  setMobileOpen((open) => !open);
                  setOpenMenu(null);
                }}
              >
                <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
                <MenuIcon open={mobileOpen} />
              </button>
            </div>
          </div>
        </div>

        {activeMenu && !mobileOpen ? (
          activeMenu.id === "resources" ? (
            <ResourcesMegaMenu />
          ) : (
            <MegaMenu menu={activeMenu} />
          )
        ) : null}

        {mobileOpen ? <MobileNav /> : null}
      </div>
    </header>
  );
}

function MenuTrigger({
  menu,
  open,
  onOpen,
}: {
  menu: NavGroup;
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
        open
          ? "border border-mist/35 bg-mist/10 text-mist"
          : "text-mist/90 hover:text-sunflower"
      }`}
      aria-expanded={open}
      aria-controls={`mega-${menu.id}`}
      aria-haspopup="true"
      onMouseEnter={onOpen}
      onFocus={onOpen}
    >
      {menu.label}
    </button>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M5 5l10 10M15 5L5 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M3 6h14M3 10h14M3 14h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
