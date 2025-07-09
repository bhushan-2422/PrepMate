"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  const linkClasses = (href) =>
    `hover:text-violet-500 transition ${
      pathname === href ? "text-violet-500 font-semibold" : "text-white"
    }`;

  return (
    <nav className="flex gap-4">
      <Link href="/" className={linkClasses("/")}>
        Home
      </Link>
      <Link href="/all-interviews" className={linkClasses("/all-interviews")}>
        All Interviews
      </Link>
      <Link href="/services/about" className={linkClasses("/services/about")}>
        About
      </Link>
      <Link
        href="/services/give-feedback"
        className={linkClasses("/services/give-feedback")}
      >
        Feedback
      </Link>
    </nav>
  );
};

export default NavLinks;
