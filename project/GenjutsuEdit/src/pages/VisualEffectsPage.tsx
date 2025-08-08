import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {Eye,ArrowLeft,Download,RotateCcw,Settings,FileMusic,X,} from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { SharinganLoader } from "@/components/SharinganLoader";
import "@/components/SharinganLoader.css";
function UchihaText({ children, uchihaText }: { children: React.ReactNode; uchihaText?: string }) {
const { uchihaMode } = useGlobalContext();

if (uchihaMode && uchihaText) {
return <>{uchihaText}</>;
}

return <>{children}</>;
}

function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
const { 
isDark, 
setIsDark, 
uchihaMode, 
setUchihaMode, 
selectedMusic, 
setSelectedMusic,
customMusicFile,
setCustomMusicFile
} = useGlobalContext();

const fileInputRef = useRef<HTMLInputElement>(null);

const musicOptions = [
{ value: "none", label: uchihaMode ? "Silence of the Shinobi" : "No Music" },
{ value: "centuries", label: uchihaMode ? "Centuries (Eternal Legacy)" : "Centuries" },
{ value: "blue-bird", label: uchihaMode ? "Blue Bird (Sasuke's Theme)" : "Blue Bird Opening" },
{ value: "royalty", label: uchihaMode ? "Royalty (Uchiha Power)" : "Royalty" },
{ value: "custom", label: uchihaMode ? "Personal Shinobi Theme" : "Custom Music" }
];

const handleCustomMusicUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
const file = event.target.files?.[0];
if (file && file.type.startsWith("audio/")) {
setCustomMusicFile(file);
}
};

const handleUploadClick = () => {
fileInputRef.current?.click();
};

const handleRemoveCustomMusic = () => {
setCustomMusicFile(null);
if (selectedMusic === "custom") {
setSelectedMusic("centuries");
}
};

if (!isOpen) return null;

return (
<div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-6">
<motion.div
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.8 }}
className="bg-gradient-to-br from-red-950 via-black to-red-900 border border-red-900/30 rounded-lg p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
>
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold text-white">
<UchihaText uchihaText="Sharingan Configuration">Settings</UchihaText>
</h2>
<Button variant="ghost" onClick={onClose} className="text-white hover:bg-red-900/20">
<span className="text-xl">×</span>
</Button>
</div>

<div className="space-y-6">
<div>
<h3 className="text-lg font-semibold text-white mb-4">
<UchihaText uchihaText="Visual Appearance">Appearance</UchihaText>
</h3>
<div className="space-y-4">
<div className="flex items-center justify-between">
<span className="text-gray-300">
<UchihaText uchihaText="Shadow Mode">Dark Mode</UchihaText>
</span>
<Button
variant="outline"
size="sm"
onClick={() => setIsDark(true)}
className={`${isDark ? 'bg-red-600 text-white border-red-600' : 'bg-gray-600 text-gray-300 border-gray-600'}`}
>
{isDark ? 'On' : 'Off'}
</Button>
</div>

<div className="flex items-center justify-between">
<span className="text-gray-300">
<UchihaText uchihaText="Daylight Mode">Light Mode</UchihaText>
</span>
<Button
variant="outline"
size="sm"
onClick={() => setIsDark(false)}
className={`${!isDark ? 'bg-red-600 text-white border-red-600' : 'bg-gray-600 text-gray-300 border-gray-600'}`}
>
{!isDark ? 'On' : 'Off'}
</Button>
</div>
</div>
</div>

<div>
<h3 className="text-lg font-semibold text-white mb-4">
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
className="hidden"
/>

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
className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
>
<X className="w-4 h-4" />
</Button>
</div>
</div>
) : (
<Button
variant="outline"
size="sm"
onClick={handleUploadClick}
className="w-full bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
>
<FileMusic className="w-4 h-4 mr-2" />
<UchihaText uchihaText="Choose Shinobi Theme">Choose Audio File</UchihaText>
</Button>
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
}`}
>
{option.label}
{option.value === "custom" && !customMusicFile && (
<span className="ml-2 text-xs">
(<UchihaText uchihaText="Upload required">Upload required</UchihaText>)
</span>
)}
</Button>
))}
</div>
</div>

<div>
<h3 className="text-lg font-semibold text-white mb-4">
<UchihaText uchihaText="Clan Abilities">Special Features</UchihaText>
</h3>
<div className="space-y-4">
<div className="flex items-center justify-between">
<div>
<span className="text-gray-300">
<UchihaText uchihaText="Sharingan Language Mode">Uchiha Text Mode</UchihaText>
</span>
<p className="text-xs text-gray-500">
<UchihaText uchihaText="Transform interface into Shinobi terminology">
Replace text with Uchiha-themed alternatives
</UchihaText>
</p>
</div>
<Button
variant="outline"
size="sm"
onClick={() => setUchihaMode(!uchihaMode)}
className={`${uchihaMode ? 'bg-red-600 text-white border-red-600' : 'bg-gray-600 text-gray-300 border-gray-600'}`}
>
{uchihaMode ? 'On' : 'Off'}
</Button>
</div>
</div>
</div>
</div>
</motion.div>
</div>
);
}

interface ImageAdjustments {
brightness: number;
contrast: number;
saturation: number;
hue: number;
blur: number;
sepia: number;
grayscale: number;
}

function VisualEffectsContent() {
const [uploadedImage, setUploadedImage] = useState<string | null>(null);
const [adjustments, setAdjustments] = useState<ImageAdjustments>({
brightness: 100,
contrast: 100,
saturation: 100,
hue: 0,
blur: 0,
sepia: 0,
grayscale: 0,
});
const [showSettings, setShowSettings] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const canvasRef = useRef<HTMLCanvasElement>(null);
const imageRef = useRef<HTMLImageElement>(null);
const { uchihaMode, isDark } = useGlobalContext();

useEffect(() => {
const timer = setTimeout(() => {
setIsLoading(false);
}, 2000);

return () => clearTimeout(timer);
}, []);

useEffect(() => {
const storedImage = localStorage.getItem("uploadedImage");

if (storedImage) {
setUploadedImage(storedImage);
}
}, []);

const applyFilters = () => {
const canvas = canvasRef.current;
const ctx = canvas?.getContext("2d");
const img = imageRef.current;

if (!canvas || !ctx || !img) return;

const maxSize = 400;
const ratio = Math.min(maxSize / img.naturalWidth, maxSize / img.naturalHeight);
canvas.width = img.naturalWidth * ratio;
canvas.height = img.naturalHeight * ratio;

ctx.filter = `
brightness(${adjustments.brightness}%)
contrast(${adjustments.contrast}%)
saturate(${adjustments.saturation}%)
hue-rotate(${adjustments.hue}deg)
blur(${adjustments.blur}px)
sepia(${adjustments.sepia}%)
grayscale(${adjustments.grayscale}%)
`;

ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

useEffect(() => {
if (uploadedImage) {
applyFilters();
}
}, [adjustments, uploadedImage]);

const handleAdjustmentChange = (key: keyof ImageAdjustments, value: number) => {
setAdjustments(prev => ({
...prev,
[key]: value
}));
};

const resetAdjustments = () => {
setAdjustments({
brightness: 100,
contrast: 100,
saturation: 100,
hue: 0,
blur: 0,
sepia: 0,
grayscale: 0,
});
};

const handleDownload = () => {
const canvas = canvasRef.current;
const img = imageRef.current;
if (!canvas || !img) return;

const downloadCanvas = document.createElement("canvas");
const downloadCtx = downloadCanvas.getContext("2d");
if (!downloadCtx) return;

downloadCanvas.width = img.naturalWidth;
downloadCanvas.height = img.naturalHeight;

downloadCtx.filter = `
brightness(${adjustments.brightness}%)
contrast(${adjustments.contrast}%)
saturate(${adjustments.saturation}%)
hue-rotate(${adjustments.hue}deg)
blur(${adjustments.blur}px)
sepia(${adjustments.sepia}%)
grayscale(${adjustments.grayscale}%)
`;

downloadCtx.drawImage(img, 0, 0);

const link = document.createElement("a");
link.href = downloadCanvas.toDataURL("image/png");
link.download = "visual-effects-photo.png";
link.click();
};

const adjustmentControls = [
{
key: "brightness" as keyof ImageAdjustments,
label: uchihaMode ? "Chakra Intensity" : "Brightness",
min: 0,
max: 200,
step: 1,
unit: "%",
},
{
key: "contrast" as keyof ImageAdjustments,
label: uchihaMode ? "Shadow Definition" : "Contrast",
min: 0,
max: 200,
step: 1,
unit: "%",
},
{
key: "saturation" as keyof ImageAdjustments,
label: uchihaMode ? "Color Chakra" : "Saturation",
min: 0,
max: 200,
step: 1,
unit: "%",
},
{
key: "hue" as keyof ImageAdjustments,
label: uchihaMode ? "Elemental Shift" : "Hue",
min: -180,
max: 180,
step: 1,
unit: "°",
},
{
key: "blur" as keyof ImageAdjustments,
label: uchihaMode ? "Mist Technique" : "Blur",
min: 0,
max: 10,
step: 0.1,
unit: "px",
},
{
key: "sepia" as keyof ImageAdjustments,
label: uchihaMode ? "Ancient Scroll" : "Sepia",
min: 0,
max: 100,
step: 1,
unit: "%",
},
{
key: "grayscale" as keyof ImageAdjustments,
label: uchihaMode ? "Shadow Clone" : "Grayscale",
min: 0,
max: 100,
step: 1,
unit: "%",
},
];

if (isLoading) {
return <SharinganLoader onAnimationComplete={() => setIsLoading(false)} />;
}

return (
<div className={`w-screen min-h-screen ${isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-red-950 via-red-800 to-red-900'} relative overflow-hidden`}>
<SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

<nav className="relative z-10 border-b border-red-900/30 backdrop-blur-lg bg-black/20">
<div className="w-full px-6 py-4">
<div className="flex justify-between items-center">
<Link to="/app" className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-red-100'} hover:text-red-300 transition-colors`}>
<ArrowLeft className="w-5 h-5" />
<Eye className="w-8 h-8 text-red-500" />
<span className="text-2xl font-bold">
<UchihaText uchihaText="SharinganEdit">GenjutsuEdit</UchihaText>
</span>
</Link>

<div className="flex items-center gap-4">
<Button 
variant="ghost" 
className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20`}
onClick={() => setShowSettings(true)}
>
<Settings className="w-4 h-4 mr-2" />
<UchihaText uchihaText="Configuration">Settings</UchihaText>
</Button>
<Button variant="ghost" className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20`} onClick={resetAdjustments}>
<RotateCcw className="w-4 h-4 mr-2" />
<UchihaText uchihaText="Restore">Reset</UchihaText>
</Button>
<Button variant="ghost" className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20`} onClick={handleDownload}>
<Download className="w-4 h-4 mr-2" />
<UchihaText uchihaText="Save Jutsu">Download</UchihaText>
</Button>
</div>
</div>
</div>
</nav>

<div className="relative z-10 w-full px-6 py-8">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="text-center mb-8"
>
<h1 className={`text-4xl md:text-6xl font-bold ${isDark ? 'text-white' : 'text-red-100'} mb-4`}>
<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
<UchihaText uchihaText="Chakra Enhancement">Visual Effects</UchihaText>
</span>
</h1>
<p className={`text-xl ${isDark ? 'text-gray-300' : 'text-red-200'}`}>
<UchihaText uchihaText="Infuse your images with powerful chakra effects and elemental manipulation">
Fine-tune your image with professional adjustments
</UchihaText>
</p>
</motion.div>

<div className="grid lg:grid-cols-3 gap-6">
<div className="lg:col-span-1">
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30">
<CardHeader>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'}`}>
<UchihaText uchihaText="Chakra Adjustments">Image Adjustments</UchihaText>
</CardTitle>
</CardHeader>
<CardContent className="space-y-6">
{adjustmentControls.map((control) => (
<div key={control.key}>
<label className={`${isDark ? 'text-white' : 'text-red-100'} text-sm mb-2 block`}>
{control.label}: {adjustments[control.key]}{control.unit}
</label>
<Slider
value={[adjustments[control.key]]}
onValueChange={(value) => handleAdjustmentChange(control.key, value[0])}
max={control.max}
min={control.min}
step={control.step}
className="w-full"
/>
</div>
))}
</CardContent>
</Card>
</div>

<div className="lg:col-span-2">
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30">
<CardContent className="p-6 flex justify-center">
{uploadedImage ? (
<div className="relative">
<img
ref={imageRef}
src={uploadedImage}
alt="Original"
className="hidden"
onLoad={applyFilters}
/>
<canvas
ref={canvasRef}
className="border border-red-900/30 rounded"
/>
</div>
) : (
<div className="w-96 h-96 flex items-center justify-center">
<Card className="backdrop-blur-lg bg-black/40 border-red-900/50 max-w-sm">
<CardContent className="p-6 text-center">
<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center">
<Eye className="w-8 h-8 text-white" />
</div>
<h3 className="text-white text-lg font-semibold mb-2">
<UchihaText uchihaText="Awaken Your Sharingan">No Image Found</UchihaText>
</h3>
<p className="text-gray-300 text-sm">
<UchihaText uchihaText="Return to the village and channel your chakra through a photograph">
Please go back and upload an image first
</UchihaText>
</p>
</CardContent>
</Card>
</div>
)}
</CardContent>
</Card>
</div>
</div>
</div>

<footer className="relative z-10 border-t border-red-900/30 backdrop-blur-lg bg-black/20 mt-12">
<div className="w-full px-6 py-4">
<div className="text-center">
<p className={`${isDark ? 'text-gray-400' : 'text-red-300'} text-sm`}>
Made by <span className="font-semibold text-red-400">Nahom Beletew</span> © 2025 | A 9th grader at Haile Manas Academy
</p>
</div>
</div>
</footer>
</div>
);
}

export default function VisualEffectsPage() {
return <VisualEffectsContent />;
}
