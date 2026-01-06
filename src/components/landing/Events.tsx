"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";
import data from "@/data/data.json";

const categories = [
    { id: "all", name: "All Events", icon: "✨" },
    { id: "music", name: "Music", icon: "🎵" },
    { id: "dance", name: "Dance", icon: "💃" },
    { id: "theatre", name: "Theatre", icon: "🎭" },
    { id: "visual", name: "Visual Arts", icon: "🎨" },
    { id: "film", name: "Film & Media", icon: "🎬" },
];

export function Events() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredEvents = activeCategory === "all"
        ? data.events
        : data.events.filter((event) => event.category === activeCategory);

    return (
        <section id="events" className="py-24 relative">
            {/* Section divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-muted-foreground">Upcoming Events</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Experience the Art
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        From electrifying music performances to captivating visual art exhibitions,
                        discover events that ignite your creative spirit.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={activeCategory === cat.id ? "default" : "outline"}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`rounded-full ${activeCategory === cat.id
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 glow-purple"
                                    : ""
                                }`}
                        >
                            <span className="mr-2">{cat.icon}</span>
                            {cat.name}
                        </Button>
                    ))}
                </motion.div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="group overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:border-purple-500/50 transition-all duration-300 hover:glow-purple">
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                                    {event.featured && (
                                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500">
                                            Featured
                                        </Badge>
                                    )}

                                    <Badge variant="secondary" className="absolute bottom-3 left-3 capitalize">
                                        {categories.find(c => c.id === event.category)?.icon} {event.category}
                                    </Badge>
                                </div>

                                <CardContent className="p-5">
                                    <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4 text-purple-400" />
                                            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="w-4 h-4 text-pink-400" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4 text-cyan-400" />
                                            <span>{event.venue}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {event.artists.slice(0, 2).map((artist) => (
                                            <Badge key={artist} variant="outline" className="text-xs">
                                                {artist}
                                            </Badge>
                                        ))}
                                        {event.artists.length > 2 && (
                                            <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-400">
                                                +{event.artists.length - 2} more
                                            </Badge>
                                        )}
                                    </div>

                                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                                        Get Tickets
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
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
                        View All Events
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
