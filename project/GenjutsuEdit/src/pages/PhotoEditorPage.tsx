import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {Eye, ArrowLeft, Download, RotateCw, FlipHorizontal, Crop,  Type, Move,Settings,FileMusic,  X,} from "lucide-react";
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

interface TextElement {
id: string;
text: string;
x: number;
y: number;
fontSize: number;
color: string;
fontFamily: string;
isDragging?: boolean;
}

function PhotoEditorContent() {
const [uploadedImage, setUploadedImage] = useState<string | null>(null);
const [editedImage, setEditedImage] = useState<string | null>(null);
const [textElements, setTextElements] = useState<TextElement[]>([]);
const [selectedTool, setSelectedTool] = useState<string | null>(null);
const [newText, setNewText] = useState("");
const [textColor, setTextColor] = useState("#ffffff");
const [fontSize, setFontSize] = useState(24);
const [cropMode, setCropMode] = useState(false);
const [cropStart, setCropStart] = useState({ x: 0, y: 0 });
const [cropEnd, setCropEnd] = useState({ x: 0, y: 0 });
const [isDragging, setIsDragging] = useState(false);
const [isResizing, setIsResizing] = useState(false);
const [resizeHandle, setResizeHandle] = useState<string>("");
const [draggedTextId, setDraggedTextId] = useState<string | null>(null);
const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
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
setEditedImage(storedImage);
}
}, []);

const drawCanvas = () => {
const canvas = canvasRef.current;
const ctx = canvas?.getContext("2d");
const img = imageRef.current;

if (!canvas || !ctx || !img || !editedImage) return;

const maxSize = 400;
const ratio = Math.min(maxSize / img.naturalWidth, maxSize / img.naturalHeight);
canvas.width = img.naturalWidth * ratio;
canvas.height = img.naturalHeight * ratio;

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

textElements.forEach((textEl) => {
ctx.font = `${textEl.fontSize}px ${textEl.fontFamily}`;
ctx.fillStyle = textEl.color;
ctx.fillText(textEl.text, textEl.x, textEl.y);

if (selectedTool === "text") {
ctx.strokeStyle = "#00ff00";
ctx.lineWidth = 1;
ctx.setLineDash([3, 3]);
const textWidth = ctx.measureText(textEl.text).width;
ctx.strokeRect(textEl.x - 2, textEl.y - textEl.fontSize - 2, textWidth + 4, textEl.fontSize + 4);
ctx.setLineDash([]);
}
});

if (cropMode && (isDragging || (cropStart.x !== cropEnd.x && cropStart.y !== cropEnd.y))) {
const x = Math.min(cropStart.x, cropEnd.x);
const y = Math.min(cropStart.y, cropEnd.y);
const width = Math.abs(cropEnd.x - cropStart.x);
const height = Math.abs(cropEnd.y - cropStart.y);

ctx.strokeStyle = "#ff0000";
ctx.lineWidth = 2;
ctx.setLineDash([]);

const cornerLength = 20;

ctx.beginPath();
ctx.moveTo(x, y + cornerLength);
ctx.lineTo(x, y);
ctx.lineTo(x + cornerLength, y);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(x + width - cornerLength, y);
ctx.lineTo(x + width, y);
ctx.lineTo(x + width, y + cornerLength);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(x, y + height - cornerLength);
ctx.lineTo(x, y + height);
ctx.lineTo(x + cornerLength, y + height);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(x + width - cornerLength, y + height);
ctx.lineTo(x + width, y + height);
ctx.lineTo(x + width, y + height - cornerLength);
ctx.stroke();

const handleSize = 8;
ctx.fillStyle = "#ff0000";

ctx.fillRect(x - handleSize/2, y - handleSize/2, handleSize, handleSize);
ctx.fillRect(x + width - handleSize/2, y - handleSize/2, handleSize, handleSize);
ctx.fillRect(x - handleSize/2, y + height - handleSize/2, handleSize, handleSize);
ctx.fillRect(x + width - handleSize/2, y + height - handleSize/2, handleSize, handleSize);

ctx.fillRect(x + width/2 - handleSize/2, y - handleSize/2, handleSize, handleSize);
ctx.fillRect(x + width/2 - handleSize/2, y + height - handleSize/2, handleSize, handleSize);
ctx.fillRect(x - handleSize/2, y + height/2 - handleSize/2, handleSize, handleSize);
ctx.fillRect(x + width - handleSize/2, y + height/2 - handleSize/2, handleSize, handleSize);
}
};

useEffect(() => {
if (editedImage) {
drawCanvas();
}
}, [editedImage, textElements, cropMode, cropStart, cropEnd, isDragging, selectedTool]);

const handleRotate = () => {
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const img = imageRef.current;

if (!ctx || !img) return;

canvas.width = img.naturalHeight;
canvas.height = img.naturalWidth;

ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.rotate(Math.PI / 2);
ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

const rotatedDataUrl = canvas.toDataURL("image/png");
setEditedImage(rotatedDataUrl);
};

const handleFlip = () => {
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const img = imageRef.current;

if (!ctx || !img) return;

canvas.width = img.naturalWidth;
canvas.height = img.naturalHeight;

ctx.scale(-1, 1);
ctx.drawImage(img, -canvas.width, 0);

const flippedDataUrl = canvas.toDataURL("image/png");
setEditedImage(flippedDataUrl);
};

const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
const canvas = canvasRef.current;
if (!canvas) return { x: 0, y: 0 };

const rect = canvas.getBoundingClientRect();
const scaleX = canvas.width / rect.width;
const scaleY = canvas.height / rect.height;

return {
x: (e.clientX - rect.left) * scaleX,
y: (e.clientY - rect.top) * scaleY,
};
};

const getTextAtPoint = (point: { x: number; y: number }) => {
const canvas = canvasRef.current;
if (!canvas) return null;

const ctx = canvas.getContext("2d");
if (!ctx) return null;

for (let i = textElements.length - 1; i >= 0; i--) {
const textEl = textElements[i];
ctx.font = `${textEl.fontSize}px ${textEl.fontFamily}`;
const textWidth = ctx.measureText(textEl.text).width;

if (
point.x >= textEl.x &&
point.x <= textEl.x + textWidth &&
point.y >= textEl.y - textEl.fontSize &&
point.y <= textEl.y
) {
return textEl;
}
}
return null;
};

const getResizeHandle = (point: { x: number; y: number }) => {
if (!cropMode || cropStart.x === cropEnd.x || cropStart.y === cropEnd.y) return "";

const x = Math.min(cropStart.x, cropEnd.x);
const y = Math.min(cropStart.y, cropEnd.y);
const width = Math.abs(cropEnd.x - cropStart.x);
const height = Math.abs(cropEnd.y - cropStart.y);
const handleSize = 8;

if (Math.abs(point.x - x) < handleSize && Math.abs(point.y - y) < handleSize) return "nw";
if (Math.abs(point.x - (x + width)) < handleSize && Math.abs(point.y - y) < handleSize) return "ne";
if (Math.abs(point.x - x) < handleSize && Math.abs(point.y - (y + height)) < handleSize) return "sw";
if (Math.abs(point.x - (x + width)) < handleSize && Math.abs(point.y - (y + height)) < handleSize) return "se";

if (Math.abs(point.x - (x + width/2)) < handleSize && Math.abs(point.y - y) < handleSize) return "n";
if (Math.abs(point.x - (x + width/2)) < handleSize && Math.abs(point.y - (y + height)) < handleSize) return "s";
if (Math.abs(point.x - x) < handleSize && Math.abs(point.y - (y + height/2)) < handleSize) return "w";
if (Math.abs(point.x - (x + width)) < handleSize && Math.abs(point.y - (y + height/2)) < handleSize) return "e";

return "";
};

const handleCrop = () => {
if (!cropStart || !cropEnd) return;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const img = imageRef.current;

if (!ctx || !img) return;

const x = Math.min(cropStart.x, cropEnd.x);
const y = Math.min(cropStart.y, cropEnd.y);
const width = Math.abs(cropEnd.x - cropStart.x);
const height = Math.abs(cropEnd.y - cropStart.y);

const scaleX = img.naturalWidth / canvasRef.current!.width;
const scaleY = img.naturalHeight / canvasRef.current!.height;

canvas.width = width * scaleX;
canvas.height = height * scaleY;

ctx.drawImage(
img,
x * scaleX,
y * scaleY,
width * scaleX,
height * scaleY,
0,
0,
canvas.width,
canvas.height
);

const croppedDataUrl = canvas.toDataURL("image/png");
setEditedImage(croppedDataUrl);
setCropMode(false);
setIsDragging(false);
setCropStart({ x: 0, y: 0 });
setCropEnd({ x: 0, y: 0 });
};

const handleAddText = () => {
if (!newText.trim()) return;

const newTextElement: TextElement = {
id: Date.now().toString(),
text: newText,
x: 100,
y: 100,
fontSize: fontSize,
color: textColor,
fontFamily: "Arial",
};

setTextElements([...textElements, newTextElement]);
setNewText("");
};

const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
const point = getCanvasPoint(e);

if (selectedTool === "text") {
const textAtPoint = getTextAtPoint(point);
if (textAtPoint) {
setDraggedTextId(textAtPoint.id);
setDragOffset({
x: point.x - textAtPoint.x,
y: point.y - textAtPoint.y,
});
return;
}
}

if (!cropMode) return;

const handle = getResizeHandle(point);

if (handle) {
setIsResizing(true);
setResizeHandle(handle);
} else {
setCropStart(point);
setCropEnd(point);
setIsDragging(true);
}
};

const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
const point = getCanvasPoint(e);

if (draggedTextId) {
const newX = point.x - dragOffset.x;
const newY = point.y - dragOffset.y;

setTextElements(prev => prev.map(textEl => 
textEl.id === draggedTextId 
? { ...textEl, x: newX, y: newY }
: textEl
));
return;
}

if (!cropMode) return;

if (isResizing) {
const x = Math.min(cropStart.x, cropEnd.x);
const y = Math.min(cropStart.y, cropEnd.y);
const width = Math.abs(cropEnd.x - cropStart.x);
const height = Math.abs(cropEnd.y - cropStart.y);

switch (resizeHandle) {
case "nw":
setCropStart({ x: point.x, y: point.y });
break;
case "ne":
setCropStart({ x: cropStart.x, y: point.y });
setCropEnd({ x: point.x, y: cropEnd.y });
break;
case "sw":
setCropStart({ x: point.x, y: cropStart.y });
setCropEnd({ x: cropEnd.x, y: point.y });
break;
case "se":
setCropEnd(point);
break;
case "n":
setCropStart({ x: cropStart.x, y: point.y });
break;
case "s":
setCropEnd({ x: cropEnd.x, y: point.y });
break;
case "w":
setCropStart({ x: point.x, y: cropStart.y });
break;
case "e":
setCropEnd({ x: point.x, y: cropEnd.y });
break;
}
} else if (isDragging) {
setCropEnd(point);
}
};

const handleCanvasMouseUp = () => {
setIsDragging(false);
setIsResizing(false);
setResizeHandle("");
setDraggedTextId(null);
};

const handleDownload = () => {
const canvas = canvasRef.current;
if (!canvas) return;

const cleanCanvas = document.createElement("canvas");
const cleanCtx = cleanCanvas.getContext("2d");
const img = imageRef.current;

if (!cleanCtx || !img) return;

cleanCanvas.width = img.naturalWidth;
cleanCanvas.height = img.naturalHeight;
cleanCtx.drawImage(img, 0, 0);

const scaleX = img.naturalWidth / canvas.width;
const scaleY = img.naturalHeight / canvas.height;

textElements.forEach((textEl) => {
cleanCtx.font = `${textEl.fontSize * scaleX}px ${textEl.fontFamily}`;
cleanCtx.fillStyle = textEl.color;
cleanCtx.fillText(textEl.text, textEl.x * scaleX, textEl.y * scaleY);
});

const link = document.createElement("a");
link.href = cleanCanvas.toDataURL("image/png");
link.download = "edited-photo.png";
link.click();
};

const tools = [
{
id: "rotate",
name: uchihaMode ? "Rotation Jutsu" : "Rotate",
icon: RotateCw,
action: handleRotate,
},
{
id: "flip",
name: uchihaMode ? "Mirror Technique" : "Flip",
icon: FlipHorizontal,
action: handleFlip,
},
{
id: "crop",
name: uchihaMode ? "Precision Cut" : "Crop",
icon: Crop,
action: () => setCropMode(!cropMode),
},
{
id: "text",
name: uchihaMode ? "Inscription Seal" : "Add Text",
icon: Type,
action: () => setSelectedTool(selectedTool === "text" ? null : "text"),
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
<span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
<UchihaText uchihaText="Precision Arts">Photo Editor</UchihaText>
</span>
</h1>
<p className={`text-xl ${isDark ? 'text-gray-300' : 'text-red-200'}`}>
<UchihaText uchihaText="Master the art of visual manipulation with Itachi's precision">
Professional photo editing tools at your fingertips
</UchihaText>
</p>
</motion.div>

<div className="grid lg:grid-cols-3 gap-6">
<div className="lg:col-span-1">
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30 mb-6">
<CardHeader>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'}`}>
<UchihaText uchihaText="Shinobi Techniques">Editing Tools</UchihaText>
</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
{tools.map((tool) => {
const Icon = tool.icon;
return (
<Button
key={tool.id}
variant="ghost"
className={`w-full justify-start ${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20 ${
selectedTool === tool.id || (tool.id === "crop" && cropMode) ? "bg-red-900/30" : ""
}`}
onClick={tool.action}
>
<Icon className="w-4 h-4 mr-2" />
{tool.name}
</Button>
);
})}
</CardContent>
</Card>

{selectedTool === "text" && (
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30 mb-6">
<CardHeader>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} flex items-center gap-2`}>
<Type className="w-5 h-5" />
<UchihaText uchihaText="Inscription Settings">Text Settings</UchihaText>
</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<Input
placeholder={uchihaMode ? "Enter your message" : "Enter text"}
value={newText}
onChange={(e) => setNewText(e.target.value)}
className="bg-black/20 border-red-900/30 text-white"
/>
<div>
<label className={`${isDark ? 'text-white' : 'text-red-100'} text-sm mb-2 block`}>
<UchihaText uchihaText="Seal Size">Font Size</UchihaText>: {fontSize}px
</label>
<Slider
value={[fontSize]}
onValueChange={(value) => setFontSize(value[0])}
max={100}
min={12}
step={1}
className="w-full"
/>
</div>
<div>
<label className={`${isDark ? 'text-white' : 'text-red-100'} text-sm mb-2 block`}>
<UchihaText uchihaText="Chakra Color">Text Color</UchihaText>
</label>
<input
type="color"
value={textColor}
onChange={(e) => setTextColor(e.target.value)}
className="w-full h-10 rounded border border-red-900/30"
/>
</div>
<Button onClick={handleAddText} className="w-full bg-red-600 hover:bg-red-700">
<UchihaText uchihaText="Apply Seal">Add Text</UchihaText>
</Button>
<div className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm`}>
<p className="flex items-center gap-2">
<Move className="w-4 h-4" />
<UchihaText uchihaText="Drag seals to reposition">Click and drag text to move</UchihaText>
</p>
</div>
</CardContent>
</Card>
)}

{cropMode && (
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30">
<CardHeader>
<CardTitle className={`${isDark ? 'text-white' : 'text-red-100'}`}>
<UchihaText uchihaText="Precision Cut">Crop Tool</UchihaText>
</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<p className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm`}>
<UchihaText uchihaText="Select area with precision. Use handles to adjust boundaries.">
Click and drag to select crop area. Use handles to resize.
</UchihaText>
</p>
<div className="flex gap-2">
<Button onClick={handleCrop} className="flex-1 bg-green-600 hover:bg-green-700">
<UchihaText uchihaText="Execute Cut">Apply Crop</UchihaText>
</Button>
<Button onClick={() => setCropMode(false)} variant="outline" className="flex-1">
<UchihaText uchihaText="Cancel">Cancel</UchihaText>
</Button>
</div>
</CardContent>
</Card>
)}
</div>

<div className="lg:col-span-2">
<Card className="backdrop-blur-lg bg-black/30 border-red-900/30">
<CardContent className="p-6 flex justify-center">
{editedImage ? (
<div className="relative">
<img
ref={imageRef}
src={editedImage}
alt="Editing"
className="hidden"
onLoad={drawCanvas}
/>
<canvas
ref={canvasRef}
className="border border-red-900/30 rounded cursor-crosshair"
onMouseDown={handleCanvasMouseDown}
onMouseMove={handleCanvasMouseMove}
onMouseUp={handleCanvasMouseUp}
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

export default function PhotoEditorPage() {
return <PhotoEditorContent />;
}
