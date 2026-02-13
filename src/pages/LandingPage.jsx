import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Shield, Brain, Lock, Activity, Eye, Sparkles, ArrowRight, Heart } from "lucide-react";
import { Button } from "../components/Button";
import BrainAnimation from "../components/BrainAnimation";
import ScannerLoader from "../components/ScannerLoader";

const features = [
    { icon: Brain, title: "Digital Biomarkers", desc: "Analyzes typing speed, sleep patterns, screen time, and activity levels to build a behavioral baseline." },
    { icon: Lock, title: "Privacy First", desc: "All processing happens on-device. Zero data leaves your phone. You own your mental health data." },
    { icon: Activity, title: "Risk Scoring", desc: "Weighted composite score (0–100) derived from deviation analysis against your personal baselines." },
    { icon: Eye, title: "Early Detection", desc: "Detects subtle behavioral shifts 2–4 weeks before they escalate into clinical episodes." },
    { icon: Sparkles, title: "Smart Interventions", desc: "Personalized recommendations including breathing exercises, journaling prompts, and crisis resources." },
    { icon: Heart, title: "Clinician Reports", desc: "Anonymized, exportable PDF reports for your therapist with trend analysis and clinical notes." },
];

export default function LandingPage() {
    const [scanning, setScanning] = useState(false);
    const [, navigate] = useLocation();

    const handleOpenDashboard = (e) => {
        e.preventDefault();
        setScanning(true);
    };

    const handleScanComplete = () => {
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Scanner loading overlay */}
            <ScannerLoader visible={scanning} onComplete={handleScanComplete} />

            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Glow orbs */}
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-primary/5 rounded-full blur-2xl" />

            {/* Hero — two column: text left, brain right */}
            <section className="pt-28 pb-12 px-6 max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left: text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-6">
                            <Shield className="w-3.5 h-3.5" />
                            Privacy-First Mental Health AI
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
                            Your Mind,{" "}
                            <span className="gradient-text">Guarded</span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg lg:max-w-none">
                            A privacy-first AI early warning system that detects subtle behavioral changes before&nbsp;they&nbsp;escalate&nbsp;—&nbsp;all&nbsp;on&#8209;device.
                        </p>

                        <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                            <Button
                                className="h-12 px-8 text-base gap-2 shadow-lg shadow-primary/20 glow"
                                onClick={handleOpenDashboard}
                            >
                                Open Dashboard <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" className="h-12 px-8 text-base border-white/10">
                                Learn More
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right: Brain animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <BrainAnimation />
                    </motion.div>
                </div>

                {/* Mobile brain animation (shown only on smaller screens) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="lg:hidden mt-8 max-w-xs mx-auto"
                >
                    <BrainAnimation />
                </motion.div>

                {/* Floating stats card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 max-w-2xl mx-auto"
                >
                    <div className="glass-panel rounded-2xl p-6 relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-2 items-center">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                                </span>
                                <span className="text-xs text-primary font-mono uppercase tracking-widest">System Online</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Last sync: Just now</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "Risk Score", value: "32", unit: "/100", color: "text-primary" },
                                { label: "Sleep", value: "6.4", unit: "hrs", color: "text-blue-400" },
                                { label: "Steps", value: "7,821", unit: "today", color: "text-emerald-400" },
                            ].map((m) => (
                                <div key={m.label} className="text-center p-3 rounded-lg bg-white/5">
                                    <div className={`text-2xl font-bold ${m.color}`}>
                                        {m.value}<span className="text-xs text-muted-foreground ml-1">{m.unit}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features */}
            <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">How It Works</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Six pillars of passive mental health monitoring & intervention.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel rounded-xl p-6 hover:border-primary/20 transition-colors group"
                        >
                            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                                <f.icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Privacy */}
            <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
                <div className="glass-panel rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 bg-primary/20 w-64 h-64 rounded-full blur-2xl" />
                    <Lock className="w-10 h-10 text-primary mx-auto mb-4 relative z-10" />
                    <h2 className="text-3xl font-display font-bold mb-4 relative z-10">Zero Data Leaves Your Device</h2>
                    <p className="text-muted-foreground max-w-lg mx-auto mb-6 relative z-10">
                        MindGuard AI processes everything locally using on-device ML. No cloud, no servers,
                        no third parties. Your mental health data belongs to <strong className="text-foreground">you</strong>.
                    </p>
                    <Link href="/dashboard">
                        <Button className="h-12 px-8 text-base shadow-lg shadow-primary/20 glow relative z-10">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-muted-foreground">
                    <span>© 2026 MindGuard AI — Frostbyte Hackathon</span>
                    <span>Privacy-first by design</span>
                </div>
            </footer>
        </div>
    );
}
