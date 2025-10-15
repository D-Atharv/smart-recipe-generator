
'use client';

import React from 'react';
import Link from 'next/link';
import { ChefHat, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

function NavLinks({ isMobile, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) {
  const linkClass = isMobile
    ? 'text-lg font-medium text-foreground hover:text-primary transition-colors'
    : 'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground';

  return (
    <nav className={isMobile ? 'flex flex-col gap-6' : 'hidden md:flex md:items-center md:gap-4'}>
      <Link href="/snap" className={linkClass} onClick={onLinkClick}>
        Scan
      </Link>
      <Link href="/recipes" className={linkClass} onClick={onLinkClick}>
        My Recipes
      </Link>
      <Link href="/explore" className={linkClass} onClick={onLinkClick}>
        Explore
      </Link>
      <Link href="/favorites" className={linkClass} onClick={onLinkClick}>
        Favorites
      </Link>
    </nav>
  );
}

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ChefHat className="h-6 w-6 text-primary fill-primary" />
          <span className="font-bold font-headline text-lg">Recipe Snap</span>
        </Link>
        
        <NavLinks />

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost">Login</Button>
            <Button>Sign Up</Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                  <div className="flex flex-col h-full p-6">
                    <Link href="/" className="mb-8 flex items-center space-x-2" onClick={handleLinkClick}>
                       <ChefHat className="h-6 w-6 text-primary fill-primary" />
                       <span className="font-bold font-headline text-lg">Recipe Snap</span>
                    </Link>
                    <NavLinks isMobile onLinkClick={handleLinkClick}/>
                    <div className="mt-auto flex flex-col gap-4">
                       <Button variant="ghost" size="lg">Login</Button>
                       <Button size="lg">Sign Up</Button>
                    </div>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
