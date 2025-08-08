import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Eye, ArrowLeft, Download, RotateCcw, Hand, Move, Settings, Recycle as Reflect, FileMusic, X, Upload, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { SharinganLoader } from "@/components/SharinganLoader";
import "@/components/SharinganLoader.css";

function UchihaText({ children, uchihaText }: { children: React.ReactNode; uchihaText?: string }) {
const { uchihaMode } = useGlobalContext();

if (uchihaText && uchihaMode) {
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

<p className="text-gray-400 text-xs mt-2">
<UchihaText uchihaText="Select your preferred shinobi soundtrack to enhance your editing experience">
Select your preferred background music for editing
</UchihaText>
</p>
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

interface Point {
x: number;
y: number;
}

function ElasticPhotoContent() {
const [elasticImage, setElasticImage] = useState<string | null>(null);
const [isDeforming, setIsDeforming] = useState(false);
const [deformStrength, setDeformStrength] = useState([50]);
const [deformRadius, setDeformRadius] = useState([30]);
const [symmetryLines, setSymmetryLines] = useState([0]);
const [symmetryType, setSymmetryType] = useState<'horizontal' | 'vertical' | 'both'>('horizontal');
const canvasRef = useRef<HTMLCanvasElement>(null);
const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
const originalImageRef = useRef<HTMLImageElement | null>(null);
const [isDragging, setIsDragging] = useState(false);
const [lastPoint, setLastPoint] = useState<Point | null>(null);
const [showSettings, setShowSettings] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const fileInputRef = useRef<HTMLInputElement>(null);
const { uchihaMode, isDark } = useGlobalContext();

React.useEffect(() => {
const timer = setTimeout(() => {
setIsLoading(false);
}, 2000);

return () => clearTimeout(timer);
}, []);

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
const file = event.target.files?.[0];
if (file && file.type.startsWith("image/")) {
const reader = new FileReader();
reader.onload = (e) => {
const result = e.target?.result as string;
setElasticImage(result);

const img = new Image();
img.crossOrigin = "anonymous";
img.onload = () => {
originalImageRef.current = img;
drawImageToCanvas(img);
drawSymmetryOverlay();
};
img.src = result;
};
reader.readAsDataURL(file);
}
};

const handleUploadClick = () => {
fileInputRef.current?.click();
};

const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
const canvas = canvasRef.current;
if (!canvas) return;

const ctx = canvas.getContext("2d");
if (!ctx) return;

const maxSize = 400;
const ratio = Math.min(maxSize / img.width, maxSize / img.height);
canvas.width = img.width * ratio;
canvas.height = img.height * ratio;

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}, []);

const drawSymmetryOverlay = useCallback(() => {
const overlayCanvas = overlayCanvasRef.current;
const mainCanvas = canvasRef.current;
if (!overlayCanvas || !mainCanvas) return;

const ctx = overlayCanvas.getContext("2d");
if (!ctx) return;

overlayCanvas.width = mainCanvas.width;
overlayCanvas.height = mainCanvas.height;

ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

if (symmetryLines[0] > 0) {
ctx.strokeStyle = "#00ff00";
ctx.lineWidth = 2;
ctx.setLineDash([5, 5]);
ctx.globalAlpha = 0.7;

if (symmetryLines[0] === 1) {
if (symmetryType === 'horizontal') {
ctx.beginPath();
ctx.moveTo(0, overlayCanvas.height / 2);
ctx.lineTo(overlayCanvas.width, overlayCanvas.height / 2);
ctx.stroke();
} else if (symmetryType === 'vertical') {
ctx.beginPath();
ctx.moveTo(overlayCanvas.width / 2, 0);
ctx.lineTo(overlayCanvas.width / 2, overlayCanvas.height);
ctx.stroke();
}
} else if (symmetryLines[0] === 2) {
ctx.beginPath();
ctx.moveTo(0, overlayCanvas.height / 2);
ctx.lineTo(overlayCanvas.width, overlayCanvas.height / 2);
ctx.moveTo(overlayCanvas.width / 2, 0);
ctx.lineTo(overlayCanvas.width / 2, overlayCanvas.height);
ctx.stroke();
}

ctx.restore();
}
}, [symmetryLines, symmetryType]);

const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
const canvas = canvasRef.current;
if (!canvas) return { x: 0, y: 0 };

const rect = canvas.getBoundingClientRect();
return {
x: (e.clientX - rect.left) * (canvas.width / rect.width),
y: (e.clientY - rect.top) * (canvas.height / rect.height),
};
};

const applySymmetricDeformation = (centerX: number, centerY: number, deltaX: number, deltaY: number) => {
const canvas = canvasRef.current;
if (!canvas || !originalImageRef.current) return;

applyElasticDeformation(centerX, centerY, deltaX, deltaY);

if (symmetryLines[0] > 0) {
const width = canvas.width;
const height = canvas.height;

if (symmetryLines[0] === 1) {
if (symmetryType === 'horizontal') {
const mirrorY = height - centerY;
applyElasticDeformation(centerX, mirrorY, deltaX, -deltaY);
} else if (symmetryType === 'vertical') {
const mirrorX = width - centerX;
applyElasticDeformation(mirrorX, centerY, -deltaX, deltaY);
}
} else if (symmetryLines[0] === 2) {
const mirrorX = width - centerX;
const mirrorY = height - centerY;

applyElasticDeformation(mirrorX, centerY, -deltaX, deltaY);
applyElasticDeformation(centerX, mirrorY, deltaX, -deltaY);
applyElasticDeformation(mirrorX, mirrorY, -deltaX, -deltaY);
}
}
};

const applyElasticDeformation = (centerX: number, centerY: number, deltaX: number, deltaY: number) => {
const canvas = canvasRef.current;
if (!canvas || !originalImageRef.current) return;

const ctx = canvas.getContext("2d");
if (!ctx) return;

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;
const width = canvas.width;
const height = canvas.height;

const newImageData = ctx.createImageData(width, height);
const newData = newImageData.data;

const radius = deformRadius[0];
const strength = deformStrength[0] / 100;

for (let y = 0; y < height; y++) {
for (let x = 0; x < width; x++) {
const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

if (distance < radius) {
const factor = (1 - distance / radius) * strength;

const sourceX = Math.round(x - deltaX * factor);
const sourceY = Math.round(y - deltaY * factor);

if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
const sourceIndex = (sourceY * width + sourceX) * 4;
const targetIndex = (y * width + x) * 4;

newData[targetIndex] = data[sourceIndex];
newData[targetIndex + 1] = data[sourceIndex + 1];
newData[targetIndex + 2] = data[sourceIndex + 2];
newData[targetIndex + 3] = data[sourceIndex + 3];
} else {
const targetIndex = (y * width + x) * 4;
newData[targetIndex] = data[targetIndex];
newData[targetIndex + 1] = data[targetIndex + 1];
newData[targetIndex + 2] = data[targetIndex + 2];
newData[targetIndex + 3] = data[targetIndex + 3];
}
} else {
const index = (y * width + x) * 4;
newData[index] = data[index];
newData[index + 1] = data[index + 1];
newData[index + 2] = data[index + 2];
newData[index + 3] = data[index + 3];
}
}
}

ctx.putImageData(newImageData, 0, 0);
};

const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
if (!isDeforming) return;

setIsDragging(true);
const point = getCanvasPoint(e);
setLastPoint(point);
};

const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
if (!isDragging || !lastPoint || !isDeforming) return;

const currentPoint = getCanvasPoint(e);
const deltaX = currentPoint.x - lastPoint.x;
const deltaY = currentPoint.y - lastPoint.y;

if (symmetryLines[0] > 0) {
applySymmetricDeformation(lastPoint.x, lastPoint.y, deltaX, deltaY);
} else {
applyElasticDeformation(lastPoint.x, lastPoint.y, deltaX, deltaY);
}

setLastPoint(currentPoint);
};

const handleMouseUp = () => {
setIsDragging(false);
setLastPoint(null);
};

const resetImage = () => {
if (originalImageRef.current) {
drawImageToCanvas(originalImageRef.current);
}
};

const handleDownload = () => {
const canvas = canvasRef.current;
if (!canvas) return;

const downloadCanvas = document.createElement("canvas");
const downloadCtx = downloadCanvas.getContext("2d");
if (!downloadCtx) return;

downloadCanvas.width = canvas.width;
downloadCanvas.height = canvas.height;

downloadCtx.drawImage(canvas, 0, 0);

const link = document.createElement("a");
link.href = downloadCanvas.toDataURL("image/png");
link.download = "elastic-photo.png";
link.click();
};

const handleSymmetryChange = (value: number) => {
setSymmetryLines([value]);
drawSymmetryOverlay();
};

const handleSymmetryTypeChange = (type: 'horizontal' | 'vertical' | 'both') => {
setSymmetryType(type);
drawSymmetryOverlay();
};

React.useEffect(() => {
drawSymmetryOverlay();
}, [symmetryLines, symmetryType, drawSymmetryOverlay]);

if (isLoading) {
return <SharinganLoader onAnimationComplete={() => setIsLoading(false)} />;
}

return (
<div className={`w-screen min-h-screen ${isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-red-950 via-red-800 to-red-900'} relative overflow-hidden`}>
<SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

<input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

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
<Button variant="ghost" className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20`} onClick={resetImage}>
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
<span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
<UchihaText uchihaText="Body Manipulation Jutsu">Elastic Photo</UchihaText>
</span>
</h1>
<p className={`text-xl ${isDark ? 'text-gray-300' : 'text-red-200'}`}>
<UchihaText uchihaText="Bend reality and reshape forms with ancient manipulation techniques">
Stretch and reshape your photos with elastic deformation
</UchihaText>
</p>
</motion.div>

<div className="grid lg:grid-cols-3 gap-6">
<div className="lg:col-span-1">
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30 mb-6">
<CardHeader>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} flex items-center gap-2`}>
<Hand className="w-5 h-5" />
<UchihaText uchihaText="Manipulation Controls">Elastic Controls</UchihaText>
</CardTitle>
</CardHeader>
<CardContent className="space-y-6">
<div>
<label className={`${isDark ? 'text-white' : 'text-red-100'} text-sm mb-2 block`}>
<UchihaText uchihaText="Jutsu Strength">Deformation Strength</UchihaText>: {deformStrength[0]}%
</label>
<Slider
value={deformStrength}
onValueChange={setDeformStrength}
max={100}
min={10}
step={5}
className="w-full"
/>
</div>
<div>
<label className={`${isDark ? 'text-white' : 'text-red-100'} text-sm mb-2 block`}>
<UchihaText uchihaText="Chakra Radius">Effect Radius</UchihaText>: {deformRadius[0]}px
</label>
<Slider
value={deformRadius}
onValueChange={setDeformRadius}
max={100}
min={10}
step={5}
className="w-full"
/>
</div>
<Button
onClick={() => setIsDeforming(!isDeforming)}
className={`w-full ${
isDeforming ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
}`}
disabled={!elasticImage}
>
<Move className="mr-2 h-4 w-4" />
{isDeforming ? 
<UchihaText uchihaText="Deactivate Jutsu">Stop Deforming</UchihaText> : 
<UchihaText uchihaText="Activate Jutsu">Start Deforming</UchihaText>
}
</Button>
</CardContent>
</Card>

<Card className="backdrop-blur-lg bg-black/30 border-red-900/30 mb-6">
<CardHeader>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} flex items-center gap-2`}>
<Reflect className="w-5 h-5" />
<UchihaText uchihaText="Mirror Technique">Symmetry</UchihaText>
</CardTitle>
</CardHeader>
<CardContent className="space-y-6">
<div>
<label className={`${isDark ? 'text-white' : 'text-red-100'} text-sm mb-2 block`}>
<UchihaText uchihaText="Mirror Lines">Symmetry Lines</UchihaText>: {symmetryLines[0]}
</label>
<Slider
value={symmetryLines}
onValueChange={(value) => handleSymmetryChange(value[0])}
max={2}
min={0}
step={1}
className="w-full"
/>
<div className={`${isDark ? 'text-gray-400' : 'text-red-300'} text-xs mt-1`}>
0: <UchihaText uchihaText="No mirroring">No symmetry</UchihaText> | 1: <UchihaText uchihaText="Single mirror">Single axis</UchihaText> | 2: <UchihaText uchihaText="Dual mirror">Both axes</UchihaText>
</div>
</div>

{symmetryLines[0] === 1 && (
<div>
<label className={`${isDark ? 'text-white' : 'text-red-100'} text-sm mb-2 block`}>
<UchihaText uchihaText="Mirror Direction">Symmetry Type</UchihaText>
</label>
<div className="flex gap-2">
<Button
variant="outline"
size="sm"
onClick={() => handleSymmetryTypeChange('horizontal')}
className={`flex-1 ${
symmetryType === 'horizontal' 
? 'bg-green-600 text-white border-green-600' 
: 'bg-gray-600 text-gray-300 border-gray-600'
}`}
>
<UchihaText uchihaText="Horizontal">Horizontal</UchihaText>
</Button>
<Button
variant="outline"
size="sm"
onClick={() => handleSymmetryTypeChange('vertical')}
className={`flex-1 ${
symmetryType === 'vertical' 
? 'bg-green-600 text-white border-green-600' 
: 'bg-gray-600 text-gray-300 border-gray-600'
}`}
>
<UchihaText uchihaText="Vertical">Vertical</UchihaText>
</Button>
</div>
</div>
)}

{symmetryLines[0] > 0 && (
<div className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-xs p-3 bg-green-900/20 border border-green-800 rounded`}>
<p className="font-semibold mb-1">
<UchihaText uchihaText="Mirror Technique Active:">Symmetry Active:</UchihaText>
</p>
{symmetryLines[0] === 1 ? (
<p>
<UchihaText uchihaText={`Single ${symmetryType} mirror - deformations will be mirrored across the ${symmetryType} center line`}>
Single {symmetryType} axis - deformations will be mirrored across the {symmetryType} center line
</UchihaText>
</p>
) : (
<p>
<UchihaText uchihaText="Dual mirror technique - deformations will be mirrored across both horizontal and vertical center lines (4-way symmetry)">
Both axes - deformations will be mirrored across both horizontal and vertical center lines (4-way symmetry)
</UchihaText>
</p>
)}
</div>
)}
</CardContent>
</Card>

<Card className="backdrop-blur-lg bg-black/30 border-red-900/30">
<CardHeader>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'}`}>
<UchihaText uchihaText="Technique Guide">Instructions</UchihaText>
</CardTitle>
</CardHeader>
<CardContent>
<div className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm space-y-2`}>
<p>• <UchihaText uchihaText="Upload an image to begin manipulation">Upload an image to begin elastic editing</UchihaText></p>
<p>• <UchihaText uchihaText="Activate jutsu to enable manipulation mode">Click "Start Deforming" to enable elastic mode</UchihaText></p>
<p>• <UchihaText uchihaText="Set mirror lines for symmetric effects">Set symmetry lines for mirrored effects</UchihaText></p>
<p>• <UchihaText uchihaText="Channel chakra through touch to reshape forms">Click and drag on the image to stretch areas</UchihaText></p>
<p>• <UchihaText uchihaText="Adjust power and range for different effects">Adjust strength and radius for different effects</UchihaText></p>
<p>• <UchihaText uchihaText="Use restore to return to original form">Use reset to restore original image</UchihaText></p>
</div>
</CardContent>
</Card>
</div>

<div className="lg:col-span-2">
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30">
<CardHeader>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} flex items-center gap-2`}>
<Hand className="w-5 h-5" />
<UchihaText uchihaText="Manipulation Canvas">Elastic Canvas</UchihaText>
{symmetryLines[0] > 0 && (
<span className="text-green-400 text-sm">
(<UchihaText uchihaText="Mirror Active">Symmetry Active</UchihaText>)
</span>
)}
</CardTitle>
</CardHeader>
<CardContent className="p-6 flex justify-center">
{elasticImage ? (
<div className="relative">
<canvas
ref={canvasRef}
className={`border-2 rounded-lg ${
isDeforming ? "border-blue-500 cursor-grab active:cursor-grabbing" : "border-red-900/30"
} ${symmetryLines[0] > 0 ? "shadow-lg shadow-green-500/20" : ""}`}
onMouseDown={handleMouseDown}
onMouseMove={handleMouseMove}
onMouseUp={handleMouseUp}
onMouseLeave={handleMouseUp}
/>
<canvas
ref={overlayCanvasRef}
className="absolute top-0 left-0 pointer-events-none"
style={{ 
width: canvasRef.current?.offsetWidth || 'auto',
height: canvasRef.current?.offsetHeight || 'auto'
}}
/>
</div>
) : (
<div className="w-96 h-96 flex items-center justify-center">
<Card className="backdrop-blur-lg bg-black/40 border-red-900/50 max-w-sm">
<CardContent className="p-6 text-center">
<motion.div
animate={{ 
rotate: [0, 360],
scale: [1, 1.1, 1]
}}
transition={{ 
rotate: { duration: 8, repeat: Infinity, ease: "linear" },
scale: { duration: 2, repeat: Infinity }
}}
className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
>
<ImageIcon className="w-8 h-8 text-white" />
</motion.div>

<h3 className="text-white text-lg font-semibold mb-2">
<UchihaText uchihaText="Upload Image for Manipulation">Upload Image for Elastic Editing</UchihaText>
</h3>

<p className="text-gray-300 text-sm mb-4">
<UchihaText uchihaText="Select a photograph to begin the body manipulation jutsu">
Select a photo to start elastic deformation
</UchihaText>
</p>

<Button
onClick={handleUploadClick}
className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
>
<Upload className="w-4 h-4 mr-2" />
<UchihaText uchihaText="Select Image">Upload Photo</UchihaText>
</Button>
</CardContent>
</Card>
</div>
)}
</CardContent>
</Card>

{isDeforming && elasticImage && (
<Card className="backdrop-blur-lg bg-blue-900/20 border-blue-800 mt-4">
<CardContent className="p-4">
<div className="flex items-center space-x-2">
<Hand className="h-5 w-5 text-blue-400" />
<span className="text-blue-200">
<UchihaText uchihaText="Body Manipulation Jutsu active! Channel your chakra through touch to reshape and deform areas.">
Elastic mode active! Click and drag on the image to stretch and deform areas.
</UchihaText>
{symmetryLines[0] > 0 && (
<span className="text-green-300">
{" "}
<UchihaText uchihaText="Mirror technique will apply symmetric effects.">
Symmetry will apply mirrored effects.
</UchihaText>
</span>
)}
</span>
</div>
</CardContent>
</Card>
)}
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

export default function ElasticPhotoPage() {
return <ElasticPhotoContent />;
}
