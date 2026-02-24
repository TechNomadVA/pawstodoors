"use client";

import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact & sign up" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Owner login" },
];

export function Header() {
  return (
    <header className="border-b border-[var(--colour-border)] bg-[var(--colour-surface)]">
      <div className="container-wide flex flex-wrap items-center justify-between gap-4 py-4">
        <h1 className="text-xl font-semibold font-heading">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--colour-text)] no-underline hover:text-[var(--colour-accent)]"
          >
            <Image
              src="/logo.png"
              alt="Paws2Doors logo"
              width={40}
              height={40}
              className="rounded-full object-cover h-10 w-10"
            />
            Paws2Doors
          </Link>
        </h1>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-6 m-0 p-0 list-none">
            {nav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-medium text-[var(--colour-text)] no-underline hover:text-[var(--colour-accent)] hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
