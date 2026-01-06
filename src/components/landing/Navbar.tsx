"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Events", href: "#events" },
    { name: "Event Heads", href: "#event-heads" },
    { name: "Artists", href: "#artists" },
    { name: "Gallery", href: "#gallery" },
    { name: "Apply", href: "#apply" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "py-5"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <span className="font-display text-xl font-bold gradient-text">
                        Co-Artist
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                            Admin
                        </Button>
                    </Link>
                    <Link href="#apply">
                        <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-90 glow-purple">
                            Join Us
                        </Button>
                    </Link>

                    {/* Mobile Menu */}
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-background/95 backdrop-blur-xl">
                            <div className="flex flex-col gap-6 mt-10">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-2xl font-medium hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link href="/admin" onClick={() => setMobileOpen(false)}>
                                    <Button variant="outline" className="w-full mt-4">
                                        Admin Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.nav>
    );
}
