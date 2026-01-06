"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Users,
    Palette,
    Image,
    TrendingUp,
    ArrowUpRight,
    Plus
} from "lucide-react";
import Link from "next/link";
import data from "@/data/data.json";

const stats = [
    {
        title: "Total Events",
        value: data.events.length,
        change: "+2",
        trend: "up",
        icon: Calendar,
        href: "/admin/events",
        color: "text-purple-400"
    },
    {
        title: "Artists",
        value: data.artists.length,
        change: "+5",
        trend: "up",
        icon: Palette,
        href: "/admin/artists",
        color: "text-pink-400"
    },
    {
        title: "Event Heads",
        value: data.eventHeads.length,
        change: "0",
        trend: "neutral",
        icon: Users,
        href: "/admin/event-heads",
        color: "text-cyan-400"
    },
    {
        title: "Gallery Items",
        value: data.gallery.length,
        change: "+3",
        trend: "up",
        icon: Image,
        href: "/admin/gallery",
        color: "text-amber-400"
    },
];

const recentEvents = data.events.slice(0, 4);
const featuredArtists = data.artists.filter(a => a.featured).slice(0, 4);

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold gradient-text">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/events">
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Event
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={stat.href}>
                            <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </CardTitle>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-end justify-between">
                                        <span className="text-3xl font-bold">{stat.value}</span>
                                        <Badge
                                            variant="secondary"
                                            className={`${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-muted'}`}
                                        >
                                            {stat.change}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                        <span>View all</span>
                                        <ArrowUpRight className="w-3 h-3" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Events */}
                <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Recent Events</CardTitle>
                        <Link href="/admin/events">
                            <Button variant="ghost" size="sm">View All</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentEvents.map((event) => (
                            <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium truncate">{event.title}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                                <Badge variant="outline" className="capitalize shrink-0">
                                    {event.category}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Featured Artists */}
                <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Featured Artists</CardTitle>
                        <Link href="/admin/artists">
                            <Button variant="ghost" size="sm">View All</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {featuredArtists.map((artist) => (
                            <div key={artist.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium truncate">{artist.name}</h4>
                                    <p className="text-sm text-muted-foreground truncate">{artist.genre}</p>
                                </div>
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 shrink-0">
                                    Featured
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
