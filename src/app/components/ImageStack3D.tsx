import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Image {
  src: string;
  alt: string;
}

interface ImageStack3DProps {
  images: Image[];
}

export function ImageStack3D({ images }: ImageStack3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex >= images.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = images.length - 1;
      return nextIndex;
    });
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  // Get the visible cards (current + next 3)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < Math.min(4, images.length); i++) {
      const index = (currentIndex + i) % images.length;
      cards.push({ ...images[index], stackIndex: i });
    }
    return cards.reverse(); // Reverse so the front card renders last (on top)
  };

  return (
    <div className="relative w-full h-full perspective-[2000px]">
      {/* Background stacked cards with tilt effect */}
      <div className="relative w-full h-full">
        {getVisibleCards().map((image, i) => {
          const stackIndex = image.stackIndex;
          const isActive = stackIndex === 0;
          
          return (
            <motion.div
              key={`${image.src}-${stackIndex}`}
              className={`absolute inset-0 ${isActive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
              style={{
                transformStyle: "preserve-3d",
                zIndex: isActive ? 10 : 9 - stackIndex,
              }}
              initial={false}
              animate={{
                x: stackIndex * 20,
                y: stackIndex * -8,
                rotateZ: stackIndex * 3,
                rotateY: stackIndex * -5,
                scale: 1 - stackIndex * 0.05,
                opacity: 1 - stackIndex * 0.15,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={isActive ? handleDragEnd : undefined}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-border/20 bg-white">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain select-none pointer-events-none p-4"
                />
                {/* Subtle overlay for depth on back cards */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/10"></div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}