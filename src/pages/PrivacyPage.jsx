import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, EyeOff, HardDrive, Fingerprint, FileText, Trash2, Server, Wifi } from "lucide-react";

const principles = [
    { icon: HardDrive, title: "100% On-Device Processing", desc: "All ML inference, feature extraction, and risk scoring happens locally. Your phone is the only computer that ever sees your data." },
    { icon: EyeOff, title: "Zero Telemetry", desc: "MindGuard AI sends absolutely nothing to any server. No analytics, no crash reports, no usage metrics. Airplane mode? The app works perfectly." },
    { icon: Fingerprint, title: "Biometric-Locked Storage", desc: "Your behavioral data is encrypted at rest with AES-256 and locked behind your device's biometric authentication (Face ID / fingerprint)." },
    { icon: Trash2, title: "Right to Delete", desc: "One tap permanently erases all stored data, models, and baselines. No 30-day retention, no backups, no hidden copies. Gone is gone." },
    { icon: FileText, title: "Encrypted Exports", desc: "Clinical reports are generated locally and exported as password-protected, encrypted PDFs. Only you and your clinician can open them." },
    { icon: Lock, title: "No Account Required", desc: "MindGuard AI works without sign-up, email, or any personally identifiable information. You are never tracked, profiled, or fingerprinted." },
];

const comparison = [
    { feature: "Data Processing", us: "On-device only", them: "Cloud servers" },
    { feature: "Account Required", us: "No", them: "Yes (email, phone)" },
    { feature: "Data Shared with 3rd Parties", us: "Never", them: "Often (advertisers, partners)" },
    { feature: "Internet Required", us: "No", them: "Yes" },
    { feature: "Data Retention After Delete", us: "0 days", them: "30–90 days" },
    { feature: "Open Source", us: "Yes", them: "Rarely" },
];

const faqs = [
    { q: "Can MindGuard AI access my messages or photos?", a: "No. MindGuard AI only reads anonymized sensor signals (accelerometer, keystroke timing, screen-on events). It never accesses your messages, photos, contacts, or browsing history." },
    { q: "What happens if my phone is stolen?", a: "All data is encrypted with AES-256 and locked behind biometric authentication. Without your face or fingerprint, the data is unreadable." },
    { q: "Does it work without internet?", a: "Yes, 100%. All processing is local. MindGuard AI never needs an internet connection to function." },
    { q: "Can my employer or insurance company access my data?", a: "No. Data never leaves your device. There is no server, no account, and no database that anyone else could query." },
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

            <div className="pt-28 pb-16 px-6 max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Privacy Architecture
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                        Your Data, <span className="gradient-text">Your Rules</span>
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Privacy isn't a feature — it's the foundation. MindGuard AI was architected from day one so that your mental health data never leaves your device.
                    </p>
                </motion.div>

                {/* Principles grid */}
                <section className="mb-24">
                    <h2 className="text-2xl font-display font-bold mb-8 text-center">Privacy Principles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {principles.map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel rounded-xl p-6 hover:border-primary/20 transition-colors group"
                            >
                                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                                    <p.icon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Comparison table */}
                <section className="mb-24">
                    <h2 className="text-2xl font-display font-bold mb-4 text-center">How We Compare</h2>
                    <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
                        MindGuard AI vs. typical mental health apps.
                    </p>
                    <div className="max-w-2xl mx-auto glass-panel rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-4 text-muted-foreground font-medium">Feature</th>
                                    <th className="text-center p-4 text-primary font-semibold">MindGuard AI</th>
                                    <th className="text-center p-4 text-muted-foreground font-medium">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, i) => (
                                    <tr key={row.feature} className={i < comparison.length - 1 ? "border-b border-white/5" : ""}>
                                        <td className="p-4 text-foreground">{row.feature}</td>
                                        <td className="p-4 text-center text-primary font-medium">{row.us}</td>
                                        <td className="p-4 text-center text-muted-foreground">{row.them}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Data flow diagram */}
                <section className="mb-24">
                    <h2 className="text-2xl font-display font-bold mb-8 text-center">Data Flow</h2>
                    <div className="max-w-xl mx-auto">
                        <div className="flex flex-col items-center gap-3">
                            {[
                                { icon: Wifi, label: "Sensor Data Captured", sub: "Accelerometer, keyboard, screen events" },
                                { icon: HardDrive, label: "Processed On-Device", sub: "Feature extraction + ML inference" },
                                { icon: Lock, label: "Encrypted at Rest", sub: "AES-256 + biometric lock" },
                                { icon: FileText, label: "Report Generated Locally", sub: "Encrypted PDF export" },
                            ].map((step, i) => (
                                <motion.div
                                    key={step.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="w-full"
                                >
                                    <div className="glass-panel rounded-lg p-4 flex items-center gap-4">
                                        <div className="bg-primary/10 p-2.5 rounded-lg">
                                            <step.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{step.label}</div>
                                            <div className="text-xs text-muted-foreground">{step.sub}</div>
                                        </div>
                                    </div>
                                    {i < 3 && (
                                        <div className="flex justify-center">
                                            <div className="w-px h-4 bg-primary/30" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            {/* Crossed out cloud */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="mt-4 glass-panel rounded-lg p-4 flex items-center gap-4 border-red-500/20"
                            >
                                <div className="bg-red-500/10 p-2.5 rounded-lg relative">
                                    <Server className="w-5 h-5 text-red-400" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-0.5 bg-red-500 rotate-45" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-red-400">Never Sent to Cloud</div>
                                    <div className="text-xs text-muted-foreground">No servers, no APIs, no third parties</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <h2 className="text-2xl font-display font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="max-w-2xl mx-auto space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel rounded-xl p-5"
                            >
                                <h4 className="font-semibold text-sm mb-2 flex items-start gap-2">
                                    <Eye className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                    {faq.q}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed pl-6">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8 px-6 mt-16">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-muted-foreground">
                    <span>© 2026 MindGuard AI — Frostbyte Hackathon</span>
                    <span>Privacy-first by design</span>
                </div>
            </footer>
        </div>
    );
}
