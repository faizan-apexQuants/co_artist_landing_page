"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import data from "@/data/data.json";

const statsConfig = [
    { key: "eventsHosted", icon: "🎪", label: "Events Hosted", suffix: "+" },
    { key: "artistsFeatured", icon: "⭐", label: "Artists Featured", suffix: "+" },
    { key: "attendees", icon: "👥", label: "Attendees", suffix: "+", divider: 1000, unit: "K" },
    { key: "artForms", icon: "🎨", label: "Art Forms", suffix: "+" },
];

function CountUp({ target, suffix, divider = 1, unit = "" }: { target: number; suffix: string; divider?: number; unit?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const displayTarget = divider > 1 ? target / divider : target;
        const duration = 2000;
        const steps = 60;
        const increment = displayTarget / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= displayTarget) {
                setCount(displayTarget);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, target, divider]);

    return (
        <span ref={ref}>
            {count}{unit}{suffix}
        </span>
    );
}

export function Stats() {
    return (
        <section className="py-16 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-cyan-500/10" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {statsConfig.map((stat, index) => (
                        <motion.div
                            key={stat.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="text-center p-6 bg-card/50 border-border/50 hover:border-purple-500/50 transition-all duration-300 hover:glow-purple">
                                <span className="text-4xl mb-3 block drop-shadow-lg">{stat.icon}</span>
                                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">
                                    <CountUp
                                        target={data.stats[stat.key as keyof typeof data.stats]}
                                        suffix={stat.suffix}
                                        divider={stat.divider}
                                        unit={stat.unit}
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
