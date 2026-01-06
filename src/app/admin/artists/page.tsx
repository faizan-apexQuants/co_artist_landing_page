"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";
import initialData from "@/data/data.json";

type Artist = typeof initialData.artists[0];

const artistTypes = [
    { id: "musician", name: "Musician" },
    { id: "dancer", name: "Dancer" },
    { id: "visual", name: "Visual Artist" },
    { id: "performer", name: "Performer" },
    { id: "filmmaker", name: "Filmmaker" },
];

export default function ArtistsPage() {
    const [artists, setArtists] = useState(initialData.artists);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        genre: "",
        type: "",
        bio: "",
        achievements: "",
        image: "",
        featured: false,
    });

    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openCreateDialog = () => {
        setSelectedArtist(null);
        setFormData({ name: "", genre: "", type: "", bio: "", achievements: "", image: "", featured: false });
        setIsDialogOpen(true);
    };

    const openEditDialog = (artist: Artist) => {
        setSelectedArtist(artist);
        setFormData({
            name: artist.name,
            genre: artist.genre,
            type: artist.type,
            bio: artist.bio,
            achievements: artist.achievements.join(", "),
            image: artist.image,
            featured: artist.featured,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        if (selectedArtist) {
            setArtists(artists.map(a =>
                a.id === selectedArtist.id
                    ? { ...a, ...formData, achievements: formData.achievements.split(",").map(s => s.trim()) }
                    : a
            ));
        } else {
            const newArtist: Artist = {
                id: String(Date.now()),
                ...formData,
                achievements: formData.achievements.split(",").map(s => s.trim()),
                social: { instagram: "#", twitter: "#" },
            };
            setArtists([...artists, newArtist]);
        }
        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (selectedArtist) {
            setArtists(artists.filter(a => a.id !== selectedArtist.id));
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold gradient-text">Artists</h1>
                    <p className="text-muted-foreground">Manage your featured artists and performers.</p>
                </div>
                <Button onClick={openCreateDialog} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Artist
                </Button>
            </div>

            <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search artists..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Artist</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Achievements</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredArtists.map((artist, index) => (
                                <motion.tr
                                    key={artist.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img src={artist.image} alt={artist.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <div className="font-medium flex items-center gap-2">
                                                    {artist.name}
                                                    {artist.featured && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">{artist.type}</Badge>
                                    </TableCell>
                                    <TableCell>{artist.genre}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {artist.achievements.slice(0, 2).map((a) => (
                                                <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(artist)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => { setSelectedArtist(artist); setIsDeleteDialogOpen(true); }}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{selectedArtist ? "Edit Artist" : "Add New Artist"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Artist name" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Type</label>
                                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                    <SelectContent>
                                        {artistTypes.map((type) => (<SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Genre</label>
                            <Input value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} placeholder="e.g., Electronic Producer" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Bio</label>
                            <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Short biography" rows={3} />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Achievements (comma separated)</label>
                            <Input value={formData.achievements} onChange={(e) => setFormData({ ...formData, achievements: e.target.value })} placeholder="Grammy Nominated, 5M+ Streams" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded" />
                            <label htmlFor="featured" className="text-sm font-medium">Featured Artist</label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                            {selectedArtist ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Delete Artist</DialogTitle></DialogHeader>
                    <p className="text-muted-foreground">Are you sure you want to delete "{selectedArtist?.name}"?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
