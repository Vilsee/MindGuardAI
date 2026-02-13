import { Link, useLocation } from "wouter";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [location] = useLocation();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/technology", label: "Technology" },
        { href: "/privacy", label: "Privacy" },
        { href: "/dashboard", label: "Dashboard" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/5 bg-background/50">
            <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <Shield className="w-7 h-7 text-primary" />
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-display font-bold text-lg tracking-tight">
                        MindGuard <span className="text-primary">AI</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm transition-colors ${location === link.href
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/demo">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                            Launch Demo
                        </Button>
                    </Link>
                </div>

                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {open && (
                <div className="md:hidden px-6 pb-4 space-y-3 border-t border-white/5 bg-background/95 backdrop-blur-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block py-2 text-sm ${location === link.href ? "text-primary" : "text-muted-foreground"
                                }`}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/demo" onClick={() => setOpen(false)}>
                        <Button className="w-full">Launch Demo</Button>
                    </Link>
                </div>
            )}
        </nav>
    );
}
