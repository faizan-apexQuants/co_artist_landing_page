"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import initialData from "@/data/data.json";

type EventHead = typeof initialData.eventHeads[0];

export default function EventHeadsPage() {
    const [eventHeads, setEventHeads] = useState(initialData.eventHeads);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedHead, setSelectedHead] = useState<EventHead | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        specialty: "",
        bio: "",
        image: "",
    });

    const filteredHeads = eventHeads.filter(head =>
        head.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        head.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openCreateDialog = () => {
        setSelectedHead(null);
        setFormData({ name: "", role: "", specialty: "", bio: "", image: "" });
        setIsDialogOpen(true);
    };

    const openEditDialog = (head: EventHead) => {
        setSelectedHead(head);
        setFormData({
            name: head.name,
            role: head.role,
            specialty: head.specialty,
            bio: head.bio,
            image: head.image,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        if (selectedHead) {
            setEventHeads(eventHeads.map(h =>
                h.id === selectedHead.id ? { ...h, ...formData } : h
            ));
        } else {
            const newHead: EventHead = {
                id: String(Date.now()),
                ...formData,
                social: { instagram: "#", twitter: "#", linkedin: "#" },
            };
            setEventHeads([...eventHeads, newHead]);
        }
        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (selectedHead) {
            setEventHeads(eventHeads.filter(h => h.id !== selectedHead.id));
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold gradient-text">Event Heads</h1>
                    <p className="text-muted-foreground">Manage your event coordinators and leads.</p>
                </div>
                <Button onClick={openCreateDialog} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event Head
                </Button>
            </div>

            <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search event heads..."
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
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Specialty</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredHeads.map((head, index) => (
                                <motion.tr
                                    key={head.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img src={head.image} alt={head.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div className="font-medium">{head.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-primary font-medium">{head.role}</TableCell>
                                    <TableCell className="text-muted-foreground">{head.specialty}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(head)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => { setSelectedHead(head); setIsDeleteDialogOpen(true); }}>
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedHead ? "Edit Event Head" : "Add New Event Head"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full name" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Role</label>
                            <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g., Creative Director" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Specialty</label>
                            <Input value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} placeholder="e.g., Music & Live Performances" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Bio</label>
                            <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Short biography" rows={3} />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                            {selectedHead ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Delete Event Head</DialogTitle></DialogHeader>
                    <p className="text-muted-foreground">Are you sure you want to delete "{selectedHead?.name}"?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
