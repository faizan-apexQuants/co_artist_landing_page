"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import data from "@/data/data.json";

const typeColors: Record<string, string> = {
    musician: "from-purple-500 to-purple-600",
    dancer: "from-pink-500 to-pink-600",
    visual: "from-cyan-500 to-cyan-600",
    performer: "from-amber-500 to-amber-600",
    filmmaker: "from-emerald-500 to-emerald-600",
};

export function Artists() {
    return (
        <section id="artists" className="py-24 relative">
            {/* Section divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-muted-foreground">Featured Talent</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Our Artists
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Meet the incredible artists who bring their unique talents to our stage,
                        from chart-topping musicians to visionary visual artists.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.artists.map((artist, index) => (
                        <motion.div
                            key={artist.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="group overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:border-purple-500/50 transition-all duration-300 hover:glow-purple">
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={artist.image}
                                        alt={artist.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                        <Button size="sm" className="bg-white text-black hover:bg-white/90">
                                            View Profile
                                        </Button>
                                    </div>

                                    {artist.featured && (
                                        <div className="absolute top-3 right-3 text-2xl drop-shadow-lg">⭐</div>
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    <Badge
                                        className={`mb-2 bg-gradient-to-r ${typeColors[artist.type] || 'from-gray-500 to-gray-600'} text-white uppercase text-xs`}
                                    >
                                        {artist.type}
                                    </Badge>
                                    <h3 className="font-display text-lg font-semibold mb-1">
                                        {artist.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {artist.genre}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {artist.achievements.map((achievement) => (
                                            <Badge key={achievement} variant="outline" className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                                                {achievement}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Button variant="outline" size="lg" className="rounded-full">
                        Discover All Artists
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
