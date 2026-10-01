/**
 * Automatically trims transparent margins from an image file using an offscreen canvas.
 * If the image has substantial transparent padding (e.g. cutout on a large empty canvas),
 * it returns a cropped File object. If it's already tight or has no alpha, it returns original.
 */
export async function autoTrimImageFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type.includes("svg")) {
    return file;
  }

  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
        const { naturalWidth: width, naturalHeight: height } = img;
        if (!width || !height || width < 50 || height < 50) {
          return resolve(file);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve(file);

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        let minX = width;
        let maxX = 0;
        let minY = height;
        let maxY = 0;
        let hasTransparency = false;

        // Adaptive step size for performance on large photos (e.g. 4000x4000)
        const step = Math.max(1, Math.floor(Math.max(width, height) / 800));

        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const alpha = data[(y * width + x) * 4 + 3];
            if (alpha < 245) {
              hasTransparency = true;
            }
            if (alpha > 15) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        // If no transparency or the non-transparent content already fills > 94% of the canvas, keep original
        if (!hasTransparency || maxX <= minX || maxY <= minY) {
          return resolve(file);
        }

        const emptyTop = minY / height;
        const emptyBottom = (height - maxY) / height;
        const emptyLeft = minX / width;
        const emptyRight = (width - maxX) / width;

        // If padding on all sides is minimal (< 4%), no need to crop
        if (emptyTop < 0.04 && emptyBottom < 0.04 && emptyLeft < 0.04 && emptyRight < 0.04) {
          return resolve(file);
        }

        // Add 2% breathing margin so the product isn't flush against the cut
        const padX = Math.round((maxX - minX) * 0.02);
        const padY = Math.round((maxY - minY) * 0.02);

        const cropX = Math.max(0, minX - padX);
        const cropY = Math.max(0, minY - padY);
        const cropW = Math.min(width - cropX, (maxX - minX) + padX * 2);
        const cropH = Math.min(height - cropY, (maxY - minY) + padY * 2);

        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const cropCtx = cropCanvas.getContext("2d");
        if (!cropCtx) return resolve(file);

        cropCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        cropCanvas.toBlob(
          (blob) => {
            if (blob && blob.size > 0) {
              const trimmedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".png", {
                type: "image/png",
                lastModified: Date.now(),
              });
              resolve(trimmedFile);
            } else {
              resolve(file);
            }
          },
          "image/png"
        );
      } catch (err) {
        console.warn("AutoTrim canvas error, fallback to original:", err);
        resolve(file);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };

    img.src = url;
  });
}

/**
 * Cache for trimmed data URLs so an image is only scanned/trimmed once per session.
 */
const trimmedUrlCache = new Map<string, string>();

/**
 * Trims transparent borders from a remote image URL using an in-memory canvas.
 * Returns a data URL of the tightly cropped image, or original URL if no trimming was needed.
 */
export async function autoTrimImageUrl(src: string): Promise<string> {
  if (!src || src.startsWith("data:") || src.includes(".svg")) {
    return src;
  }
  if (trimmedUrlCache.has(src)) {
    return trimmedUrlCache.get(src)!;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const { naturalWidth: width, naturalHeight: height } = img;
        if (!width || !height || width < 50 || height < 50) {
          trimmedUrlCache.set(src, src);
          return resolve(src);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          trimmedUrlCache.set(src, src);
          return resolve(src);
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        let minX = width;
        let maxX = 0;
        let minY = height;
        let maxY = 0;
        let hasTransparency = false;

        const step = Math.max(1, Math.floor(Math.max(width, height) / 600));

        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const alpha = data[(y * width + x) * 4 + 3];
            if (alpha < 245) {
              hasTransparency = true;
            }
            if (alpha > 15) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        if (!hasTransparency || maxX <= minX || maxY <= minY) {
          trimmedUrlCache.set(src, src);
          return resolve(src);
        }

        const emptyTop = minY / height;
        const emptyBottom = (height - maxY) / height;
        const emptyLeft = minX / width;
        const emptyRight = (width - maxX) / width;

        // If padding on all sides is minimal (< 4%), keep original
        if (emptyTop < 0.04 && emptyBottom < 0.04 && emptyLeft < 0.04 && emptyRight < 0.04) {
          trimmedUrlCache.set(src, src);
          return resolve(src);
        }

        // Add 2% breathing margin
        const padX = Math.round((maxX - minX) * 0.02);
        const padY = Math.round((maxY - minY) * 0.02);

        const cropX = Math.max(0, minX - padX);
        const cropY = Math.max(0, minY - padY);
        const cropW = Math.min(width - cropX, (maxX - minX) + padX * 2);
        const cropH = Math.min(height - cropY, (maxY - minY) + padY * 2);

        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const cropCtx = cropCanvas.getContext("2d");
        if (!cropCtx) {
          trimmedUrlCache.set(src, src);
          return resolve(src);
        }

        cropCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
        const trimmedDataUrl = cropCanvas.toDataURL("image/png");
        trimmedUrlCache.set(src, trimmedDataUrl);
        resolve(trimmedDataUrl);
      } catch (err) {
        // Cross-origin canvas security might throw if CORS headers are missing; fallback to original safely
        trimmedUrlCache.set(src, src);
        resolve(src);
      }
    };

    img.onerror = () => {
      trimmedUrlCache.set(src, src);
      resolve(src);
    };

    img.src = src;
  });
}
