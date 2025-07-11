import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, ArrowLeft, Download, Palette, Sparkles, Settings, FileMusic, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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

const applyAnimeFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const edges = detectEdges(data, width, height);
  const quantizedData = quantizeColors(data, 8);
  const smoothData = bilateralFilter(quantizedData, width, height);
  const animeData = enhanceAnimeFeatures(smoothData, width, height);

  for (let i = 0; i < animeData.length; i += 4) {
    const r = animeData[i];
    const g = animeData[i + 1];
    const b = animeData[i + 2];

    if (isSkinTone(r, g, b)) {
      animeData[i] = Math.min(255, r * 1.2 + 40);
      animeData[i + 1] = Math.min(255, g * 1.1 + 30);
      animeData[i + 2] = Math.min(255, b * 0.9 + 20);
    }
    else if (isHairColor(r, g, b)) {
      animeData[i] = Math.min(255, r * 1.3);
      animeData[i + 1] = Math.min(255, g * 1.2);
      animeData[i + 2] = Math.min(255, b * 1.4);
    }
    else if (isDarkArea(r, g, b)) {
      animeData[i] = Math.max(0, r * 0.7);
      animeData[i + 1] = Math.max(0, g * 0.7);
      animeData[i + 2] = Math.max(0, b * 0.7);
    }
  }

  for (let i = 0; i < edges.length; i += 4) {
    if (edges[i] < 100) {
      animeData[i] = 0;
      animeData[i + 1] = 0;
      animeData[i + 2] = 0;
    }
  }

  const newImageData = new ImageData(animeData, width, height);
  ctx.putImageData(newImageData, 0, 0);

  ctx.globalCompositeOperation = "soft-light";
  ctx.fillStyle = "rgba(255, 182, 193, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";
};

const applyDisneyFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const edges = detectEdges(data, width, height);
  const quantizedData = quantizeColors(data, 12);
  const smoothData = bilateralFilter(quantizedData, width, height);

  for (let i = 0; i < smoothData.length; i += 4) {
    const r = smoothData[i];
    const g = smoothData[i + 1];
    const b = smoothData[i + 2];

    if (isSkinTone(r, g, b)) {
      smoothData[i] = Math.min(255, r * 1.15 + 50);
      smoothData[i + 1] = Math.min(255, g * 1.1 + 45);
      smoothData[i + 2] = Math.min(255, b * 1.05 + 40);
    } else {
      smoothData[i] = Math.min(255, r * 1.2 + 25);
      smoothData[i + 1] = Math.min(255, g * 1.15 + 30);
      smoothData[i + 2] = Math.min(255, b * 1.3 + 35);
    }
  }

  for (let i = 0; i < edges.length; i += 4) {
    if (edges[i] < 120) {
      smoothData[i] = Math.max(0, smoothData[i] * 0.8);
      smoothData[i + 1] = Math.max(0, smoothData[i + 1] * 0.8);
      smoothData[i + 2] = Math.max(0, smoothData[i + 2] * 0.8);
    }
  }

  const newImageData = new ImageData(smoothData, width, height);
  ctx.putImageData(newImageData, 0, 0);
};

const applyPixarFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const quantizedData = quantizeColors(data, 16);
  const smoothData = bilateralFilter(quantizedData, width, height);
  const enhancedData = enhance3DFeatures(smoothData, width, height);

  const newImageData = new ImageData(enhancedData, width, height);
  ctx.putImageData(newImageData, 0, 0);
};

const applyMangaFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const edges = detectEdges(data, width, height, 0.5);
  const mangaData = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;

    let newGray;
    if (gray > 200) newGray = 255;
    else if (gray > 150) newGray = 200;
    else if (gray > 100) newGray = 150;
    else if (gray > 50) newGray = 100;
    else newGray = 0;

    mangaData[i] = newGray;
    mangaData[i + 1] = newGray;
    mangaData[i + 2] = newGray;
    mangaData[i + 3] = data[i + 3];
  }

  for (let i = 0; i < edges.length; i += 4) {
    if (edges[i] < 80) {
      mangaData[i] = 0;
      mangaData[i + 1] = 0;
      mangaData[i + 2] = 0;
    }
  }

  const newImageData = new ImageData(mangaData, width, height);
  ctx.putImageData(newImageData, 0, 0);
};

const detectEdges = (data: Uint8ClampedArray, width: number, height: number, threshold = 0.3) => {
  const edges = new Uint8ClampedArray(data.length);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;

      const tl = getGrayValue(data, (y - 1) * width + (x - 1));
      const tm = getGrayValue(data, (y - 1) * width + x);
      const tr = getGrayValue(data, (y - 1) * width + (x + 1));
      const ml = getGrayValue(data, y * width + (x - 1));
      const mr = getGrayValue(data, y * width + (x + 1));
      const bl = getGrayValue(data, (y + 1) * width + (x - 1));
      const bm = getGrayValue(data, (y + 1) * width + x);
      const br = getGrayValue(data, (y + 1) * width + (x + 1));

      const gx = -1 * tl + 1 * tr + -2 * ml + 2 * mr + -1 * bl + 1 * br;
      const gy = -1 * tl + -2 * tm + -1 * tr + 1 * bl + 2 * bm + 1 * br;

      const magnitude = Math.sqrt(gx * gx + gy * gy);
      const edgeValue = magnitude > threshold * 255 ? 0 : 255;

      edges[idx] = edgeValue;
      edges[idx + 1] = edgeValue;
      edges[idx + 2] = edgeValue;
      edges[idx + 3] = 255;
    }
  }

  return edges;
};

const quantizeColors = (data: Uint8ClampedArray, levels: number) => {
  const quantized = new Uint8ClampedArray(data.length);
  const step = 255 / (levels - 1);

  for (let i = 0; i < data.length; i += 4) {
    quantized[i] = Math.round(data[i] / step) * step;
    quantized[i + 1] = Math.round(data[i + 1] / step) * step;
    quantized[i + 2] = Math.round(data[i + 2] / step) * step;
    quantized[i + 3] = data[i + 3];
  }

  return quantized;
};

const bilateralFilter = (data: Uint8ClampedArray, width: number, height: number) => {
  const filtered = new Uint8ClampedArray(data.length);
  const radius = 5;
  const sigmaColor = 50;
  const sigmaSpace = 50;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      let sumR = 0,
        sumG = 0,
        sumB = 0,
        sumWeight = 0;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const ny = y + dy;
          const nx = x + dx;

          if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
            const nIdx = (ny * width + nx) * 4;

            const spatialDist = dx * dx + dy * dy;
            const spatialWeight = Math.exp(-spatialDist / (2 * sigmaSpace * sigmaSpace));

            const colorDist =
              Math.pow(data[idx] - data[nIdx], 2) +
              Math.pow(data[idx + 1] - data[nIdx + 1], 2) +
              Math.pow(data[idx + 2] - data[nIdx + 2], 2);
            const colorWeight = Math.exp(-colorDist / (2 * sigmaColor * sigmaColor));

            const weight = spatialWeight * colorWeight;

            sumR += data[nIdx] * weight;
            sumG += data[nIdx + 1] * weight;
            sumB += data[nIdx + 2] * weight;
            sumWeight += weight;
          }
        }
      }

      filtered[idx] = sumR / sumWeight;
      filtered[idx + 1] = sumG / sumWeight;
      filtered[idx + 2] = sumB / sumWeight;
      filtered[idx + 3] = data[idx + 3];
    }
  }

  return filtered;
};

const enhanceAnimeFeatures = (data: Uint8ClampedArray, width: number, height: number) => {
  const enhanced = new Uint8ClampedArray(data);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (isDarkArea(r, g, b)) {
      enhanced[i] = Math.max(0, r * 0.6);
      enhanced[i + 1] = Math.max(0, g * 0.6);
      enhanced[i + 2] = Math.max(0, b * 0.6);
    }
    else if (isBrightArea(r, g, b)) {
      enhanced[i] = Math.min(255, r * 1.3);
      enhanced[i + 1] = Math.min(255, g * 1.3);
      enhanced[i + 2] = Math.min(255, b * 1.3);
    }
  }

  return enhanced;
};

const enhance3DFeatures = (data: Uint8ClampedArray, width: number, height: number) => {
  const enhanced = new Uint8ClampedArray(data);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;

    if (brightness > 180) {
      enhanced[i] = Math.min(255, r * 1.4);
      enhanced[i + 1] = Math.min(255, g * 1.4);
      enhanced[i + 2] = Math.min(255, b * 1.4);
    } else if (brightness < 80) {
      enhanced[i] = Math.max(0, r * 0.6);
      enhanced[i + 1] = Math.max(0, g * 0.6);
      enhanced[i + 2] = Math.max(0, b * 0.6);
    }
  }

  return enhanced;
};

const getGrayValue = (data: Uint8ClampedArray, pixelIndex: number) => {
  const idx = pixelIndex * 4;
  return data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
};

const isSkinTone = (r: number, g: number, b: number) => {
  return r > 95 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15;
};

const isHairColor = (r: number, g: number, b: number) => {
  const brightness = (r + g + b) / 3;
  return brightness < 150 && (Math.abs(r - g) > 20 || Math.abs(g - b) > 20 || Math.abs(r - b) > 20);
};

const isDarkArea = (r: number, g: number, b: number) => {
  return (r + g + b) / 3 < 80;
};

const isBrightArea = (r: number, g: number, b: number) => {
  return (r + g + b) / 3 > 200;
};

const applyChibiFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const quantizedData = quantizeColors(data, 6);
  const smoothData = bilateralFilter(quantizedData, width, height);

  for (let i = 0; i < smoothData.length; i += 4) {
    smoothData[i] = Math.min(255, smoothData[i] * 1.4 + 60);
    smoothData[i + 1] = Math.min(255, smoothData[i + 1] * 1.3 + 50);
    smoothData[i + 2] = Math.min(255, smoothData[i + 2] * 1.2 + 70);
  }

  const newImageData = new ImageData(smoothData, width, height);
  ctx.putImageData(newImageData, 0, 0);
};

const applySuperheroFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const edges = detectEdges(data, width, height, 0.4);
  const quantizedData = quantizeColors(data, 10);

  for (let i = 0; i < quantizedData.length; i += 4) {
    quantizedData[i] = Math.min(255, quantizedData[i] * 1.5);
    quantizedData[i + 1] = Math.min(255, quantizedData[i + 1] * 1.2);
    quantizedData[i + 2] = Math.min(255, quantizedData[i + 2] * 1.6);
  }

  for (let i = 0; i < edges.length; i += 4) {
    if (edges[i] < 100) {
      quantizedData[i] = 0;
      quantizedData[i + 1] = 0;
      quantizedData[i + 2] = 0;
    }
  }

  const newImageData = new ImageData(quantizedData, width, height);
  ctx.putImageData(newImageData, 0, 0);
};

const applyWatercolorFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const quantizedData = quantizeColors(data, 12);
  const smoothData = bilateralFilter(quantizedData, width, height);

  for (let i = 0; i < smoothData.length; i += 4) {
    smoothData[i] = Math.min(255, smoothData[i] * 0.9 + 40);
    smoothData[i + 1] = Math.min(255, smoothData[i + 1] * 0.9 + 35);
    smoothData[i + 2] = Math.min(255, smoothData[i + 2] * 0.9 + 45);
  }

  const newImageData = new ImageData(smoothData, width, height);
  ctx.putImageData(newImageData, 0, 0);

  ctx.filter = "blur(1px)";
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(canvas, 0, 0);
  ctx.filter = "none";
  ctx.globalCompositeOperation = "source-over";
};

const applySketchFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const edges = detectEdges(data, width, height, 0.2);
  const sketchData = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    const inverted = 255 - gray;
    const sketch = Math.min(255, inverted + (edges[i] < 200 ? 0 : 100));

    sketchData[i] = sketch;
    sketchData[i + 1] = sketch;
    sketchData[i + 2] = sketch;
    sketchData[i + 3] = data[i + 3];
  }

  const newImageData = new ImageData(sketchData, width, height);
  ctx.putImageData(newImageData, 0, 0);
};

const applyFantasyFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const quantizedData = quantizeColors(data, 14);
  const smoothData = bilateralFilter(quantizedData, width, height);

  for (let i = 0; i < smoothData.length; i += 4) {
    smoothData[i] = Math.min(255, smoothData[i] * 1.2 + 30);
    smoothData[i + 1] = Math.min(255, smoothData[i + 1] * 1.1 + 35);
    smoothData[i + 2] = Math.min(255, smoothData[i + 2] * 1.4 + 50);
  }

  const newImageData = new ImageData(smoothData, width, height);
  ctx.putImageData(newImageData, 0, 0);
};

const applyRetroFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const quantizedData = quantizeColors(data, 8);
  const smoothData = bilateralFilter(quantizedData, width, height);

  for (let i = 0; i < smoothData.length; i += 4) {
    smoothData[i] = Math.min(255, smoothData[i] * 1.3 + 50);
    smoothData[i + 1] = Math.min(255, smoothData[i + 1] * 1.1 + 30);
    smoothData[i + 2] = Math.min(255, smoothData[i + 2] * 1.4 + 60);
  }

  const newImageData = new ImageData(smoothData, width, height);
  ctx.putImageData(newImageData, 0, 0);
};

function CartoonConverterContent() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const cartoonStyles = [
    {
      id: "anime",
      name: uchihaMode ? "Shinobi Style" : "Anime Style",
      description: uchihaMode ? "Transform into a legendary ninja with sharp features" : "Sharp features, smooth skin, large expressive eyes",
      color: "from-pink-500 to-rose-500",
      filter: applyAnimeFilter,
    },
    {
      id: "disney",
      name: uchihaMode ? "Princess Jutsu" : "Disney Style",
      description: uchihaMode ? "Channel the magic of ancient royal bloodlines" : "Soft magical features with princess-like appearance",
      color: "from-blue-500 to-cyan-500",
      filter: applyDisneyFilter,
    },
    {
      id: "pixar",
      name: uchihaMode ? "3D Clone Technique" : "Pixar 3D",
      description: uchihaMode ? "Create dimensional shadow clones with depth" : "3D animated character with depth and realistic textures",
      color: "from-green-500 to-emerald-500",
      filter: applyPixarFilter,
    },
    {
      id: "manga",
      name: uchihaMode ? "Ink Scroll Art" : "Manga Style",
      description: uchihaMode ? "Ancient scroll artwork with dramatic shadows" : "High contrast black and white with dramatic shading",
      color: "from-gray-500 to-slate-600",
      filter: applyMangaFilter,
    },
    {
      id: "chibi",
      name: uchihaMode ? "Mini Clone Style" : "Chibi Style",
      description: uchihaMode ? "Adorable mini-ninja with enhanced chakra glow" : "Cute oversized features with bright cheerful colors",
      color: "from-yellow-500 to-orange-500",
      filter: applyChibiFilter,
    },
    {
      id: "superhero",
      name: uchihaMode ? "Hero Transformation" : "Superhero Comic",
      description: uchihaMode ? "Legendary hero form with powerful aura" : "Bold comic book style with strong edges and colors",
      color: "from-red-500 to-red-700",
      filter: applySuperheroFilter,
    },
    {
      id: "watercolor",
      name: uchihaMode ? "Chakra Painting" : "Watercolor Art",
      description: uchihaMode ? "Flowing chakra energy with artistic brush strokes" : "Soft artistic painting with blended brush strokes",
      color: "from-purple-500 to-indigo-500",
      filter: applyWatercolorFilter,
    },
    {
      id: "sketch",
      name: uchihaMode ? "Training Scroll" : "Pencil Sketch",
      description: uchihaMode ? "Academy training scroll with precise line work" : "Hand-drawn pencil artwork with realistic shading",
      color: "from-gray-600 to-gray-800",
      filter: applySketchFilter,
    },
    {
      id: "fantasy",
      name: uchihaMode ? "Mystical Arts" : "Fantasy Art",
      description: uchihaMode ? "Ancient mystical powers with elemental enhancement" : "Mystical character with magical color enhancement",
      color: "from-violet-500 to-purple-600",
      filter: applyFantasyFilter,
    },
    {
      id: "retro",
      name: uchihaMode ? "Old Era Style" : "Retro Cartoon",
      description: uchihaMode ? "Classic ninja era with traditional color schemes" : "80s cartoon style with bold neon-like colors",
      color: "from-teal-500 to-cyan-600",
      filter: applyRetroFilter,
    },
  ];

  const handleStyleSelect = async (styleId: string) => {
    if (!uploadedImage) return;

    setSelectedStyle(styleId);
    setIsConverting(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const style = cartoonStyles.find((s) => s.id === styleId);
      if (style?.filter) {
        style.filter(canvas, ctx);
      }

      const convertedDataUrl = canvas.toDataURL("image/png");

      setTimeout(() => {
        setConvertedImage(convertedDataUrl);
        setIsConverting(false);
      }, 3000);
    };

    img.src = uploadedImage;
  };

  const handleDownload = () => {
    if (convertedImage) {
      const link = document.createElement("a");
      link.href = convertedImage;
      link.download = `cartoon-${selectedStyle}.png`;
      link.click();
    }
  };

  if (isLoading) {
    return <SharinganLoader onAnimationComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`w-screen min-h-screen ${isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-red-950 via-red-800 to-red-900'} relative overflow-hidden`}>
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-500 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
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
              {convertedImage && (
                <Button variant="ghost" className={`${isDark ? 'text-white' : 'text-red-100'} hover:bg-red-900/20`} onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  <UchihaText uchihaText="Save Jutsu">Download</UchihaText>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 w-full px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-6xl font-bold ${isDark ? 'text-white' : 'text-red-100'} mb-4`}>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <UchihaText uchihaText="Advanced Genjutsu Transformation">Advanced Cartoon Converter</UchihaText>
            </span>
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-red-200'} mb-8`}>
            <UchihaText uchihaText="Cast powerful illusions to transform reality using legendary shinobi algorithms">
              Transform photos into real cartoon drawings with professional-grade algorithms
            </UchihaText>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="backdrop-blur-lg bg-black/30 border-red-900/30 h-[400px]">
              <CardHeader>
                <CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} text-center`}>
                  <UchihaText uchihaText="Original Form">Original Photo</UchihaText>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-full">
                {uploadedImage ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={uploadedImage}
                      alt="Original"
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="backdrop-blur-lg bg-black/30 border-red-900/30 h-[400px]">
              <CardHeader>
                <CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} text-center`}>
                  {selectedStyle
                    ? `${cartoonStyles.find((s) => s.id === selectedStyle)?.name} ${uchihaMode ? 'Transformation' : 'Result'}`
                    : uchihaMode ? "Genjutsu Form" : "Cartoon Drawing"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-full">
                {isConverting ? (
                  <div className="w-full h-full flex items-center justify-center flex-col">
                    <motion.div
                      className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className={`${isDark ? 'text-white' : 'text-red-100'} mb-2`}>
                      <UchihaText uchihaText="Casting advanced genjutsu...">Processing advanced algorithms...</UchihaText>
                    </p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-red-300'} text-sm`}>
                      <UchihaText uchihaText="Transforming reality">Creating cartoon drawing</UchihaText>
                    </p>
                  </div>
                ) : convertedImage ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={convertedImage}
                      alt="Converted"
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                    />
                  </div>
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${isDark ? 'text-gray-400' : 'text-red-300'}`}>
                    <UchihaText uchihaText="Select a technique to cast genjutsu">
                      Select a style to create cartoon drawing
                    </UchihaText>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="backdrop-blur-lg bg-black/30 border-red-900/30 h-[400px]">
              <CardHeader>
                <CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} text-center flex items-center justify-center gap-2`}>
                  <Palette className="w-5 h-5" />
                  <UchihaText uchihaText="Advanced Jutsu Processing">Advanced Processing</UchihaText>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedStyle ? (
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${cartoonStyles.find((s) => s.id === selectedStyle)?.color} rounded-full mx-auto mb-4 flex items-center justify-center`}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`${isDark ? 'text-white' : 'text-red-100'} text-xl font-semibold mb-2`}>
                      {cartoonStyles.find((s) => s.id === selectedStyle)?.name}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm mb-4`}>
                      {cartoonStyles.find((s) => s.id === selectedStyle)?.description}
                    </p>
                    <div className={`${isDark ? 'text-gray-400' : 'text-red-300'} text-xs space-y-1`}>
                      <p>🎯 <UchihaText uchihaText="Chakra detection & line art">Edge detection & line art</UchihaText></p>
                      <p>🎨 <UchihaText uchihaText="Color chakra quantization">Color quantization</UchihaText></p>
                      <p>✨ <UchihaText uchihaText="Feature enhancement jutsu">Feature enhancement</UchihaText></p>
                      <p>🔥 <UchihaText uchihaText="Legendary algorithms">Professional algorithms</UchihaText></p>
                    </div>
                  </div>
                ) : (
                  <div className={`text-center ${isDark ? 'text-gray-400' : 'text-red-300'}`}>
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">
                      <UchihaText uchihaText="Advanced genjutsu conversion using:">Advanced cartoon conversion using:</UchihaText>
                    </p>
                    <div className="text-xs space-y-1">
                      <p>• <UchihaText uchihaText="Sharingan edge detection">Sobel edge detection</UchihaText></p>
                      <p>• <UchihaText uchihaText="Chakra bilateral filtering">Bilateral filtering</UchihaText></p>
                      <p>• <UchihaText uchihaText="Color chakra quantization">Color quantization</UchihaText></p>
                      <p>• <UchihaText uchihaText="Feature enhancement jutsu">Feature enhancement</UchihaText></p>
                      <p>• <UchihaText uchihaText="Artistic genjutsu stylization">Artistic stylization</UchihaText></p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-red-100'} text-center mb-8`}>
            <UchihaText uchihaText="Legendary Transformation Techniques">Professional Cartoon Styles</UchihaText>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cartoonStyles.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card
                  className={`backdrop-blur-lg bg-black/30 border-red-900/30 hover:bg-black/40 transition-all cursor-pointer group ${
                    selectedStyle === style.id ? "ring-2 ring-purple-500" : ""
                  }`}
                  onClick={() => handleStyleSelect(style.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${style.color} rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`${isDark ? 'text-white' : 'text-red-100'} font-semibold text-sm mb-1`}>{style.name}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-red-300'} text-xs mb-3`}>{style.description}</p>
                    <Button
                      size="sm"
                      className={`w-full bg-gradient-to-r ${style.color} hover:opacity-90 text-white text-xs`}
                      disabled={!uploadedImage || isConverting}
                    >
                      {isConverting && selectedStyle === style.id ? 
                        <UchihaText uchihaText="Casting...">Processing...</UchihaText> : 
                        <UchihaText uchihaText="Cast Jutsu">Create Drawing</UchihaText>
                      }
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12"
        >
          <Card className="backdrop-blur-lg bg-black/30 border-red-900/30">
            <CardHeader>
              <CardTitle className={`${isDark ? 'text-white' : 'text-red-100'} text-center`}>
                🚀 <UchihaText uchihaText="Advanced Genjutsu Transformation Technology">Advanced Cartoon Conversion Technology</UchihaText>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">🎯</span>
                  </div>
                  <h3 className={`${isDark ? 'text-white' : 'text-red-100'} font-semibold mb-2`}>
                    <UchihaText uchihaText="Chakra Detection">Edge Detection</UchihaText>
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm`}>
                    <UchihaText uchihaText="Sharingan operators detect facial features and create clean line art">
                      Sobel operators detect facial features and create clean line art
                    </UchihaText>
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">🎨</span>
                  </div>
                  <h3 className={`${isDark ? 'text-white' : 'text-red-100'} font-semibold mb-2`}>
                    <UchihaText uchihaText="Color Chakra Quantization">Color Quantization</UchihaText>
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm`}>
                    <UchihaText uchihaText="Reduces colors to genjutsu-like palettes while preserving details">
                      Reduces colors to cartoon-like palettes while preserving details
                    </UchihaText>
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">✨</span>
                  </div>
                  <h3 className={`${isDark ? 'text-white' : 'text-red-100'} font-semibold mb-2`}>
                    <UchihaText uchihaText="Feature Enhancement Jutsu">Feature Enhancement</UchihaText>
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-red-200'} text-sm`}>
                    <UchihaText uchihaText="Enhances eyes, hair, and facial features for shinobi styles">
                      Enhances eyes, hair, and facial features for cartoon styles
                    </UchihaText>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
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

export default function CartoonConverterPage() {
  return <CartoonConverterContent />;
}