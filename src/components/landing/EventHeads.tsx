"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Instagram, Twitter, Linkedin } from "lucide-react";
import data from "@/data/data.json";

export function EventHeads() {
    return (
        <section id="event-heads" className="py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
            <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-muted-foreground">Meet The Team</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Event Heads
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        The visionary curators behind our extraordinary events,
                        each bringing unique expertise to create unforgettable experiences.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.eventHeads.map((head, index) => (
                        <motion.div
                            key={head.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="group text-center p-6 bg-card/50 border-border/50 hover:border-purple-500/50 transition-all duration-300 hover:glow-purple">
                                {/* Avatar */}
                                <div className="relative mb-4 mx-auto w-fit">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                                    <Avatar className="w-24 h-24 border-4 border-transparent bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 p-0.5 relative">
                                        <AvatarImage src={head.image} alt={head.name} className="rounded-full" />
                                        <AvatarFallback>{head.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                </div>

                                <CardContent className="p-0">
                                    <h3 className="font-display text-xl font-semibold mb-1">
                                        {head.name}
                                    </h3>
                                    <p className="text-sm font-medium gradient-text mb-1">
                                        {head.role}
                                    </p>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        {head.specialty}
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {head.bio}
                                    </p>

                                    {/* Social Links */}
                                    <div className="flex justify-center gap-3">
                                        <a href={head.social.instagram} className="p-2 rounded-full glass hover:bg-purple-500/20 transition-colors">
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                        <a href={head.social.twitter} className="p-2 rounded-full glass hover:bg-pink-500/20 transition-colors">
                                            <Twitter className="w-4 h-4" />
                                        </a>
                                        <a href={head.social.linkedin} className="p-2 rounded-full glass hover:bg-cyan-500/20 transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
