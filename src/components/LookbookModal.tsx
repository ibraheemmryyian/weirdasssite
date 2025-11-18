import { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LookbookModal({ isOpen, onClose }: LookbookModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      const video = videoRef.current;

      const handleLoadedData = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };

      const handleEnded = () => {
        setIsPlaying(false);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
      style={{
        animation: 'fadeIn 400ms ease-out'
      }}
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-6xl mx-4 aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'scaleIn 400ms ease-out'
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="https://picsum.photos/1200/675?random=lookbook"
          muted
          loop
          playsInline
        >
          <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          {/* Top Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Play/Pause */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 transform hover:scale-110"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 md:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Background Click Area */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
