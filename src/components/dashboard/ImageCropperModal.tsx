import React, { useState, useRef, useEffect } from 'react';
import { X, Check, RotateCw, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string;
  onCropComplete: (croppedDataUrl: string) => void;
  onClose: () => void;
}

export function ImageCropperModal({ imageSrc, onCropComplete, onClose }: ImageCropperModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [cropBox, setCropBox] = useState({ x: 50, y: 50, width: 300, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropBox.x, y: e.clientY - cropBox.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = Math.max(0, e.clientX - dragStart.x);
    const newY = Math.max(0, e.clientY - dragStart.y);
    setCropBox(prev => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    const img = imageRef.current;
    if (!img) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to crop box size
    canvas.width = cropBox.width;
    canvas.height = cropBox.height;

    // Draw cropped portion
    ctx.drawImage(
      img,
      cropBox.x / zoom,
      cropBox.y / zoom,
      cropBox.width / zoom,
      cropBox.height / zoom,
      0,
      0,
      cropBox.width,
      cropBox.height
    );

    const croppedUrl = canvas.toDataURL('image/jpeg', 0.9);
    onCropComplete(croppedUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-extrabold text-[#0F172A]">Crop WhatsApp Chat Screenshot</h3>
            <p className="text-xs text-slate-500">Drag or resize the crop box to select the exact chat area</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative flex-1 bg-slate-900 rounded-2xl overflow-hidden my-4 min-h-[360px] flex items-center justify-center select-none"
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Source to crop"
            style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transition: 'transform 0.1s ease-out' }}
            className="max-h-[340px] w-auto object-contain pointer-events-none"
            crossOrigin="anonymous"
          />

          {/* Crop Overlay Box */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              left: `${cropBox.x}px`,
              top: `${cropBox.y}px`,
              width: `${cropBox.width}px`,
              height: `${cropBox.height}px`,
            }}
            className="absolute border-2 border-emerald-400 bg-emerald-500/10 cursor-move shadow-2xl flex items-center justify-center group"
          >
            <div className="absolute inset-0 bg-emerald-400/5 pointer-events-none" />
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded shadow flex items-center gap-1 opacity-80 group-hover:opacity-100">
              <Move className="w-3 h-3" /> Drag to move
            </div>
            {/* Resize handle */}
            <div 
              onMouseDown={(e) => {
                e.stopPropagation();
                const startX = e.clientX;
                const startY = e.clientY;
                const startW = cropBox.width;
                const startH = cropBox.height;
                const onScaleMove = (ev: MouseEvent) => {
                  setCropBox(prev => ({
                    ...prev,
                    width: Math.max(120, startW + (ev.clientX - startX)),
                    height: Math.max(120, startH + (ev.clientY - startY)),
                  }));
                };
                const onScaleUp = () => {
                  window.removeEventListener('mousemove', onScaleMove);
                  window.removeEventListener('mouseup', onScaleUp);
                };
                window.addEventListener('mousemove', onScaleMove);
                window.addEventListener('mouseup', onScaleUp);
              }}
              className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-600 cursor-se-resize rounded-tl-lg flex items-center justify-center text-white text-xs"
            >
              ◢
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ZoomOut className="w-4 h-4 text-slate-500" />
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-28 accent-[#2563EB]"
              />
              <ZoomIn className="w-4 h-4 text-slate-500" />
            </div>

            <button
              onClick={() => setRotation(prev => (prev + 90) % 360)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" /> Rotate
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCrop}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-colors"
            >
              <Check className="w-4 h-4" /> Crop & Save Screenshot
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
