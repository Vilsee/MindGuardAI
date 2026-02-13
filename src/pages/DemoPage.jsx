import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import {
    Play, ChevronRight, ChevronLeft, Keyboard, Moon, Footprints, Smartphone,
    Brain, AlertTriangle, Wind, RotateCcw, CheckCircle2, Shield, Activity
} from "lucide-react";
import { Button } from "../components/Button";
import { Link } from "wouter";

/* ── simulated data generators ── */
function generateTypingData() {
    const base = 85;
    return Array.from({ length: 20 }, (_, i) => ({
        t: i,
        wpm: Math.round(base + Math.sin(i * 0.5) * 12 + (Math.random() - 0.5) * 8),
    }));
}

function generateSleepData() {
    return [
        { day: "Mon", hrs: 7.2 }, { day: "Tue", hrs: 6.8 }, { day: "Wed", hrs: 7.5 },
        { day: "Thu", hrs: 5.1 }, { day: "Fri", hrs: 4.8 }, { day: "Sat", hrs: 5.3 },
        { day: "Sun", hrs: 6.0 },
    ];
}

function generateRiskData() {
    return [
        { day: "Mon", score: 15 }, { day: "Tue", score: 18 }, { day: "Wed", score: 12 },
        { day: "Thu", score: 35 }, { day: "Fri", score: 52 }, { day: "Sat", score: 58 },
        { day: "Sun", score: 48 },
    ];
}

/* ── demo steps ── */
const steps = [
    {
        id: "collect",
        title: "Step 1 — Passive Data Collection",
        subtitle: "MindGuard quietly monitors behavioral signals",
        icon: Keyboard,
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
        id: "baseline",
        title: "Step 2 — Baseline Comparison",
        subtitle: "Current patterns are compared to your 14-day rolling average",
        icon: Activity,
        color: "text-purple-400",
        bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
        id: "risk",
        title: "Step 3 — Risk Score Computation",
        subtitle: "Deviations are fused into a single composite risk score",
        icon: AlertTriangle,
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
        id: "detect",
        title: "Step 4 — Early Warning Triggered",
        subtitle: "Score exceeded threshold — an alert is generated",
        icon: Brain,
        color: "text-red-400",
        bg: "bg-red-500/10 border-red-500/20",
    },
    {
        id: "intervene",
        title: "Step 5 — Personalized Intervention",
        subtitle: "Context-aware recommendations are served",
        icon: Wind,
        color: "text-primary",
        bg: "bg-primary/10 border-primary/20",
    },
];

/* ── mini chart component ── */
function MiniChart({ data, dataKey, color, height = 120 }) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey={Object.keys(data[0])[0]} hide />
                <YAxis hide />
                <Tooltip
                    contentStyle={{ backgroundColor: "rgba(18,27,49,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                    itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#grad-${dataKey})`} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

/* ── step content panels ── */
function StepCollect() {
    const [typingData] = useState(generateTypingData);
    const sensors = [
        { icon: Keyboard, label: "Typing Speed", value: "82 WPM", sub: "↓ 14% from baseline", warn: true },
        { icon: Moon, label: "Sleep Duration", value: "5.1 hrs", sub: "↓ 2.3 hrs from average", warn: true },
        { icon: Footprints, label: "Step Count", value: "3,241", sub: "↓ 41% from baseline", warn: true },
        { icon: Smartphone, label: "Screen Time", value: "6.8 hrs", sub: "↑ 38% from average", warn: true },
    ];

    return (
        <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
                MindGuard passively captures anonymized behavioral signals — no manual input needed. Here's what it detects in our simulated user:
            </p>
            <div className="grid grid-cols-2 gap-3">
                {sensors.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.15 }}
                        className="glass-panel rounded-lg p-3"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <s.icon className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium">{s.label}</span>
                        </div>
                        <div className="text-lg font-bold">{s.value}</div>
                        <div className={`text-[11px] ${s.warn ? "text-orange-400" : "text-muted-foreground"}`}>{s.sub}</div>
                    </motion.div>
                ))}
            </div>
            <div className="glass-panel rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-2">Live Typing Speed (WPM)</div>
                <MiniChart data={typingData} dataKey="wpm" color="#60a5fa" height={80} />
            </div>
        </div>
    );
}

function StepBaseline() {
    const sleepData = generateSleepData();
    return (
        <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
                Every metric is compared against a personal, <strong className="text-foreground">rolling 14-day baseline</strong>. The deviation engine flags anomalies using z-score analysis.
            </p>
            <div className="glass-panel rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">Sleep Pattern — Last 7 Days</div>
                <MiniChart data={sleepData} dataKey="hrs" color="#a78bfa" height={100} />
                <div className="flex justify-between mt-2 text-[11px]">
                    <span className="text-muted-foreground">Baseline avg: <span className="text-foreground font-medium">7.3 hrs</span></span>
                    <span className="text-orange-400 font-medium">Current: 5.1 hrs (−2.2σ)</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: "Typing", dev: "−1.4σ", color: "text-amber-400" },
                    { label: "Sleep", dev: "−2.2σ", color: "text-red-400" },
                    { label: "Activity", dev: "−1.8σ", color: "text-orange-400" },
                ].map((d, i) => (
                    <motion.div
                        key={d.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="glass-panel rounded-lg p-3 text-center"
                    >
                        <div className="text-xs text-muted-foreground">{d.label}</div>
                        <div className={`text-lg font-bold ${d.color}`}>{d.dev}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function StepRisk() {
    const riskData = generateRiskData();
    const [score, setScore] = useState(0);

    useEffect(() => {
        let frame;
        let start;
        const target = 58;
        const animate = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / 1500, 1);
            setScore(Math.round(progress * target));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
                All deviations are weighted and fused into a <strong className="text-foreground">single composite risk score</strong> (0–100). Higher means greater deviation from healthy behavior.
            </p>
            <div className="flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-36 h-36 flex items-center justify-center"
                >
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <motion.circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke={score > 50 ? "#f59e0b" : "#2bd4bd"}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 52}
                            strokeDashoffset={2 * Math.PI * 52 * (1 - score / 100)}
                            style={{ filter: "drop-shadow(0 0 6px rgba(43,212,189,0.4))" }}
                        />
                    </svg>
                    <div className="text-center">
                        <div className="text-3xl font-bold">{score}</div>
                        <div className="text-[10px] text-muted-foreground">/100</div>
                    </div>
                </motion.div>
            </div>
            <div className="glass-panel rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Risk Score Trend</div>
                <MiniChart data={riskData} dataKey="score" color="#f59e0b" height={80} />
            </div>
            <div className="text-center text-xs text-orange-400 font-medium">⚠ Score crossed the 50-point threshold on Friday</div>
        </div>
    );
}

function StepDetect() {
    return (
        <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
                When the risk score crosses the <strong className="text-foreground">clinical threshold (50/100)</strong>, MindGuard AI generates an early warning with an explanation of what changed.
            </p>
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-5 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                    <div>
                        <h4 className="font-semibold text-sm text-orange-200 mb-2">⚠ Early Warning: Elevated Risk Detected</h4>
                        <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                            <li>• <strong className="text-foreground">Sleep</strong> dropped to 5.1 hrs (baseline: 7.3 hrs) — <span className="text-red-400">−2.2σ</span></li>
                            <li>• <strong className="text-foreground">Physical activity</strong> down 41% from baseline — <span className="text-orange-400">−1.8σ</span></li>
                            <li>• <strong className="text-foreground">Typing speed</strong> decreased 14% — <span className="text-amber-400">−1.4σ</span></li>
                            <li>• <strong className="text-foreground">Screen time</strong> up 38% — <span className="text-amber-400">+1.6σ</span></li>
                        </ul>
                        <div className="mt-3 text-[11px] text-muted-foreground">
                            Pattern matches: <span className="text-orange-300">Pre-depressive behavioral shift</span> (94.3% model confidence)
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className="glass-panel rounded-lg p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Detection Lead Time</div>
                <div className="text-2xl font-bold text-primary">2–4 weeks</div>
                <div className="text-[11px] text-muted-foreground">before clinical symptoms would typically appear</div>
            </div>
        </div>
    );
}

function StepIntervene() {
    const actions = [
        { icon: Wind, title: "Box Breathing", desc: "4-4-4-4 pattern · 3 min session", tag: "Stress Relief" },
        { icon: Moon, title: "Sleep Hygiene Reminder", desc: "Set a 10pm wind-down alarm", tag: "Sleep" },
        { icon: Footprints, title: "Walking Prompt", desc: "A 15-min walk can reduce cortisol by 14%", tag: "Activity" },
    ];
    return (
        <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
                Based on the specific deviations detected, MindGuard AI serves <strong className="text-foreground">personalized, evidence-based</strong> micro-interventions.
            </p>
            <div className="space-y-3">
                {actions.map((a, i) => (
                    <motion.div
                        key={a.title}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.15 }}
                        className="glass-panel rounded-lg p-4 flex items-start gap-3 hover:border-primary/20 transition-colors cursor-pointer group"
                    >
                        <div className="bg-primary/10 p-2.5 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                            <a.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{a.title}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{a.tag}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">{a.desc}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 group-hover:text-primary transition-colors" />
                    </motion.div>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center"
            >
                <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium mb-1">Demo Complete</div>
                <div className="text-xs text-muted-foreground mb-3">This entire process runs on-device in real-time — zero data leaves your phone.</div>
                <Link href="/dashboard">
                    <Button className="shadow-lg shadow-primary/20">Go to Dashboard →</Button>
                </Link>
            </motion.div>
        </div>
    );
}

const stepComponents = {
    collect: StepCollect,
    baseline: StepBaseline,
    risk: StepRisk,
    detect: StepDetect,
    intervene: StepIntervene,
};

/* ── main page ── */
export default function DemoPage() {
    const [current, setCurrent] = useState(0);
    const [started, setStarted] = useState(false);

    const step = steps[current];
    const StepContent = stepComponents[step.id];
    const isLast = current === steps.length - 1;
    const isFirst = current === 0;

    if (!started) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-6">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md relative z-10"
                >
                    <div className="bg-primary/10 p-4 rounded-2xl w-fit mx-auto mb-6">
                        <Play className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Interactive Demo</h1>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                        Walk through a simulated scenario showing exactly how MindGuard AI detects behavioral changes and intervenes — step by step.
                    </p>
                    <Button onClick={() => setStarted(true)} className="h-12 px-10 text-base gap-2 shadow-lg shadow-primary/20 glow">
                        Start Demo <ChevronRight className="w-4 h-4" />
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="pt-24 pb-16 px-6 max-w-3xl mx-auto relative z-10">
                {/* Progress bar */}
                <div className="flex items-center gap-1 mb-8">
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex-1 flex items-center gap-1">
                            <div
                                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i <= current ? "bg-primary" : "bg-white/10"
                                    }`}
                            />
                        </div>
                    ))}
                </div>

                {/* Step header */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35 }}
                    >
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-widest mb-4 ${step.bg} ${step.color}`}>
                            <step.icon className="w-3.5 h-3.5" />
                            {step.title.split("—")[0].trim()}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold mb-1">{step.title.split("—")[1]?.trim() || step.title}</h2>
                        <p className="text-sm text-muted-foreground mb-6">{step.subtitle}</p>

                        <StepContent />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
                    <Button
                        variant="outline"
                        className="border-white/10 gap-1"
                        onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                        disabled={isFirst}
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </Button>

                    <span className="text-xs text-muted-foreground">{current + 1} / {steps.length}</span>

                    {!isLast ? (
                        <Button className="gap-1 shadow-lg shadow-primary/20" onClick={() => setCurrent((c) => c + 1)}>
                            Next <ChevronRight className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            className="border-white/10 gap-1"
                            onClick={() => { setCurrent(0); setStarted(false); }}
                        >
                            <RotateCcw className="w-4 h-4" /> Restart
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
