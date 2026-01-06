"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Mic2, Send, CheckCircle, Sparkles } from "lucide-react";

const artistTypes = [
    { id: "musician", name: "Musician / Singer", icon: "🎵" },
    { id: "dancer", name: "Dancer / Choreographer", icon: "💃" },
    { id: "visual", name: "Visual Artist", icon: "🎨" },
    { id: "performer", name: "Theatre / Performance Artist", icon: "🎭" },
    { id: "filmmaker", name: "Filmmaker / Content Creator", icon: "🎬" },
    { id: "dj", name: "DJ / Producer", icon: "🎧" },
    { id: "other", name: "Other", icon: "✨" },
];

export function ArtistForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        artistType: "",
        genre: "",
        experience: "",
        portfolio: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would send to an API
        console.log("Artist application submitted:", formData);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                artistType: "",
                genre: "",
                experience: "",
                portfolio: "",
                message: "",
            });
        }, 5000);
    };

    return (
        <section id="apply" className="py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute -right-60 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/15 blur-[120px]" />
            <div className="absolute -left-60 top-1/3 w-[400px] h-[400px] rounded-full bg-pink-500/15 blur-[120px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <Mic2 className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-muted-foreground">Join Our Stage</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
                            Become a Co-Artist
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Are you a talented artist looking for a platform to showcase your skills?
                            Join our vibrant community and perform at our upcoming events. We welcome
                            musicians, dancers, visual artists, performers, and creative minds from all backgrounds.
                        </p>

                        {/* Benefits */}
                        <div className="space-y-4">
                            {[
                                { title: "Professional Stage", desc: "Perform on our state-of-the-art stage with full production support" },
                                { title: "Networking", desc: "Connect with fellow artists and industry professionals" },
                                { title: "Exposure", desc: "Get featured on our platform and social media channels" },
                                { title: "Paid Opportunities", desc: "Eligible artists receive performance fees" },
                            ].map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{benefit.title}</h4>
                                        <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Artist Types */}
                        <div className="mt-8">
                            <p className="text-sm text-muted-foreground mb-3">We're looking for:</p>
                            <div className="flex flex-wrap gap-2">
                                {artistTypes.slice(0, 6).map((type) => (
                                    <Badge key={type.id} variant="outline" className="py-1.5 px-3">
                                        <span className="mr-1">{type.icon}</span>
                                        {type.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-card/50 border-border/50">
                            <CardContent className="p-6 md:p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                    <h3 className="font-display text-xl font-semibold">Artist Application</h3>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Full Name *</label>
                                            <Input
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Your name"
                                                className="bg-muted/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email *</label>
                                            <Input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="your@email.com"
                                                className="bg-muted/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Phone</label>
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+1 (234) 567-890"
                                                className="bg-muted/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Artist Type *</label>
                                            <Select
                                                value={formData.artistType}
                                                onValueChange={(value) => setFormData({ ...formData, artistType: value })}
                                            >
                                                <SelectTrigger className="bg-muted/50">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {artistTypes.map((type) => (
                                                        <SelectItem key={type.id} value={type.id}>
                                                            <span className="mr-2">{type.icon}</span>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Genre / Style</label>
                                            <Input
                                                value={formData.genre}
                                                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                                placeholder="e.g., Hip Hop, Classical"
                                                className="bg-muted/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Experience (years)</label>
                                            <Input
                                                value={formData.experience}
                                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                                placeholder="e.g., 5 years"
                                                className="bg-muted/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Portfolio / Social Link</label>
                                        <Input
                                            value={formData.portfolio}
                                            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                            placeholder="https://..."
                                            className="bg-muted/50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Tell us about yourself *</label>
                                        <Textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Describe your art, achievements, and why you want to perform with us..."
                                            rows={4}
                                            className="bg-muted/50"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-90 glow-purple"
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        Submit Application
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground">
                                        We'll review your application and get back to you within 5-7 business days.
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* Success Dialog */}
            <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
                <DialogContent className="text-center">
                    <DialogHeader>
                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <DialogTitle className="text-2xl">Application Submitted!</DialogTitle>
                        <DialogDescription className="text-base">
                            Thank you for your interest in joining Co-Artist Studio. Our team will review your application and contact you soon.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </section>
    );
}
