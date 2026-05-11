import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';

export const useFFmpeg = () => {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [converting, setConverting] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    const ffmpeg = ffmpegRef.current;
    
    ffmpeg.on('progress', ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    
    setLoaded(true);
  };

  const convert = async (file: File) => {
    if (!loaded) await load();
    
    setConverting(true);
    setProgress(0);
    
    const ffmpeg = ffmpegRef.current;
    const inputName = 'input.mp4';
    const outputName = 'output.mov';
    
    await ffmpeg.writeFile(inputName, await fetchFile(file));
    
    // Fast conversion using stream copy (near instant)
    await ffmpeg.exec(['-i', inputName, '-c', 'copy', outputName]);
    
    const data = await ffmpeg.readFile(outputName) as Uint8Array;
    const buffer = new ArrayBuffer(data.byteLength);
    new Uint8Array(buffer).set(data);
    const blob = new Blob([buffer], { type: 'video/quicktime' });
    const url = URL.createObjectURL(blob);
    
    setConverting(false);
    return { url, blob, name: file.name.replace('.mp4', '.mov') };
  };

  return { loaded, progress, converting, load, convert };
};
