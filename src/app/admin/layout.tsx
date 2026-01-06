"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Palette,
    Image,
    Menu,
    Home,
    ChevronRight,
} from "lucide-react";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Artists", href: "/admin/artists", icon: Palette },
    { name: "Event Heads", href: "/admin/event-heads", icon: Users },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
];

function Sidebar({ className = "" }: { className?: string }) {
    const pathname = usePathname();

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Logo */}
            <div className="p-6">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div>
                        <span className="font-display text-lg font-bold gradient-text block leading-tight">
                            Co-Artist
                        </span>
                        <span className="text-xs text-muted-foreground">Admin Panel</span>
                    </div>
                </Link>
            </div>

            <Separator />

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""
                                    }`}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.name}
                            </Button>
                        </Link>
                    );
                })}
            </nav>

            <Separator />

            {/* Footer */}
            <div className="p-4">
                <Link href="/">
                    <Button variant="outline" className="w-full justify-start gap-3">
                        <Home className="w-5 h-5" />
                        Back to Site
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    // Get current page name
    const currentPage = sidebarLinks.find((link) => link.href === pathname)?.name || "Dashboard";

    return (
        <div className="min-h-screen flex bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 border-r border-border bg-card/50 backdrop-blur flex-col">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu */}
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-64">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <Sidebar />
                            </SheetContent>
                        </Sheet>

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm">
                            <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                                Admin
                            </Link>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{currentPage}</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
