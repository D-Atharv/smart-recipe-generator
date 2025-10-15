"use client";

import React from "react";
import Link from "next/link";
import { ChefHat, Menu, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";

function NavLinks({
  isMobile,
  onLinkClick,
}: {
  isMobile?: boolean;
  onLinkClick?: () => void;
}) {
  const linkClass = isMobile
    ? "text-lg font-medium text-foreground hover:text-primary transition-colors"
    : "text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105";

  const links = [
    { href: "/snap", label: "Scan" },
    {
      href: "/recommendations",
      label: "Get AI Recipe",
      icon: <Sparkles className="h-4 w-4 mr-1 text-primary" />,
    },
    { href: "/recipes", label: "My Recipes" },
    { href: "/explore", label: "Explore" },
    {
      href: "/for-you",
      label: "For You",
      icon: <User className="h-4 w-4 mr-1 text-primary" />,
    },
    { href: "/favorites", label: "Favorites" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className={
        isMobile
          ? "flex flex-col gap-6"
          : "hidden md:flex md:items-center md:gap-6"
      }
    >
      {links.map(({ href, label, icon }) => (
        <Link
          key={href}
          href={href}
          className={`${linkClass} flex items-center`}
          onClick={onLinkClick}
        >
          {icon && icon}
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/30 shadow-sm">
      <div className="container flex h-14 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ChefHat className="h-6 w-6 text-primary fill-primary" />
          </motion.div>
          <span className="font-bold font-headline text-lg tracking-tight group-hover:text-primary transition-colors">
            Recipe Snap
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavLinks />

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="pr-0 w-[80%] sm:w-[60%] bg-background/95 backdrop-blur-lg border-r border-border/30"
            >
              <VisuallyHidden>
                <h2>Mobile Navigation Menu</h2>
              </VisuallyHidden>

              <div className="flex flex-col h-full p-6">
                <Link
                  href="/"
                  className="mb-8 flex items-center space-x-2"
                  onClick={handleLinkClick}
                >
                  <ChefHat className="h-6 w-6 text-primary fill-primary" />
                  <span className="font-bold font-headline text-lg tracking-tight">
                    Recipe Snap
                  </span>
                </Link>

                <NavLinks isMobile onLinkClick={handleLinkClick} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
