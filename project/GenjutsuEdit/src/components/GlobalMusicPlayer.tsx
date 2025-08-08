import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useGlobalContext } from '@/contexts/GlobalContext';
function UchihaText({ children, uchihaText }: { children: React.ReactNode; uchihaText?: string }) {
const { uchihaMode } = useGlobalContext();
if (uchihaMode && uchihaText) {
return <>{uchihaText}</>;}
return <>{children}</>;}
export function GlobalMusicPlayer() {
const { selectedMusic, isMusicPlaying, toggleMusic, uchihaMode } = useGlobalContext();
const musicTracks = {
"none": { name: "None", url: "" },
"blue-bird": { 
name: uchihaMode ? "Blue Bird (Sasuke's Theme)" : "Blue Bird Opening", 
url: "https://files.catbox.moe/i0ci2a.mp3"},
"royalty": { 
name: uchihaMode ? "Royalty (Uchiha Power)" : "Royalty", 
url: "https://files.catbox.moe/r2iju9.mp3"},
"centuries": { 
name: uchihaMode ? "Centuries (Eternal Legacy)" : "Centuries", 
url: "https://files.catbox.moe/gi8tg9.mp3"
}};
const handleClick = () => {
if (selectedMusic !== "none") {
toggleMusic();}};
return (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="fixed bottom-6 right-6 z-50">
<Button
onClick={handleClick}
disabled={selectedMusic === "none"}
className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
selectedMusic === "none" 
? "bg-gradient-to-r from-gray-400 to-gray-600 cursor-not-allowed opacity-50"
: isMusicPlaying 
? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 animate-pulse" 
: "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"}`}
title={selectedMusic === "none" ? "No music selected" : isMusicPlaying ? "Pause music" : "Play music"}>
{isMusicPlaying ? (
<Volume2 className="w-6 h-6 text-white" />
) : (
<VolumeX className="w-6 h-6 text-white" />)}
</Button>
{selectedMusic !== "none" && (
<motion.div
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: isMusicPlaying ? 1 : 0, x: isMusicPlaying ? -80 : 20 }}
className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
{musicTracks[selectedMusic as keyof typeof musicTracks]?.name}
</motion.div>)}
</motion.div>);
}
