"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Pencil, Trash2, Search, Calendar } from "lucide-react";
import initialData from "@/data/data.json";

type Event = typeof initialData.events[0];

const categories = [
    { id: "music", name: "Music" },
    { id: "dance", name: "Dance" },
    { id: "theatre", name: "Theatre" },
    { id: "visual", name: "Visual Arts" },
    { id: "film", name: "Film & Media" },
];

export default function EventsPage() {
    const [events, setEvents] = useState(initialData.events);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        date: "",
        time: "",
        venue: "",
        description: "",
        artists: "",
        image: "",
        featured: false,
    });

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openCreateDialog = () => {
        setSelectedEvent(null);
        setFormData({
            title: "",
            category: "",
            date: "",
            time: "",
            venue: "",
            description: "",
            artists: "",
            image: "",
            featured: false,
        });
        setIsDialogOpen(true);
    };

    const openEditDialog = (event: Event) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title,
            category: event.category,
            date: event.date,
            time: event.time,
            venue: event.venue,
            description: event.description,
            artists: event.artists.join(", "),
            image: event.image,
            featured: event.featured,
        });
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (event: Event) => {
        setSelectedEvent(event);
        setIsDeleteDialogOpen(true);
    };

    const handleSubmit = () => {
        if (selectedEvent) {
            // Update existing event
            setEvents(events.map(e =>
                e.id === selectedEvent.id
                    ? {
                        ...e,
                        ...formData,
                        artists: formData.artists.split(",").map(a => a.trim())
                    }
                    : e
            ));
        } else {
            // Create new event
            const newEvent: Event = {
                id: String(Date.now()),
                ...formData,
                artists: formData.artists.split(",").map(a => a.trim()),
                status: "upcoming",
            };
            setEvents([...events, newEvent]);
        }
        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (selectedEvent) {
            setEvents(events.filter(e => e.id !== selectedEvent.id));
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold gradient-text">Events</h1>
                    <p className="text-muted-foreground">Manage your events and performances.</p>
                </div>
                <Button onClick={openCreateDialog} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                </Button>
            </div>

            {/* Search */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Events Table */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Venue</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEvents.map((event, index) => (
                                <motion.tr
                                    key={event.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div>
                                                <div className="font-medium">{event.title}</div>
                                                {event.featured && (
                                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs mt-1">
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {event.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(event.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell>{event.venue}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className="bg-emerald-500/10 text-emerald-400 capitalize"
                                        >
                                            {event.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditDialog(event)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive"
                                                onClick={() => openDeleteDialog(event)}
                                            >
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

            {/* Create/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedEvent ? "Edit Event" : "Create New Event"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Event title"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Category</label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Venue</label>
                                <Input
                                    value={formData.venue}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                    placeholder="Event venue"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Date</label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Time</label>
                                <Input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Event description"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Artists (comma separated)</label>
                            <Input
                                value={formData.artists}
                                onChange={(e) => setFormData({ ...formData, artists: e.target.value })}
                                placeholder="Artist 1, Artist 2, Artist 3"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-4 h-4 rounded border-border"
                            />
                            <label htmlFor="featured" className="text-sm font-medium">
                                Featured Event
                            </label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                        >
                            {selectedEvent ? "Update Event" : "Create Event"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">
                        Are you sure you want to delete "{selectedEvent?.title}"? This action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
