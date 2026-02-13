import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, Keyboard, Mic, Moon, Footprints, Smartphone, Wind, Coffee } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Switch } from "../components/Switch";

const riskData = [
    { day: "Mon", score: 12 },
    { day: "Tue", score: 15 },
    { day: "Wed", score: 18 },
    { day: "Thu", score: 25 },
    { day: "Fri", score: 45 },
    { day: "Sat", score: 62 },
    { day: "Sun", score: 58 },
];

const initialSensors = [
    { id: "typing", name: "Typing Latency", icon: Keyboard, active: true, desc: "Keystroke rhythm analysis" },
    { id: "voice", name: "Voice Tone", icon: Mic, active: false, desc: "Pitch & cadence variability" },
    { id: "sleep", name: "Sleep Patterns", icon: Moon, active: true, desc: "Circadian rhythm tracking" },
    { id: "activity", name: "Physical Activity", icon: Footprints, active: true, desc: "Step count & movement" },
    { id: "usage", name: "App Usage", icon: Smartphone, active: true, desc: "Screen time & switching" },
];

function ScanlineEffect() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-0">
            <motion.div
                className="absolute top-0 left-0 w-full h-[2px] bg-primary/30 shadow-[0_0_15px_rgba(43,212,189,0.5)]"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,22,30,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
        </div>
    );
}

function RiskChart() {
    const current = riskData[riskData.length - 1].score;
    const elevated = current > 50;

    return (
        <Card className="glass-panel border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Mental Health Risk Score</CardTitle>
                <AlertTriangle className={`w-4 h-4 ${elevated ? "text-cyan-400" : "text-primary"}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold mb-4">
                    {current}/100
                    <span className={`text-xs ml-2 font-normal ${elevated ? "text-cyan-400" : "text-primary"}`}>
                        {elevated ? "+ Elevated Risk" : "Stable"}
                    </span>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={riskData}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={elevated ? "hsl(190 80% 60%)" : "hsl(172 66% 50%)"} stopOpacity={0.35} />
                                    <stop offset="95%" stopColor={elevated ? "hsl(190 80% 60%)" : "hsl(172 66% 50%)"} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} dy={10} />
                            <YAxis hide domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "rgba(23, 27, 36, 0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                                itemStyle={{ color: "#fff" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke={elevated ? "hsl(190 80% 60%)" : "hsl(172 66% 50%)"}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorScore)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

function SensorPanel() {
    const [sensors, setSensors] = useState(initialSensors);

    const toggle = (id) => {
        setSensors(sensors.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
    };

    return (
        <Card className="glass-panel border-0 h-full">
            <CardHeader>
                <CardTitle className="text-lg font-display">Active Sensors</CardTitle>
                <p className="text-sm text-muted-foreground">Manage data collection permissions</p>
            </CardHeader>
            <CardContent className="space-y-4">
                {sensors.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className={`relative p-2 rounded-md transition-colors ${s.active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                                <s.icon className="w-4 h-4 relative z-10" />
                                {s.active && (
                                    <motion.div
                                        layoutId={`pulse-${s.id}`}
                                        className="absolute inset-0 bg-primary/20 rounded-md"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}
                            </div>
                            <div>
                                <div className="text-sm font-medium">{s.name}</div>
                                <div className="text-xs text-muted-foreground">{s.desc}</div>
                            </div>
                        </div>
                        <Switch checked={s.active} onCheckedChange={() => toggle(s.id)} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-background pb-12 relative">
            {/* Grid bg */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="pt-28 px-6 max-w-7xl mx-auto space-y-6 relative z-10">
                {/* Header */}
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-display font-bold">Wellness Dashboard</h1>
                        <p className="text-muted-foreground">Monitoring active • Last sync: Just now</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                        </span>
                        <span className="text-xs text-primary font-mono uppercase tracking-widest">System Online</span>
                    </div>
                </header>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left 2/3 */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Risk chart with scanline */}
                        <div className="relative group">
                            <ScanlineEffect />
                            <RiskChart />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Recent Insights */}
                            <Card className="glass-panel border-0 hover:border-primary/20 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg">Recent Insights</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                        <p className="text-sm text-orange-200 font-medium mb-1">Unusual Sleep Pattern</p>
                                        <p className="text-xs text-muted-foreground">Detected 2h less sleep than your 14-day average.</p>
                                    </div>
                                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                        <p className="text-sm text-primary font-medium mb-1">Physical Activity Up</p>
                                        <p className="text-xs text-muted-foreground">You've reached your step goal 3 days in a row.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recommended */}
                            <Card className="glass-panel border-0 hover:border-primary/20 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-lg">Recommended</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start h-auto py-3 border-white/10 hover:bg-white/5 group">
                                        <div className="bg-primary/10 p-2 rounded-md mr-3 group-hover:bg-primary/20 transition-colors">
                                            <Wind className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-medium">Box Breathing</div>
                                            <div className="text-xs text-muted-foreground">3 min session to reduce stress</div>
                                        </div>
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start h-auto py-3 border-white/10 hover:bg-white/5 group">
                                        <div className="bg-primary/10 p-2 rounded-md mr-3 group-hover:bg-primary/20 transition-colors">
                                            <Coffee className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-medium">Caffeine Log</div>
                                            <div className="text-xs text-muted-foreground">Track intake vs anxiety</div>
                                        </div>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right 1/3 */}
                    <div className="space-y-6">
                        <SensorPanel />

                        {/* Weekly Report CTA */}
                        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20 overflow-hidden relative">
                            <div className="absolute -right-4 -top-4 bg-primary/20 w-24 h-24 rounded-full blur-2xl" />
                            <CardContent className="pt-6 relative z-10">
                                <h3 className="font-bold text-lg mb-2">Weekly Report Ready</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Your encrypted clinical summary for Feb 6 – Feb 13 is ready to export.
                                </p>
                                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    Export PDF
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
