import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {Eye,Upload,Palette,Sparkles,User,Settings,Home,Zap,ImageIcon,Wand2,X,RotateCcw,Music,AlertTriangle,Github,Linkedin,FileMusic,} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Suspense, useState, useRef } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { SharinganLoader } from "@/components/SharinganLoader";
import "@/components/SharinganLoader.css";
function UchihaText({ children, uchihaText }: { children: React.ReactNode; uchihaText?: string }) {
const { uchihaMode } = useGlobalContext();
if (uchihaMode && uchihaText) {
return <>{uchihaText}</>;}
return <>{children}</>;}
function FloatingPhotos() {
return (<>
<Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
<mesh position={[-2, 1, -1]} rotation={[0.2, 0.3, 0.1]}>
<planeGeometry args={[1, 1.4]} />
<meshStandardMaterial color="#dc2626" />
</mesh>
</Float>
<Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.5}>
<mesh position={[1, -1, 1]} rotation={[-0.1, -0.2, 0.2]}>
<planeGeometry args={[1.2, 0.8]} />
<meshStandardMaterial color="#991b1b" />
</mesh>
</Float>
<Float speed={2.2} rotationIntensity={0.3} floatIntensity={1.2}>
<mesh position={[0, 0.5, -2]} rotation={[0.3, -0.1, -0.1]}>
<planeGeometry args={[0.9, 1.2]} />
<meshStandardMaterial color="#7f1d1d" />
</mesh>
</Float>
</>);}
function MangekyouSharingan() {
return (
<Float speed={1} rotationIntensity={2} floatIntensity={0.5}>
<group position={[0, 0, 0]} scale={0.8}>
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
</mesh></group>
</Float>);}
function Scene3D({ uploadedImage }: { uploadedImage: string | null }) {
return (<Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
<ambientLight intensity={0.3} />
<pointLight position={[10, 10, 10]} intensity={1} color="#dc2626" />
<pointLight position={[-10, -10, -10]} intensity={0.5} color="#991b1b" />
<Suspense fallback={null}>
<Environment preset="night" />
<FloatingPhotos />
{!uploadedImage && <MangekyouSharingan />}
<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
</Suspense></Canvas>);}
function UploadPrompt({ onUpload }: { onUpload: () => void }) {
const { uchihaMode } = useGlobalContext();
return (<motion.div
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.5 }}
className="absolute inset-0 flex items-center justify-center z-10">
<Card className="backdrop-blur-lg bg-black/40 border-red-900/50 max-w-sm mx-4">
<CardContent className="p-6 text-center">
<motion.div
animate={{ rotate: [0, 360],scale: [1, 1.1, 1]}}
transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" },scale: { duration: 2, repeat: Infinity }}}
className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center">
<Eye className="w-8 h-8 text-white" />
</motion.div>
<h3 className="text-white text-lg font-semibold mb-2">
<UchihaText uchihaText="Awaken Your Sharingan">Upload Your Image</UchihaText></h3>
<p className="text-gray-300 text-sm mb-4">
<UchihaText uchihaText="Channel your chakra through a photograph to begin the genjutsu">
Begin your creative journey by uploading a photo
</UchihaText></p>
<Button onClick={onUpload} className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white">
<Upload className="w-4 h-4 mr-2" />
<UchihaText uchihaText="Activate Sharingan">Upload Photo</UchihaText></Button></CardContent></Card></motion.div>
);}
function ErrorAlert({ message, onClose }: { message: string; onClose: () => void }) {
const { uchihaMode } = useGlobalContext();
return (
<motion.divinitial={{ opacity: 0, y: -50 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -50 }}
className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
<Alert variant="warning" className="backdrop-blur-lg bg-yellow-950/90 border-yellow-600/50">
<AlertTriangle className="h-4 w-4" />
<AlertTitle className="text-yellow-200">
<UchihaText uchihaText="Sharingan Not Activated">Image Required</UchihaText>
</AlertTitle>
<AlertDescription className="text-yellow-300">
{message}
</AlertDescription>
<Button
variant="ghost"
size="sm"
onClick={onClose}
className="absolute top-2 right-2 text-yellow-300 hover:text-yellow-100 hover:bg-yellow-800/20">
<X className="w-4 h-4" />
</Button>
</Alert>
</motion.div>);}
function ProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) 
{const { uchihaMode } = useGlobalContext();
if (!isOpen) return null;
return (<div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-6">
<motion.div
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.8 }}
className="bg-gradient-to-br from-red-950 via-black to-red-900 border border-red-900/30 rounded-lg p-8 max-w-md w-full">
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold text-white">
<UchihaText uchihaText="Clan Leader Profile">Creator Profile</UchihaText>
</h2>
<Button variant="ghost" onClick={onClose} className="text-white hover:bg-red-900/20">
<X className="w-5 h-5" />
</Button>
</div>
<div className="text-center space-y-4">
<div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto flex items-center justify-center">
<Eye className="w-12 h-12 text-white" />
</div>
<div>
<h3 className="text-xl font-semibold text-white mb-2">Nahom Beletew</h3>
<p className="text-gray-300 text-sm leading-relaxed">
<UchihaText uchihaText="The legendary shinobi who mastered the art of visual genjutsu. A devoted follower of the Will of Fire and admirer of Itachi Uchiha's sacrifice.">
The visionary creator behind GenjutsuEdit. A passionate developer and devoted fan of the Naruto universe, 
particularly inspired by the legendary Itachi Uchiha.
</UchihaText></p></div>
<div className="bg-black/30 rounded-lg p-4 space-y-2">
<p className="text-red-300 text-sm">
🍃 <UchihaText uchihaText="Hidden Leaf Village Enthusiast">Boruto & Naruto Enthusiast</UchihaText></p>
<p className="text-red-300 text-sm">👁️ <UchihaText uchihaText="Follower of Itachi's Path">Itachi Uchiha Admirer</UchihaText></p>
<p className="text-red-300 text-sm">⚡ <UchihaText uchihaText="Master of Sharingan Arts">Uchiha Clan Aesthetic</UchihaText></p></div>
<div className="flex justify-center gap-4 mt-6">
<a href="https://github.com/Nahom-cyber-coder" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
<Github className="w-4 h-4" />GitHub</a>
<a href="https://www.linkedin.com/in/nahom-beletew-aba231322/" target="_blank" rel="noopener noreferrer"
className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
<Linkedin className="w-4 h-4" />LinkedIn</a></div>
<p className="text-gray-400 text-xs">
<UchihaText uchihaText="Follow me on GitHub for more legendary shinobi projects and techniques!">
Follow me on GitHub for further good projects!
</UchihaText></p>
<p className="text-gray-400 text-xs">
<UchihaText uchihaText="The true power of the Sharingan lies not in destruction, but in the ability to see beyond reality and create something beautiful for the future.">
"The power of the Sharingan lies not in destruction, but in the ability to see beyond reality and create something beautiful."
</UchihaText></p>
</div>
</motion.div>
</div>);}
function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
const { isDark, setIsDark, uchihaMode, setUchihaMode, selectedMusic, setSelectedMusic,customMusicFile,setCustomMusicFile} = useGlobalContext();
const fileInputRef = useRef<HTMLInputElement>(null);
const musicOptions = [
{ value: "none", label: uchihaMode ? "Silence of the Shinobi" : "No Music" },
{ value: "centuries", label: uchihaMode ? "Centuries (Eternal Legacy)" : "Centuries" },
{ value: "blue-bird", label: uchihaMode ? "Blue Bird (Sasuke's Theme)" : "Blue Bird Opening" },
{ value: "royalty", label: uchihaMode ? "Royalty (Uchiha Power)" : "Royalty" },
{ value: "custom", label: uchihaMode ? "Personal Shinobi Theme" : "Custom Music" }];
const handleCustomMusicUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
const file = event.target.files?.[0];
if (file && file.type.startsWith("audio/")) {
setCustomMusicFile(file);}};
const handleUploadClick = () => {
fileInputRef.current?.click();};
const handleRemoveCustomMusic = () => {
setCustomMusicFile(null);
if (selectedMusic === "custom") {
setSelectedMusic("centuries");}};
if (!isOpen) return null;
return (<div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-6">
<motion.div
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.8 }}
className="bg-gradient-to-br from-red-950 via-black to-red-900 border border-red-900/30 rounded-lg p-8 max-w-md w-full max-h-[80vh] overflow-y-auto">
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold text-white">
<UchihaText uchihaText="Sharingan Configuration">Settings</UchihaText></h2>
<Button variant="ghost" onClick={onClose} className="text-white hover:bg-red-900/20">
<X className="w-5 h-5" /></Button>
</div>
<div className="space-y-6">
<div>
<h3 className="text-lg font-semibold text-white mb-4"><UchihaText uchihaText="Visual Appearance">Appearance</UchihaText></h3>
<div className="space-y-4">
<div className="flex items-center justify-between"><span className="text-gray-300"><UchihaText uchihaText="Shadow Mode">Dark Mode</UchihaText></span>
<Button variant="outline" size="sm" onClick={() => setIsDark(true)}className={`${isDark ? 'bg-red-600 text-white border-red-600' : 'bg-gray-600 text-gray-300 border-gray-600'}`}>
{isDark ? 'On' : 'Off'}
</Button></div>
<div className="flex items-center justify-between">
<span className="text-gray-300">
<UchihaText uchihaText="Daylight Mode">Light Mode</UchihaText></span>
<Button
variant="outline"
size="sm"
onClick={() => setIsDark(false)}
className={`${!isDark ? 'bg-red-600 text-white border-red-600' : 'bg-gray-600 text-gray-300 border-gray-600'}`}>
{!isDark ? 'On' : 'Off'}
</Button>
</div>
</div>
</div>
<div>
<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
<Music className="w-5 h-5" />
<UchihaText uchihaText="Shinobi Soundtracks">Music Selection</UchihaText>
</h3>
<div className="mb-4 p-4 bg-black/30 border border-red-800 rounded-lg">
<h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
<FileMusic className="w-4 h-4" />
<UchihaText uchihaText="Upload Personal Theme">Upload Custom Music</UchihaText>
</h4>
<input
ref={fileInputRef}
type="file"
accept="audio/*"
onChange={handleCustomMusicUpload}
className="hidden"/>
{customMusicFile ? (
<div className="space-y-2">
<div className="flex items-center justify-between bg-green-900/20 border border-green-800 rounded p-2">
<span className="text-green-300 text-sm truncate">
{customMusicFile.name}
</span>
<Button
variant="ghost"
size="sm"
onClick={handleRemoveCustomMusic}
className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
<X className="w-4 h-4" />
</Button>
</div>
</div>
) : (
<Button variant="outline" size="sm" onClick={handleUploadClick} className="w-full bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"> <FileMusic className="w-4 h-4 mr-2" /> <UchihaText uchihaText="Choose Shinobi Theme">Choose Audio File</UchihaText></Button>
)}
<p className="text-gray-400 text-xs mt-2">
<UchihaText uchihaText="Upload your personal shinobi soundtrack (MP3, WAV, etc.)">
Upload your own music file (MP3, WAV, etc.)
</UchihaText>
</p>
</div>
<div className="space-y-2">
{musicOptions.map((option) => (
<Button
key={option.value}
variant="outline"
size="sm"
onClick={() => setSelectedMusic(option.value)}
disabled={option.value === "custom" && !customMusicFile}
className={`w-full justify-start ${
selectedMusic === option.value 
? 'bg-red-600 text-white border-red-600' 
: option.value === "custom" && !customMusicFile
? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
: 'bg-gray-600 text-gray-300 border-gray-600'
}`}>
{option.label}
{option.value === "custom" && !customMusicFile && (
<span className="ml-2 text-xs">
(<UchihaText uchihaText="Upload required">Upload required</UchihaText>)
</span>)}</Button>))}
</div>
<p className="text-gray-400 text-xs mt-2">
<UchihaText uchihaText="Select your preferred shinobi soundtrack to enhance your editing experience">Select your preferred background music for editing</UchihaText></p>
</div>
<div>
<h3 className="text-lg font-semibold text-white mb-4"><UchihaText uchihaText="Clan Abilities">Special Features</UchihaText></h3>
<div className="space-y-4">
<div className="flex items-center justify-between">
<div>
<span className="text-gray-300">
<UchihaText uchihaText="Sharingan Language Mode">Uchiha Text Mode</UchihaText></span>
<p className="text-xs text-gray-500">
<UchihaText uchihaText="Transform interface into Shinobi terminology">Replace text with Uchiha-themed alternatives</UchihaText></p></div>
<Button variant="outline" size="sm"
onClick={() => setUchihaMode(!uchihaMode)}
className={`${uchihaMode ? 'bg-red-600 text-white border-red-600' : 'bg-gray-600 text-gray-300 border-gray-600'}`}>
{uchihaMode ? 'On' : 'Off'}
</Button>
</div>
</div>
</div>
{uchihaMode && (
<div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
<p className="text-red-300 text-sm">
🔥 <UchihaText uchihaText="Sharingan Language Mode Activated! Experience the power of the Uchiha through enhanced shinobi terminology.">
Uchiha Text Mode Active! Experience the power of the Sharingan through enhanced terminology.</UchihaText></p>
</div>)}
</div>
</motion.div>
</div>
);}
function AppPageContent() {
const [selectedTool, setSelectedTool] = useState<string | null>(null);
const [uploadedImage, setUploadedImage] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [pendingRoute, setPendingRoute] = useState<string | null>(null);
const [showProfile, setShowProfile] = useState(false);
const [showSettings, setShowSettings] = useState(false);
const [showError, setShowError] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const fileInputRef = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
const { uchihaMode, isDark } = useGlobalContext();
React.useEffect(() => {
const storedImage = localStorage.getItem("uploadedImage");
if (storedImage) {setUploadedImage(storedImage);}
}, []);
const showErrorMessage = (message: string) => {
setErrorMessage(message);
setShowError(true);
setTimeout(() => setShowError(false), 5000);};
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
const file = event.target.files?.[0];
if (file && file.type.startsWith("image/")) {
const reader = new FileReader();
reader.onload = (e) => {
const result = e.target?.result as string;
setUploadedImage(result);
localStorage.setItem("uploadedImage", result);};
reader.readAsDataURL(file);}};
const handleUploadClick = () => {
fileInputRef.current?.click();};
const handleRemoveImage = () => {
setUploadedImage(null);
localStorage.removeItem("uploadedImage");};
const handleNavigationWithLoader = (route: string) => {
if (!uploadedImage) {
showErrorMessage(uchihaMode 
? "Please awaken your Sharingan with an image first! Channel your chakra through a photograph to begin the genjutsu transformation."
: "Please upload an image first! You need to select a photo before you can use this tool.");return;}
setPendingRoute(route);
setIsLoading(true);};
const handleCartoonConvert = () => {
handleNavigationWithLoader("/cartoon-converter");};
const handlePhotoEditor = () => {
handleNavigationWithLoader("/photo-editor");};
const handleVisualEffects = () => {
handleNavigationWithLoader("/visual-effects");};
const handleElasticPhoto = () => {
handleNavigationWithLoader("/elastic-photo");};
const tools = [
{id: "upload",name: uchihaMode ? "Awaken Sharingan" : "Upload Photos",description: uchihaMode ? "Channel your chakra through photographs" : "Import your images and start your creative journey",icon: Upload,color: "from-red-500 to-red-700",action: uchihaMode ? "Activate" : "Upload",onClick: handleUploadClick,},
{id: "cartoon",
name: uchihaMode ? "Genjutsu Transformation" : "Cartoon Converter",
description: uchihaMode ? "Cast powerful illusions to transform reality" : "Transform your photos into stunning cartoon characters",
icon: Sparkles,
color: "from-purple-500 to-pink-500",
action: uchihaMode ? "Cast Jutsu" : "Convert",
onClick: handleCartoonConvert,},
{id: "editor",
name: uchihaMode ? "Precision Arts" : "Photo Editor",
description: uchihaMode ? "Master the art of visual manipulation with Itachi's precision" : "Professional editing tools with precision control",
icon: Palette,
color: "from-red-600 to-red-800",
action: uchihaMode ? "Execute" : "Edit",
onClick: handlePhotoEditor,},
{id: "effects",
name: uchihaMode ? "Chakra Enhancement" : "Visual Effects",
description: uchihaMode ? "Infuse your images with powerful chakra effects" : "Apply stunning effects and transformations",
icon: Wand2,
color: "from-black to-red-900",
action: uchihaMode ? "Enhance" : "Transform",
onClick: handleVisualEffects,},
{id: "elastic",name: uchihaMode ? "Body Manipulation Jutsu" : "Elastic Photo",
description: uchihaMode ? "Bend reality and reshape forms with ancient techniques" : "Stretch and reshape your photos with elastic deformation",
icon: ImageIcon,
color: "from-green-500 to-emerald-500",
action: uchihaMode ? "Manipulate" : "Elastify",
onClick: handleElasticPhoto,},];
return (<div className={`w-screen min-h-screen ${isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-red-950 via-red-800 to-red-900'} relative overflow-hidden`}>{isLoading && (
<SharinganLoader onAnimationComplete={() => {
setIsLoading(false);
if (pendingRoute) {
navigate(pendingRoute);
setPendingRoute(null);}
}}/>)}
{showError && (
<ErrorAlert 
message={errorMessage} 
onClose={() => setShowError(false)} />)}
<input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
<ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
<SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
<div className="absolute inset-0">
{[...Array(30)].map((_, i) => (
<motion.div
key={i}
className="absolute w-2 h-2 bg-red-500 rounded-full opacity-20"
animate={{
x: [0, Math.random() * 50 - 25],
y: [0, Math.random() * 50 - 25],
opacity: [0.2, 0.6, 0.2],}}
transition={{
duration: Math.random() * 4 + 3,
repeat: Infinity,
repeatType: "reverse",}}
style={{left: `${Math.random() * 100}%`,top: `${Math.random() * 100}%`,}}/>))}</div>
<nav className="relative z-10 border-b border-red-900/30 backdrop-blur-lg bg-black/20">
<div className="w-full px-6 py-4">
<div className="flex justify-between items-center">
<Link to="/" className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-red-100'} hover:text-red-300 transition-colors`}>
<Eye className="w-8 h-8 text-red-500" />
<span className="text-2xl font-bold">
<UchihaText uchihaText="SharinganEdit">GenjutsuEdit</UchihaText></span></Link>
<div className="flex items-center gap-4">
<Link to="/">
<Button variant="ghost" className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20`}>
<Home className="w-4 h-4 mr-2" />
<UchihaText uchihaText="Village">Home</UchihaText>
</Button>
</Link>
<Button 
variant="ghost" 
className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20`}
onClick={() => setShowProfile(true)}>
<User className="w-4 h-4 mr-2" />
<UchihaText uchihaText="Clan Leader">Profile</UchihaText>
</Button>
<Button 
variant="ghost" 
className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20`}
onClick={() => setShowSettings(true)}>
<Settings className="w-4 h-4 mr-2" />
<UchihaText uchihaText="Configuration">Settings</UchihaText>
</Button>
</div></div>
</div></nav>
<div className="relative z-10 w-full px-6 py-8">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="text-center mb-12">
<h1 className={`text-4xl md:text-6xl font-bold ${isDark ? 'text-white' : 'text-red-100'} mb-4`}>
<UchihaText uchihaText="Welcome to SharinganEdit">Welcome to</UchihaText>{" "}
<span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
<UchihaText uchihaText="SharinganEdit">GenjutsuEdit</UchihaText></span></h1>
<p className={`text-xl ${isDark ? 'text-gray-300' : 'text-red-200'} mb-8`}>
<UchihaText uchihaText="Master the ancient art of visual genjutsu with legendary shinobi techniques">
Master the art of visual illusion with powerful photo editing tools</UchihaText></p></motion.div>
<div className="grid lg:grid-cols-3 gap-8">
<motion.div
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8, delay: 0.2 }}
className="lg:col-span-1">
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30 h-[400px] relative">
<CardContent className="p-0 h-full relative">
{uploadedImage ? (
<div className="w-full h-full flex flex-col items-center justify-center p-4">
<img src={uploadedImage} alt="Uploaded"
className="max-w-full max-h-[300px] object-contain rounded-lg shadow-lg mb-4"/>
<div className="flex gap-2">
<Button variant="outline" size="sm" onClick={handleRemoveImage} className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
<X className="w-4 h-4 mr-1" />
<UchihaText uchihaText="Dispel">Remove</UchihaText></Button>
<Button
variant="outline"
size="sm"
onClick={handleUploadClick}
className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
<RotateCcw className="w-4 h-4 mr-1" />
<UchihaText uchihaText="New Vision">Reupload</UchihaText>
</Button>
</div>
</div>
) : (
<>
<Scene3D uploadedImage={uploadedImage} />
<UploadPrompt onUpload={handleUploadClick} />
</>)}
</CardContent>
</Card>
</motion.div>
<motion.div
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8, delay: 0.4 }}
className="lg:col-span-2">
<div className="grid md:grid-cols-2 gap-4">
{tools.map((tool, index) => {
const Icon = tool.icon;
return (<motion.div
key={tool.id}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 * index }}>
<Card className={`backdrop-blur-lg bg-black/30 border-red-900/30 hover:bg-black/40 transition-all cursor-pointer group 
${selectedTool === tool.id ? "ring-2 ring-red-500" : ""
}`}
onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}>
<CardHeader className="pb-3">
<div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
<Icon className="w-6 h-6 text-white" />
</div>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} text-lg`}>{tool.name}</CardTitle>
<CardDescription className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm`}>{tool.description}</CardDescription>
</CardHeader>
<CardContent className="pt-0">
<Button className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white`}
onClick={(e) => {
e.stopPropagation();
tool.onClick();
}}>
{tool.action}
</Button>
</CardContent></Card>
</motion.div>
);})}
</div>
</motion.div></div>
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.6 }}
className="mt-12">
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30">
<CardContent className="p-6">
<div className="flex flex-wrap justify-center gap-4">
<Button variant="ghost" className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20 flex items-center gap-2`}
onClick={handleUploadClick}>
<Upload className="w-4 h-4" />
<UchihaText uchihaText="Quick Activation">Quick Upload</UchihaText>
</Button>
<Button variant="ghost" className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20 flex items-center gap-2`}
onClick={handleCartoonConvert}>
<Sparkles className="w-4 h-4" />
<UchihaText uchihaText="Cast Genjutsu">Convert to Cartoon</UchihaText></Button></div>
</CardContent>
</Card>
</motion.div>
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.8 }}
className="mt-8">
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30">
<CardHeader>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} text-center`}>🔥 <UchihaText uchihaText="Master Your Sharingan Vision">Master Your Creative Vision</UchihaText>
</CardTitle>
</CardHeader>
<CardContent>
<div className="grid md:grid-cols-3 gap-6 text-center">
<div>
<div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
<span className="text-white font-bold">1</span></div>
<h3 className={`${isDark ? 'text-white' : 'text-red-100'} font-semibold mb-2`}>
<UchihaText uchihaText="Awaken Your Sharingan">Upload Your Photo</UchihaText></h3>
<p className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm`}>
<UchihaText uchihaText="Channel your chakra through photographs to begin the jutsu">Import your images and begin your creative journey</UchihaText></p></div>
<div>
<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
<span className="text-white font-bold">2</span></div>
<h3 className={`${isDark ? 'text-white' : 'text-red-100'} font-semibold mb-2`}><UchihaText uchihaText="Select Your Technique">Choose Your Tool</UchihaText></h3>
<p className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm`}>
<UchihaText uchihaText="Master various shinobi arts from our legendary arsenal">Select from our professional editing suite</UchihaText></p></div>
<div>
<div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-3">
<span className="text-white font-bold">3</span></div>
<h3 className={`${isDark ? 'text-white' : 'text-red-100'} font-semibold mb-2`}>
<UchihaText uchihaText="Cast Your Genjutsu">Create Magic</UchihaText></h3>
<p className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm`}>
<UchihaText uchihaText="Bend reality with the power of your Mangekyou Sharingan">
Transform your vision into stunning visual reality
</UchihaText></p></div>
</div>
</CardContent>
</Card>
</motion.div>
</div>
<footer className="relative z-10 border-t border-red-900/30 backdrop-blur-lg bg-black/20 mt-12">
<div className="w-full px-6 py-4">
<div className="text-center">
<p className={`${isDark ? 'text-gray-400' : 'text-red-300'} text-sm`}>Made by <span className="font-semibold text-red-400">Nahom Beletew</span> © 2025 | A 9th grader at Haile Manas Academy</p>
</div>
</div>
</footer>
</div>);}
export default function AppPage() {
return <AppPageContent />;
}
