"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Camera, X } from "lucide-react";
import data from "@/data/data.json";

export function Gallery() {
    const [selectedImage, setSelectedImage] = useState<typeof data.gallery[0] | null>(null);

    const getSpanClass = (index: number) => {
        if (index === 0 || index === 4) return "md:row-span-2";
        if (index === 2 || index === 6) return "md:col-span-2";
        return "";
    };

    return (
        <section id="gallery" className="py-24 relative">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                        <Camera className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-muted-foreground">Captured Moments</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Gallery
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Relive the magic through stunning captures from our past events,
                        showcasing the energy and passion of our artistic community.
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {data.gallery.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`relative rounded-xl overflow-hidden cursor-pointer group ${getSpanClass(index)}`}
                            onClick={() => setSelectedImage(item)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <Badge className="mb-2 bg-gradient-to-r from-purple-500 to-pink-500">
                                    {item.category}
                                </Badge>
                                <h4 className="font-display text-lg font-semibold text-white">
                                    {item.title}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-4xl p-0 bg-background/95 border-border/50">
                    <DialogTitle className="sr-only">
                        {selectedImage?.title || "Gallery Image"}
                    </DialogTitle>
                    {selectedImage && (
                        <div className="relative">
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                                <Badge className="mb-2 bg-gradient-to-r from-purple-500 to-pink-500">
                                    {selectedImage.category}
                                </Badge>
                                <h3 className="font-display text-2xl font-bold">
                                    {selectedImage.title}
                                </h3>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
