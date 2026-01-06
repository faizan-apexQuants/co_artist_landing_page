"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Search, Image as ImageIcon } from "lucide-react";
import initialData from "@/data/data.json";

type GalleryItem = typeof initialData.gallery[0];

const categories = ["Music", "Dance", "Theatre", "Visual Arts", "Film"];

export default function GalleryPage() {
    const [gallery, setGallery] = useState(initialData.gallery);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        image: "",
        type: "image",
    });

    const filteredGallery = gallery.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openCreateDialog = () => {
        setSelectedItem(null);
        setFormData({ title: "", category: "", image: "", type: "image" });
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        const newItem: GalleryItem = {
            id: String(Date.now()),
            ...formData,
        };
        setGallery([...gallery, newItem]);
        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (selectedItem) {
            setGallery(gallery.filter(item => item.id !== selectedItem.id));
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold gradient-text">Gallery</h1>
                    <p className="text-muted-foreground">Manage your event photos and media.</p>
                </div>
                <Button onClick={openCreateDialog} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                </Button>
            </div>

            <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search gallery..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGallery.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50 group">
                            <div className="relative aspect-square">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => { setSelectedItem(item); setIsDeleteDialogOpen(true); }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-3">
                                <h4 className="font-medium text-sm truncate">{item.title}</h4>
                                <Badge variant="outline" className="mt-1 text-xs">{item.category}</Badge>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filteredGallery.length === 0 && (
                <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="py-12 text-center">
                        <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-medium text-lg mb-2">No images yet</h3>
                        <p className="text-muted-foreground mb-4">Start adding images to your gallery.</p>
                        <Button onClick={openCreateDialog}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Image
                        </Button>
                    </CardContent>
                </Card>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Image</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Image title" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Category</label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                        </div>
                        {formData.image && (
                            <div className="rounded-lg overflow-hidden border border-border">
                                <img src={formData.image} alt="Preview" className="w-full h-40 object-cover" />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                            Add Image
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Delete Image</DialogTitle></DialogHeader>
                    <p className="text-muted-foreground">Are you sure you want to delete "{selectedItem?.title}"?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
