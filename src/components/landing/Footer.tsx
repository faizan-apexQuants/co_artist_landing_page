"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Instagram,
    Twitter,
    Youtube,
    Music2,
    MapPin,
    Mail,
    Phone,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
    { name: "Events", href: "#events" },
    { name: "Artists", href: "#artists" },
    { name: "Gallery", href: "#gallery" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
];

const artForms = [
    "Music & Live Performances",
    "Dance & Choreography",
    "Visual Arts & Exhibitions",
    "Theatre & Drama",
    "Film & Media",
    "Poetry & Literature",
];

export function Footer() {
    // Use static year to avoid hydration mismatch
    const currentYear = 2026;

    return (
        <footer id="contact" className="pt-24 pb-8 relative">
            {/* Section divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">C</span>
                            </div>
                            <span className="font-display text-xl font-bold gradient-text">
                                Co-Artist
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                            Where creative minds unite. A vibrant community studio celebrating
                            every form of artistic expression.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="p-2 rounded-full glass hover:bg-purple-500/20 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full glass hover:bg-pink-500/20 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full glass hover:bg-red-500/20 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full glass hover:bg-cyan-500/20 transition-colors">
                                <Music2 className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-display font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Art Forms */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-display font-semibold mb-4">Art Forms</h4>
                        <ul className="space-y-3">
                            {artForms.map((form) => (
                                <li key={form} className="text-muted-foreground text-sm">
                                    {form}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact & Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="font-display font-semibold mb-4">Get In Touch</h4>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <span>123 Art District, Creative City</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-pink-400" />
                                <a href="mailto:hello@coartist.studio" className="text-muted-foreground hover:text-primary transition-colors">
                                    hello@coartist.studio
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-cyan-400" />
                                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </li>
                        </ul>

                        <h5 className="text-sm font-semibold mb-3">Stay Updated</h5>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="bg-muted/50"
                            />
                            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 shrink-0">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </form>
                    </motion.div>
                </div>

                <Separator className="mb-8" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} Co-Artist Studio. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
