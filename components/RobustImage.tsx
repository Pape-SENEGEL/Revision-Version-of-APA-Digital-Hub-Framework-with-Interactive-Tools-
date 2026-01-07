import React, { useState, useEffect } from 'react';
import { PhotoIcon } from './IconComponents';

interface RobustImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    width: string;
    height: string;
}

const generateSrcSet = (baseUrl: string, aspectRatio: number): string => {
    // Only generate for Unsplash URLs for this specific implementation
    if (typeof baseUrl !== 'string' || !baseUrl.includes('source.unsplash.com')) {
        return '';
    }

    const urlParts = baseUrl.split('?')[0].split('/');
    const photoId = urlParts[urlParts.length - 1];
    
    // Basic check if it is a valid ID and not a keyword/user path
    if (!photoId || photoId.length < 5 || photoId.includes(' ')) return '';

    const widths = [400, 600, 800, 1200, 1600];
    return widths
        .map(w => {
            const h = Math.round(w / aspectRatio);
            return `https://source.unsplash.com/${photoId}/${w}x${h} ${w}w`;
        })
        .join(', ');
};


const RobustImage: React.FC<RobustImageProps> = ({ src, alt, className, width, height, ...props }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [imageSrcSet, setImageSrcSet] = useState<string | undefined>();

  // Calculate aspect ratio from width and height props
  const numericWidth = parseInt(width, 10);
  const numericHeight = parseInt(height, 10);
  const aspectRatio = (numericWidth && numericHeight > 0) ? numericWidth / numericHeight : 16 / 9;

  useEffect(() => {
    setStatus('loading');
    setImageUrl(undefined);
    setImageSrcSet(undefined);
    let objectUrlToRevoke: string | null = null;

    if (!src) {
      setStatus('error');
      return;
    }

    let url: string;
    if (typeof src === 'string') {
      url = src;
      const srcSet = generateSrcSet(src, aspectRatio);
      if (srcSet) {
        setImageSrcSet(srcSet);
      }
    } else if (src instanceof Blob) {
      url = URL.createObjectURL(src);
      objectUrlToRevoke = url;
    } else {
      console.error('Unsupported src type for RobustImage:', src);
      setStatus('error');
      return;
    }

    const img = new Image();
    img.src = url; // Load a base image to check for success/error
    img.onload = () => {
      setStatus('loaded');
      setImageUrl(url);
    };
    img.onerror = () => {
      setStatus('error');
      setImageUrl(undefined);
      setImageSrcSet(undefined);
    };

    return () => {
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [src, aspectRatio]);

  if (status === 'error') {
    return (
      <div className={`${className || ''} flex items-center justify-center bg-slate-200`}>
        <PhotoIcon className="w-1/4 h-1/4 text-slate-400" />
      </div>
    );
  }
  
  if (status === 'loading') {
    return <div className={`${className || ''} bg-slate-200 animate-pulse`} />;
  }
  
  // A generic but effective `sizes` attribute. For best performance, this should be
  // tailored for each component instance based on its layout in the page.
  const sizes = props.sizes || "100vw";

  return (
    <img
      src={imageUrl}
      srcSet={imageSrcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default RobustImage;