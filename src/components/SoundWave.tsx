"use client";

import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
import { useEffect, useRef, useState } from "react";
import { Spin } from "antd";

const SoundWave = ({ soundUrl }: { soundUrl: string }) => {
  const [ready, setReady] = useState(false);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReady(false);
    if (!containerRef.current) return;
    // Create WaveSurfer instance
    const ws = WaveSurfer.create({
      mediaControls: true,
      container: containerRef.current,
      waveColor: "#1f77b4",
      progressColor: "#165886",
      url: soundUrl,
      sampleRate: 44100,
    });
    waveSurferRef.current = ws;
    // Register Spectrogram plugin
    ws.registerPlugin(
      Spectrogram.create({
        labels: true,
        height: 200,
        splitChannels: true,
        scale: "mel",
        frequencyMax: 8000,
        frequencyMin: 0,
        fftSamples: 1024,
        labelsBackground: "rgba(0, 0, 0, 0.1)",
      })
    );

    ws.on("ready", (duration) => {
      console.log("Ready", duration + "s");
      setReady(true);
    });
    return () => {
      ws.destroy();
      waveSurferRef.current = null;
    };
  }, [soundUrl]);

  return (
    <>
      <div
        ref={containerRef}
        id="waveform"
        className="relative"
        style={{ visibility: ready ? "visible" : "hidden" }}
      ></div>
      ;
      <Spin spinning={!ready} />
    </>
  );
};

export default SoundWave;
