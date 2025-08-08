import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
interface GlobalContextType {  isDark: boolean;  setIsDark: (dark: boolean) => void;  uchihaMode: boolean;  setUchihaMode: (mode: boolean) => void;  selectedMusic: string; setSelectedMusic: (music: string) => void;isMusicPlaying: boolean;setIsMusicPlaying: (playing: boolean) => void;toggleMusic: () => void;audioRef: React.RefObject<HTMLAudioElement>;customMusicFile: File | null;setCustomMusicFile: (file: File | null) => void;customMusicUrl: string | null;setCustomMusicUrl: (url: string | null) => void;}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export function useGlobalContext() {
const context = useContext(GlobalContext);
if (!context) {
throw new Error('useGlobalContext must be used within a GlobalProvider');}
return context;}
export function GlobalProvider({ children }: { children: React.ReactNode }) {
const [isDark, setIsDarkState] = useState(true);
const [uchihaMode, setUchihaModeState] = useState(false);
const [selectedMusic, setSelectedMusicState] = useState("centuries");
const [isMusicPlaying, setIsMusicPlayingState] = useState(false);
const [customMusicFile, setCustomMusicFileState] = useState<File | null>(null);
const [customMusicUrl, setCustomMusicUrlState] = useState<string | null>(null);
const audioRef = useRef<HTMLAudioElement>(null);
useEffect(() => {
const savedTheme = localStorage.getItem('theme');
const savedUchihaMode = localStorage.getItem('uchihaMode');
const savedMusic = localStorage.getItem('selectedMusic');
const savedMusicPlaying = localStorage.getItem('isMusicPlaying');
const savedCustomMusicData = localStorage.getItem('customMusicData');
if (savedTheme) {
const dark = savedTheme === 'dark';
setIsDarkState(dark);
document.documentElement.classList.toggle('dark', dark);
document.documentElement.classList.toggle('light', !dark);}
if (savedUchihaMode) {
setUchihaModeState(savedUchihaMode === 'true');}
if (savedMusic) {
setSelectedMusicState(savedMusic);
} else {
setSelectedMusicState("centuries");
localStorage.setItem('selectedMusic', "centuries");}
if (savedMusicPlaying) {
setIsMusicPlayingState(savedMusicPlaying === 'true');}
if (savedCustomMusicData) {
try {
const { fileName, dataUrl } = JSON.parse(savedCustomMusicData);
setCustomMusicUrlState(dataUrl);
const mockFile = new File([''], fileName, { type: 'audio/mpeg' });
setCustomMusicFileState(mockFile);
} catch (error) {
console.error('Error restoring custom music:', error);
localStorage.removeItem('customMusicData');}}}, []);
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
url: "https://files.catbox.moe/gi8tg9.mp3"},
"custom": {
name: uchihaMode ? "Personal Shinobi Theme" : "Custom Music",
url: customMusicUrl || ""}};
const setIsDark = (dark: boolean) => {
setIsDarkState(dark);
localStorage.setItem('theme', dark ? 'dark' : 'light');
document.documentElement.classList.toggle('dark', dark);
document.documentElement.classList.toggle('light', !dark);};
const setUchihaMode = (mode: boolean) => {
setUchihaModeState(mode);
localStorage.setItem('uchihaMode', mode.toString());};
const setSelectedMusic = (music: string) => {
if (music === "none" && audioRef.current) {
audioRef.current.pause();
setIsMusicPlayingState(false);
localStorage.setItem('isMusicPlaying', 'false');}
setSelectedMusicState(music);
localStorage.setItem('selectedMusic', music);};
const setIsMusicPlaying = (playing: boolean) => {
setIsMusicPlayingState(playing);
localStorage.setItem('isMusicPlaying', playing.toString());};
const toggleMusic = () => {
if (!audioRef.current || selectedMusic === "none") return;
if (isMusicPlaying) {
audioRef.current.pause();
setIsMusicPlaying(false);
} else {
const playPromise = audioRef.current.play();
if (playPromise !== undefined) {
playPromise
.then(() => {setIsMusicPlaying(true);})
.catch((error) => {
console.error("Error playing audio:", error);
setTimeout(() => {
if (audioRef.current) {
audioRef.current.play()
.then(() => setIsMusicPlaying(true))
.catch(console.error);}}, 1000);
});}}};
const setCustomMusicFile = (file: File | null) => {
setCustomMusicFileState(file);
if (file) {
const reader = new FileReader();
reader.onload = (e) => {
const dataUrl = e.target?.result as string;
setCustomMusicUrlState(dataUrl);
const customMusicData = {
fileName: file.name,
dataUrl: dataUrl};
localStorage.setItem('customMusicData', JSON.stringify(customMusicData));
setSelectedMusic("custom");
};
reader.readAsDataURL(file);} else {
setCustomMusicUrlState(null);
localStorage.removeItem('customMusicData');
if (selectedMusic === "custom") {
setSelectedMusic("centuries");}}};
const setCustomMusicUrl = (url: string | null) => {
setCustomMusicUrlState(url);
};
useEffect(() => {
if (audioRef.current) {
if (selectedMusic === "none") {
audioRef.current.pause();
audioRef.current.src = "";
setIsMusicPlayingState(false);
localStorage.setItem('isMusicPlaying', 'false');
} else {
const track = musicTracks[selectedMusic as keyof typeof musicTracks];
if (track?.url) {
audioRef.current.src = track.url;
audioRef.current.loop = true;
audioRef.current.volume = 0.3;
audioRef.current.preload = "metadata";
audioRef.current.load();
if (isMusicPlaying) {
const playPromise = audioRef.current.play();
if (playPromise !== undefined) {
playPromise.catch((error) => {
console.error("Error playing new track:", error);
setIsMusicPlaying(false);
});}}}}}}, 
[selectedMusic, customMusicUrl]);
useEffect(() => {
const audio = audioRef.current;
if (!audio) return;
const handleEnded = () => {
if (isMusicPlaying && selectedMusic !== "none") {
audio.play().catch(console.error);}};
const handleError = (e: Event) => {
console.error("Audio error:", e);
setIsMusicPlaying(false);};
const handleCanPlay = () => {
if (isMusicPlaying && audio.paused && selectedMusic !== "none") {
audio.play().catch(console.error);}
};
const handleLoadStart = () => {
console.log("Audio loading started");
};
const handleLoadedData = () => {
console.log("Audio data loaded");};
audio.addEventListener('ended', handleEnded);
audio.addEventListener('error', handleError);
audio.addEventListener('canplay', handleCanPlay);
audio.addEventListener('loadstart', handleLoadStart);
audio.addEventListener('loadeddata', handleLoadedData);
return () => {
audio.removeEventListener('ended', handleEnded);
audio.removeEventListener('error', handleError);
audio.removeEventListener('canplay', handleCanPlay);
audio.removeEventListener('loadstart', handleLoadStart);
audio.removeEventListener('loadeddata', handleLoadedData);};
}, 
[isMusicPlaying, selectedMusic]);
useEffect(() => {
const timer = setTimeout(() => {
if (isMusicPlaying && selectedMusic !== "none" && audioRef.current) {
audioRef.current.play().catch(console.error);}}, 1000);
return () => clearTimeout(timer);
}, []);
return (
<GlobalContext.Provider value={{isDark,setIsDark,uchihaMode,setUchihaMode,selectedMusic,setSelectedMusic,isMusicPlaying,setIsMusicPlaying,toggleMusic,audioRef,customMusicFile,setCustomMusicFile,customMusicUrl,setCustomMusicUrl}}>
<audio 
ref={audioRef} 
preload="metadata"
crossOrigin="anonymous"
playsInline/>
{children}
</GlobalContext.Provider>);}
