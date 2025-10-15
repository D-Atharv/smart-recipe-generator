
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Camera, BrainCircuit, Sparkles, Star, Apple, Carrot, Pizza, Fish } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Variants for container animations (staggering)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
};

// AnimatedSection component for scroll animations
const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.section>
  );
};


function Preloader({ onLoaded }: { onLoaded: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onLoaded(), 2000); // Simulate a 2-second load time
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
            animate={{ rotate: [0, 10, -10, 0], y: [0, -15, 0]}}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
            <ChefHat className="h-16 w-16 text-primary fill-primary" />
        </motion.div>
        <h1 className="font-headline text-3xl font-bold">Recipe Snap</h1>
      </motion.div>
    </motion.div>
  );
}

function FloatingFoodIcons() {
    const icons = [
        { icon: Apple, className: 'top-[10%] left-[10%]', size: 8 },
        { icon: Carrot, className: 'top-[20%] right-[15%]', size: 8 },
        { icon: Pizza, className: 'bottom-[15%] left-[20%]', size: 8 },
        { icon: Fish, className: 'bottom-[25%] right-[25%]', size: 8 },
        { icon: Apple, className: 'top-[50%] left-[30%]', size: 6 },
        { icon: Pizza, className: 'top-[60%] right-[5%]', size: 6 },
        { icon: Carrot, className: 'bottom-[5%] left-[5%]', size: 7 },
    ];

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className={cn('absolute text-primary/20', item.className)}
                    animate={{
                        y: [0, -10, 0, 10, 0],
                        x: [0, 5, 0, -5, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5, // Random duration between 5s and 10s
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                >
                    <item.icon className={`h-${item.size} w-${item.size}`} />
                </motion.div>
            ))}
        </div>
    );
}

export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence>
      {isLoading ? (
        <Preloader onLoaded={() => setIsLoading(false)} />
      ) : (
        <motion.div 
            className="flex flex-col min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
          <main className="flex-1">
            {/* Hero Section */}
            <section className="relative w-full py-20 md:py-32 lg:py-40 grid-bg overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
              <FloatingFoodIcons />
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="container relative px-4 md:px-6 text-center space-y-6"
              >
                <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {"Snap. Cook. Enjoy.".split(" ").map((word, index) => (
                        <motion.span key={index} className="inline-block" variants={itemVariants}>
                            {word}&nbsp;
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p variants={itemVariants} className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  Transform leftover ingredients into delicious meals. Just snap a photo, and let our AI create a recipe for you. Reduce waste, save money, and discover new dishes.
                </motion.p>
                <motion.div variants={itemVariants} className="space-x-4">
                  <Link href="/snap">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                        Start Cooking Now
                        </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </section>

            {/* How It Works Section */}
            <AnimatedSection className="w-full py-20 md:py-32 bg-secondary/30">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <motion.div variants={itemVariants} className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold text-primary">How It Works</motion.div>
                  <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">From Photo to Plate in Seconds</motion.h2>
                  <motion.p variants={itemVariants} className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Our intelligent platform makes meal planning effortless and fun.
                  </motion.p>
                </div>
                <motion.div variants={containerVariants} className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                  <motion.div variants={itemVariants} whileHover={{y: -8, transition: {duration: 0.2}}}>
                    <div className="grid gap-2 text-center p-4 rounded-lg transition-all bg-card shadow-sm">
                      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="w-fit mx-auto">
                        <Camera className="h-10 w-10 mx-auto text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-bold font-headline">1. Snap Your Ingredients</h3>
                      <p className="text-sm text-muted-foreground">Take a quick photo of the food items you have on hand. No need to type anything.</p>
                    </div>
                  </motion.div>
                   <motion.div variants={itemVariants} whileHover={{y: -8, transition: {duration: 0.2}}}>
                    <div className="grid gap-2 text-center p-4 rounded-lg transition-all bg-card shadow-sm">
                       <motion.div whileHover={{ scale: 1.2, transition: { staggerChildren: 0.1 } }} className="w-fit mx-auto">
                         <BrainCircuit className="h-10 w-10 mx-auto text-primary" />
                       </motion.div>
                      <h3 className="text-xl font-bold font-headline">2. AI-Powered Recognition</h3>
                      <p className="text-sm text-muted-foreground">Our advanced vision AI instantly identifies each ingredient with remarkable accuracy.</p>
                    </div>
                  </motion.div>
                   <motion.div variants={itemVariants} whileHover={{y: -8, transition: {duration: 0.2}}}>
                    <div className="grid gap-2 text-center p-4 rounded-lg transition-all bg-card shadow-sm">
                       <motion.div whileHover={{ scale: 1.2, y: -5 }} className="w-fit mx-auto">
                        <Sparkles className="h-10 w-10 mx-auto text-primary" />
                       </motion.div>
                      <h3 className="text-xl font-bold font-headline">3. Get Instant Recipes</h3>
                      <p className="text-sm text-muted-foreground">Receive a personalized list of creative recipes you can make immediately.</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </AnimatedSection>
            
            {/* Features Section */}
            <AnimatedSection className="w-full py-20 md:py-32">
              <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
                <div className="space-y-3">
                  <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">More Than Just a Recipe Finder</motion.h2>
                  <motion.p variants={itemVariants} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    Recipe Snap is your all-in-one kitchen assistant designed to inspire creativity and sustainability.
                  </motion.p>
                </div>
                <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  <motion.div variants={itemVariants}>
                    <motion.div whileHover={{ y: -8 }} className="hover:shadow-lg transition-shadow duration-200">
                        <Card className="h-full">
                            <CardContent className="p-6 text-left space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-full"><Star className="h-6 w-6 text-primary" /></div>
                                <h3 className="text-lg font-bold font-headline">Dietary Customization</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Got dietary restrictions? Get AI-powered substitution suggestions for vegan, gluten-free, or dairy-free options.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                  </motion.div>
                   <motion.div variants={itemVariants}>
                     <motion.div whileHover={{ y: -8 }} className="hover:shadow-lg transition-shadow duration-200">
                        <Card className="h-full">
                            <CardContent className="p-6 text-left space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-full"><Sparkles className="h-6 w-6 text-primary" /></div>
                                <h3 className="text-lg font-bold font-headline">Reduce Food Waste</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Be a kitchen hero. Use what you have, save money on groceries, and contribute to a more sustainable planet.</p>
                            </CardContent>
                        </Card>
                     </motion.div>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                     <motion.div whileHover={{ y: -8 }} className="hover:shadow-lg transition-shadow duration-200">
                        <Card className="h-full">
                            <CardContent className="p-6 text-left space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-full"><ChefHat className="h-6 w-6 text-primary" /></div>
                                <h3 className="text-lg font-bold font-headline">Explore Global Cuisines</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Tired of the same old meals? Discover exciting new dishes from around the world based on the ingredients you already own.</p>
                            </CardContent>
                        </Card>
                      </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </AnimatedSection>
            
             {/* Call to Action */}
            <AnimatedSection className="w-full py-20 md:py-32 bg-primary/5">
                <div className="container text-center">
                    <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">Ready to Unlock Your Kitchen's Potential?</motion.h2>
                    <motion.p variants={itemVariants} className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4 mb-8">
                        Stop staring at your fridge and start creating amazing meals. Your next culinary adventure is just a snapshot away.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Link href="/snap">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    Get Started for Free
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </AnimatedSection>
          </main>

          {/* Footer */}
          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Recipe Snap. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Terms of Service
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Privacy
              </Link>
            </nav>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
