"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Star } from "lucide-react";
import data from "@/data/data.json";

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % data.testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="testimonials" className="py-24 relative">
            {/* Section divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                        <MessageSquare className="w-4 h-4 text-pink-400" />
                        <span className="text-sm text-muted-foreground">Artist Stories</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
                        What They Say
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Hear from the incredible artists who have been part of our journey
                        and found their stage at Co-Artist Studio.
                    </p>
                </motion.div>

                {/* Testimonials Carousel */}
                <div className="max-w-3xl mx-auto">
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {data.testimonials.map((testimonial, index) => (
                                index === activeIndex && (
                                    <motion.div
                                        key={testimonial.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0"
                                    >
                                        <Card className="p-8 md:p-10 text-center bg-card/50 backdrop-blur border-border/50">
                                            {/* Quote Icon */}
                                            <div className="mb-6">
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto opacity-30">
                                                    <path d="M12 24C12 17.37 17.37 12 24 12V8C15.16 8 8 15.16 8 24V40H24V24H12ZM36 24C36 17.37 41.37 12 48 12V8C39.16 8 32 15.16 32 24V40H48V24H36Z" fill="url(#quote-grad)" />
                                                    <defs>
                                                        <linearGradient id="quote-grad" x1="8" y1="8" x2="48" y2="40">
                                                            <stop stopColor="#9333EA" />
                                                            <stop offset="1" stopColor="#EC4899" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex justify-center gap-1 mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>

                                            {/* Quote */}
                                            <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed mb-8">
                                                "{testimonial.quote}"
                                            </blockquote>

                                            {/* Author */}
                                            <div className="flex items-center justify-center gap-4">
                                                <Avatar className="w-14 h-14 border-2 border-primary">
                                                    <AvatarImage src={testimonial.image} alt={testimonial.author} />
                                                    <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-left">
                                                    <div className="font-semibold">{testimonial.author}</div>
                                                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-3 mt-8">
                        {data.testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125 glow-purple"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
