import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Sparkles, Zap, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";

function FloatingCamera() {
return (
<Float speed={2} rotationIntensity={1} floatIntensity={2}>
<mesh position={[2, 0, 0]}>
<boxGeometry args={[0.8, 0.6, 0.4]} />
<meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
</mesh>
<mesh position={[2.4, 0.1, 0.2]}>
<cylinderGeometry args={[0.2, 0.2, 0.3]} />
<meshStandardMaterial color="#1f2937" />
</mesh>
</Float>
);
}

function FloatingPhotos() {
return (
<>
<Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
<mesh position={[-2, 1, -1]} rotation={[0.2, 0.3, 0.1]}>
<planeGeometry args={[1, 1.4]} />
<meshStandardMaterial color="#dc2626" />
</mesh>
</Float>
<Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.5}>
<mesh position={[-1, -1, 1]} rotation={[-0.1, -0.2, 0.2]}>
<planeGeometry args={[1.2, 0.8]} />
<meshStandardMaterial color="#991b1b" />
</mesh>
</Float>
<Float speed={2.2} rotationIntensity={0.3} floatIntensity={1.2}>
<mesh position={[1, -0.5, -2]} rotation={[0.3, -0.1, -0.1]}>
<planeGeometry args={[0.9, 1.2]} />
<meshStandardMaterial color="#7f1d1d" />
</mesh>
</Float>
</>
);
}

function MangekyouSharingan() {
return (
<Float speed={1} rotationIntensity={2} floatIntensity={0.5}>
<group position={[0, 0, 0]}>
<mesh>
<torusGeometry args={[1.2, 0.1, 8, 32]} />
<meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.3} />
</mesh>
<mesh rotation={[0, 0, 0]}>
<torusGeometry args={[0.8, 0.05, 6, 16]} />
<meshStandardMaterial color="#991b1b" emissive="#991b1b" emissiveIntensity={0.5} />
</mesh>
<mesh rotation={[0, 0, Math.PI / 3]}>
<torusGeometry args={[0.6, 0.03, 6, 16]} />
<meshStandardMaterial color="#7f1d1d" emissive="#7f1d1d" emissiveIntensity={0.7} />
</mesh>
<mesh>
<sphereGeometry args={[0.15]} />
<meshStandardMaterial color="#450a0a" emissive="#450a0a" emissiveIntensity={1} />
</mesh>
</group>
</Float>
);
}

function LogoText() {
return (
<Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
<group position={[0, 2.5, 0]}>
<mesh>
<boxGeometry args={[4, 0.6, 0.1]} />
<meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
</mesh>
<mesh position={[0, -0.4, 0]}>
<boxGeometry args={[3, 0.4, 0.1]} />
<meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
</mesh>
</group>
</Float>
);
}

function Scene3D() {
return (
<Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
<ambientLight intensity={0.3} />
<pointLight position={[10, 10, 10]} intensity={1} color="#dc2626" />
<pointLight position={[-10, -10, -10]} intensity={0.5} color="#991b1b" />

<Suspense fallback={null}>
<Environment preset="night" />
<FloatingCamera />
<FloatingPhotos />
<MangekyouSharingan />
<LogoText />
<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
</Suspense>
</Canvas>
);
}

export default function HomePage() {
const { isDark } = useGlobalContext();

return (
<div className={`w-screen h-screen ${isDark ? 'bg-gradient-to-br from-red-950 via-black to-red-900' : 'bg-gradient-to-br from-red-950 via-red-800 to-red-900'} relative overflow-hidden`}>
<div className="absolute inset-0">
{[...Array(50)].map((_, i) => (
<motion.div
key={i}
className="absolute w-1 h-1 bg-red-500 rounded-full opacity-30"
animate={{
x: [0, Math.random() * 100 - 50],
y: [0, Math.random() * 100 - 50],
opacity: [0.3, 0.8, 0.3],
}}
transition={{
duration: Math.random() * 3 + 2,
repeat: Infinity,
repeatType: "reverse",
}}
style={{
left: `${Math.random() * 100}%`,
top: `${Math.random() * 100}%`,
}}
/>
))}
</div>

<nav className="relative z-10 p-6">
<div className="w-full flex justify-between items-center">
<motion.div
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6 }}
className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-red-100'} flex items-center gap-2`}
>
<Eye className="w-8 h-8 text-red-500" />
GenjutsuEdit
</motion.div>

<motion.div
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6, delay: 0.2 }}
className="flex gap-4"
>
<Link to="/app">
<Button
variant="outline"
className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
>
Get Started
</Button>
</Link>
</motion.div>
</div>
</nav>

<div className="relative z-10 w-full px-6 py-12 h-[calc(100vh-120px)]">
<div className="grid lg:grid-cols-2 gap-12 items-center h-full">
<div className="space-y-8 flex flex-col justify-center">
<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
<h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${isDark ? 'text-white' : 'text-red-100'} leading-tight`}>
Master the{" "}
<span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Art</span> of{" "}
<span className={`bg-gradient-to-r ${isDark ? 'from-gray-400 to-gray-600' : 'from-red-200 to-red-300'} bg-clip-text text-transparent`}>Visual</span>{" "}
<span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Illusion</span>
</h1>
</motion.div>

<motion.p
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.2 }}
className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-red-200'} leading-relaxed`}
>
Transform reality with the power of advanced photo editing. Create extraordinary visual illusions that
captivate the mind and transcend the boundaries of ordinary photography.
</motion.p>

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.4 }}
className="flex flex-wrap gap-6"
>
<div className="flex items-center gap-3 text-red-300">
<Sparkles className="w-6 h-6" />
<span>AI Enhancement</span>
</div>
<div className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-red-200'}`}>
<Zap className="w-6 h-6" />
<span>Lightning Speed</span>
</div>
<div className="flex items-center gap-3 text-red-400">
<Palette className="w-6 h-6" />
<span>Precision Tools</span>
</div>
</motion.div>

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.6 }}
className="flex gap-4"
>
<Link to="/app">
<Button
size="lg"
className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-lg px-8 py-4"
>
Start Creating
</Button>
</Link>
</motion.div>
</div>

<motion.div
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 1, delay: 0.3 }}
className="h-full min-h-[500px] relative"
>
<Scene3D />
</motion.div>
</div>
</div>

<motion.div
animate={{
rotate: 360,
scale: [1, 1.1, 1],
}}
transition={{
rotate: { duration: 20, repeat: Infinity, ease: "linear" },
scale: { duration: 2, repeat: Infinity },
}}
className="absolute top-1/4 left-10 w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full opacity-20"
/>

<motion.div
animate={{
rotate: -360,
y: [0, -20, 0],
}}
transition={{
rotate: { duration: 15, repeat: Infinity, ease: "linear" },
y: { duration: 3, repeat: Infinity },
}}
className="absolute bottom-1/4 right-10 w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-20"
/>
</div>
);
}
