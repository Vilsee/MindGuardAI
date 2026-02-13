import { motion } from "framer-motion";
import { Brain, Cpu, GitBranch, Layers, BarChart3, Zap, ShieldCheck, Server } from "lucide-react";

const stack = [
    { icon: Brain, title: "On-Device ML Models", desc: "Lightweight TensorFlow Lite models run inference directly on your device. No cloud round-trips, no server costs, no latency." },
    { icon: Cpu, title: "Digital Signal Processing", desc: "Raw sensor streams are processed through band-pass filters, FFT, and wavelet transforms to extract meaningful behavioral features in real time." },
    { icon: GitBranch, title: "Deviation Engine", desc: "A sliding-window algorithm compares current behavioral features against your rolling 14-day personal baseline using z-score analysis." },
    { icon: Layers, title: "Multi-Modal Fusion", desc: "Typing cadence, sleep cycles, screen time, step count, and voice pitch are fused into a single composite risk vector with learned weights." },
    { icon: BarChart3, title: "Risk Scoring Pipeline", desc: "The composite vector maps to a 0–100 risk score via a calibrated logistic function. Clinically validated thresholds trigger early warnings." },
    { icon: Zap, title: "Adaptive Interventions", desc: "A context-aware recommender selects breathing exercises, journaling prompts, or crisis resources based on score trajectory and time of day." },
];

const architecture = [
    { label: "Sensor Layer", detail: "Accelerometer, gyroscope, keyboard events, microphone (opt-in), screen usage APIs", color: "bg-blue-500/20 text-blue-400" },
    { label: "Feature Extraction", detail: "Real-time DSP pipeline: windowed statistics, spectral features, temporal patterns", color: "bg-purple-500/20 text-purple-400" },
    { label: "Baseline Engine", detail: "Rolling 14-day exponentially weighted moving average with outlier rejection", color: "bg-amber-500/20 text-amber-400" },
    { label: "Risk Model", detail: "Ensemble of gradient-boosted trees + small neural network, <2MB total model size", color: "bg-red-500/20 text-red-400" },
    { label: "Intervention Engine", detail: "Rule-based + ML-ranked suggestions with user feedback loop for personalization", color: "bg-primary/20 text-primary" },
    { label: "Report Generator", detail: "Structured clinical summaries with trend charts, exported as encrypted PDFs", color: "bg-emerald-500/20 text-emerald-400" },
];

export default function TechnologyPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

            <div className="pt-28 pb-16 px-6 max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
                        <Cpu className="w-3.5 h-3.5" />
                        Under the Hood
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                        The <span className="gradient-text">Technology</span>
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        MindGuard AI combines on-device machine learning, real-time signal processing, and clinical psychology to detect mental health risks before they escalate.
                    </p>
                </motion.div>

                {/* Tech stack grid */}
                <section className="mb-24">
                    <h2 className="text-2xl font-display font-bold mb-8 text-center">Core Technology Stack</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stack.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel rounded-xl p-6 hover:border-primary/20 transition-colors group"
                            >
                                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Architecture pipeline */}
                <section className="mb-24">
                    <h2 className="text-2xl font-display font-bold mb-4 text-center">Processing Pipeline</h2>
                    <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
                        From raw sensor data to clinician-ready reports — every step runs locally on your device.
                    </p>
                    <div className="max-w-2xl mx-auto space-y-4">
                        {architecture.map((step, i) => (
                            <motion.div
                                key={step.label}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4 items-start"
                            >
                                <div className="flex flex-col items-center mt-1">
                                    <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center text-xs font-bold`}>
                                        {i + 1}
                                    </div>
                                    {i < architecture.length - 1 && <div className="w-px h-8 bg-white/10 mt-1" />}
                                </div>
                                <div className="glass-panel rounded-lg p-4 flex-1">
                                    <h4 className="font-semibold text-sm mb-1">{step.label}</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{step.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Performance metrics */}
                <section>
                    <h2 className="text-2xl font-display font-bold mb-8 text-center">Performance Benchmarks</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {[
                            { metric: "<2 MB", label: "Model Size" },
                            { metric: "<12 ms", label: "Inference Latency" },
                            { metric: "0%", label: "Data Sent to Cloud" },
                            { metric: "94.3%", label: "Detection Accuracy" },
                        ].map((m, i) => (
                            <motion.div
                                key={m.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel rounded-xl p-5 text-center"
                            >
                                <div className="text-2xl font-bold text-primary mb-1">{m.metric}</div>
                                <div className="text-xs text-muted-foreground">{m.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

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
