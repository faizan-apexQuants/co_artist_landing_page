"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const floatingIcons = ["🎵", "🎨", "💃", "🎭", "🎬", "✨", "🎤", "🎸"];

const stats = [
    { number: "50+", label: "Events Hosted" },
    { number: "200+", label: "Artists Featured" },
    { number: "10K+", label: "Attendees" },
];

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        x: [0, -30, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px]"
                />

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
                    }}
                />
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
                {floatingIcons.map((icon, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 0.6,
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 4 + index * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.3
                        }}
                        className="absolute text-3xl"
                        style={{
                            top: `${15 + (index * 10) % 70}%`,
                            left: `${5 + (index * 12) % 90}%`,
                        }}
                    >
                        {icon}
                    </motion.span>
                ))}
            </div>

            {/* Hero Banner Image */}
            <div className="absolute inset-0 z-5">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-300"
                    style={{
                        backgroundImage: "url('/hero-banner.png')",
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 100%)'
                    }}
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20 text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-muted-foreground">Welcome to the Creative Revolution</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                    Where <span className="gradient-text">Artists</span> Collide
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                    A vibrant community studio bringing together musicians, dancers, visual artists,
                    performers, and creative minds. Experience unforgettable events that celebrate
                    every form of artistic expression.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                    <Link href="#events">
                        <Button size="lg" className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-90 glow-purple text-lg px-8">
                            Explore Events
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="#artists">
                        <Button size="lg" variant="outline" className="text-lg px-8">
                            Meet Our Artists
                        </Button>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-6 md:gap-10 px-8 py-6 rounded-2xl glass"
                >
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="flex items-center gap-6 md:gap-10">
                            <div className="text-center">
                                <div className="font-display text-2xl md:text-3xl font-bold gradient-text">
                                    {stat.number}
                                </div>
                                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                            {index < stats.length - 1 && (
                                <div className="w-px h-10 bg-border" />
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-2 rounded-full bg-primary"
                    />
                </motion.div>
                <span className="text-xs text-muted-foreground">Scroll to explore</span>
            </motion.div>
        </section>
    );
}
