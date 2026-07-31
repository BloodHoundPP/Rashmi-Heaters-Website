interface BackgroundTextureProps {
  variant?: "grid" | "dots" | "diagonal" | "circuit";
  opacity?: number;
}

export function BackgroundTexture({ 
  variant = "grid", 
  opacity = 0.03 
}: BackgroundTextureProps) {
  const getPattern = () => {
    switch (variant) {
      case "grid":
        return {
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        };
      case "dots":
        return {
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        };
      case "diagonal":
        return {
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 11px
          )`,
          backgroundSize: "auto",
        };
      case "circuit":
        return {
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px),
            radial-gradient(circle at 20px 20px, currentColor 2px, transparent 2px)
          `,
          backgroundSize: "60px 60px, 60px 60px, 60px 60px",
        };
      default:
        return {};
    }
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none dark:opacity-[0.05]" 
      style={{ 
        opacity,
        ...getPattern() 
      }}
    />
  );
}
