import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Neural network nodes with (x, y) positions for brain shape
const brainNodes = [
    // Left hemisphere
    { x: 120, y: 100, r: 4 }, { x: 100, y: 130, r: 3 }, { x: 85, y: 160, r: 5 },
    { x: 90, y: 195, r: 3 }, { x: 110, y: 220, r: 4 }, { x: 75, y: 120, r: 3 },
    { x: 65, y: 155, r: 4 }, { x: 70, y: 190, r: 3 }, { x: 95, y: 250, r: 3 },
    { x: 130, y: 80, r: 3 }, { x: 60, y: 175, r: 3 },
    // Right hemisphere
    { x: 230, y: 100, r: 4 }, { x: 250, y: 130, r: 3 }, { x: 265, y: 160, r: 5 },
    { x: 260, y: 195, r: 3 }, { x: 240, y: 220, r: 4 }, { x: 275, y: 120, r: 3 },
    { x: 285, y: 155, r: 4 }, { x: 280, y: 190, r: 3 }, { x: 255, y: 250, r: 3 },
    { x: 220, y: 80, r: 3 }, { x: 290, y: 175, r: 3 },
    // Center / corpus callosum
    { x: 175, y: 90, r: 5 }, { x: 175, y: 130, r: 4 }, { x: 175, y: 170, r: 5 },
    { x: 175, y: 210, r: 4 }, { x: 175, y: 250, r: 3 }, { x: 155, y: 110, r: 3 },
    { x: 195, y: 110, r: 3 }, { x: 155, y: 150, r: 3 }, { x: 195, y: 150, r: 3 },
    { x: 155, y: 190, r: 3 }, { x: 195, y: 190, r: 3 },
    // Top
    { x: 145, y: 65, r: 3 }, { x: 205, y: 65, r: 3 }, { x: 175, y: 55, r: 4 },
    // Brainstem
    { x: 175, y: 280, r: 4 }, { x: 165, y: 300, r: 3 }, { x: 185, y: 300, r: 3 },
    { x: 175, y: 320, r: 3 },
];

// Connections between nodes (index pairs)
const brainConnections = [
    // Left hemisphere internal
    [0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 3], [0, 5],
    [1, 6], [4, 8], [9, 0], [10, 6], [10, 7], [5, 10],
    // Right hemisphere internal
    [11, 12], [12, 13], [13, 14], [14, 15], [16, 17], [17, 18], [18, 14], [11, 16],
    [12, 17], [15, 19], [20, 11], [21, 17], [21, 18], [16, 21],
    // Cross connections (corpus callosum)
    [0, 22], [22, 11], [1, 23], [23, 12], [2, 24], [24, 13], [3, 25], [25, 14],
    [4, 26], [26, 15], [22, 23], [23, 24], [24, 25], [25, 26],
    [27, 22], [28, 22], [29, 24], [30, 24], [31, 25], [32, 25],
    [27, 0], [28, 11], [29, 2], [30, 13], [31, 3], [32, 14],
    // Top
    [33, 9], [34, 20], [35, 22], [33, 35], [34, 35], [9, 33], [20, 34],
    // Brainstem
    [26, 36], [8, 36], [19, 36], [36, 37], [36, 38], [37, 39], [38, 39],
];

function NeuralPulse({ x1, y1, x2, y2, delay }) {
    return (
        <motion.circle
            r={2}
            fill="#2bd4bd"
            filter="url(#glow)"
            initial={{ cx: x1, cy: y1, opacity: 0 }}
            animate={{
                cx: [x1, x2],
                cy: [y1, y2],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                duration: 1.5,
                delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 4 + 2,
                ease: "easeInOut",
            }}
        />
    );
}

export default function BrainAnimation() {
    const [activeNodes, setActiveNodes] = useState(new Set());
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            const count = Math.floor(Math.random() * 6) + 3;
            const newActive = new Set();
            for (let i = 0; i < count; i++) {
                newActive.add(Math.floor(Math.random() * brainNodes.length));
            }
            setActiveNodes(newActive);
        }, 1200);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="relative w-full max-w-md mx-auto aspect-square">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-75" />

            <svg
                viewBox="0 0 350 350"
                className="w-full h-full relative z-10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Glow filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Brain outline gradient */}
                    <linearGradient id="brainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2bd4bd" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#2bd4bd" stopOpacity="0.2" />
                    </linearGradient>

                    {/* Scanning beam gradient */}
                    <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2bd4bd" stopOpacity="0" />
                        <stop offset="40%" stopColor="#2bd4bd" stopOpacity="0.15" />
                        <stop offset="50%" stopColor="#2bd4bd" stopOpacity="0.4" />
                        <stop offset="60%" stopColor="#2bd4bd" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#2bd4bd" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Brain outline (stylized) */}
                <motion.path
                    d="M175 40 C 100 40, 40 90, 50 170 C 55 210, 70 250, 95 270 C 120 290, 140 310, 165 330 Q 175 340 185 330 C 210 310, 230 290, 255 270 C 280 250, 295 210, 300 170 C 310 90, 250 40, 175 40 Z"
                    fill="none"
                    stroke="url(#brainGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />

                {/* Center dividing line */}
                <motion.line
                    x1="175" y1="55" x2="175" y2="280"
                    stroke="#2bd4bd"
                    strokeWidth="0.5"
                    strokeOpacity="0.2"
                    strokeDasharray="3 5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                />

                {/* Neural connections */}
                {brainConnections.map(([a, b], i) => (
                    <motion.line
                        key={`conn-${i}`}
                        x1={brainNodes[a].x}
                        y1={brainNodes[a].y}
                        x2={brainNodes[b].x}
                        y2={brainNodes[b].y}
                        stroke="#2bd4bd"
                        strokeWidth={0.6}
                        strokeOpacity={0.15}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.02 }}
                    />
                ))}

                {/* Neural signal pulses traveling along connections */}
                {brainConnections.slice(0, 20).map(([a, b], i) => (
                    <NeuralPulse
                        key={`pulse-${i}`}
                        x1={brainNodes[a].x}
                        y1={brainNodes[a].y}
                        x2={brainNodes[b].x}
                        y2={brainNodes[b].y}
                        delay={i * 0.3}
                    />
                ))}

                {/* Brain nodes */}
                {brainNodes.map((node, i) => (
                    <motion.circle
                        key={`node-${i}`}
                        cx={node.x}
                        cy={node.y}
                        r={node.r}
                        fill={activeNodes.has(i) ? "#2bd4bd" : "#2bd4bd"}
                        fillOpacity={activeNodes.has(i) ? 0.9 : 0.3}
                        filter={activeNodes.has(i) ? "url(#nodeGlow)" : undefined}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: activeNodes.has(i) ? 0.9 : 0.3,
                        }}
                        transition={{
                            scale: { duration: 0.4, delay: 0.3 + i * 0.03 },
                            opacity: { duration: 0.6 },
                        }}
                    />
                ))}

                {/* Scanning beam (horizontal sweep) */}
                <motion.rect
                    x="40"
                    width="270"
                    height="60"
                    fill="url(#scanGrad)"
                    initial={{ y: 40 }}
                    animate={{ y: [40, 300, 40] }}
                    transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />

                {/* Scanning line */}
                <motion.line
                    x1="40" x2="310"
                    stroke="#2bd4bd"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                    filter="url(#glow)"
                    initial={{ y1: 40, y2: 40 }}
                    animate={{ y1: [40, 300, 40], y2: [40, 300, 40] }}
                    transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />
            </svg>

            {/* Data readout labels */}
            <motion.div
                className="absolute top-4 right-0 text-[10px] font-mono text-primary/60 space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <div>NEURAL_SCAN: ACTIVE</div>
                <div>SYNAPSES: 847</div>
                <div>LATENCY: 12ms</div>
            </motion.div>

            <motion.div
                className="absolute bottom-4 left-0 text-[10px] font-mono text-primary/60 space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
            >
                <div>PATTERN: BASELINE</div>
                <div>DEVIATION: 0.03σ</div>
                <div>STATUS: MONITORING</div>
            </motion.div>
        </div>
    );
}
