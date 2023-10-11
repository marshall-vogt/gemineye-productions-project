import { useEffect, useState, useCallback, useRef } from 'react';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from 'react-icons/io';
import { tracks } from '../lib/tracks';

type Props = {
  controlsProps: {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>;
    progressBarRef: React.MutableRefObject<HTMLInputElement | null>;
    duration: number;
    setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    currentIndex: number;
    handleNext: () => void;
  };
};

export default function Controls({ controlsProps }: Props) {
  const {
    audioRef,
    progressBarRef,
    // duration,
    setTimeProgress,
    setCurrentIndex,
    currentIndex,
    handleNext,
  } = controlsProps;
  const [isPlaying, setIsPlaying] = useState(false);
  const playAnimationRef = useRef<number>();
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  function togglePlayPause() {
    setIsPlaying(!isPlaying);
  }
  function skipForward() {
    audioRef.current!.currentTime += 10;
  }

  function skipBackward() {
    audioRef.current!.currentTime -= 10;
  }

  function handlePrevious() {
    setCurrentIndex((currentIndex + tracks.length - 1) % tracks.length);
  }

  const repeat = useCallback(() => {
    const currentTime = audioRef.current!['currentTime'];
    setTimeProgress(currentTime);
    progressBarRef.current!['value'] = String(currentTime);
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    audioRef.current!.volume = volume / 100;
    audioRef.current!.muted = muteVolume;
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="flex flex-col justify-center items-center w-[20vw]">
      <div
        className="w-[10vw] flex justify-between mb-2"
        style={{ display: 'flex' }}>
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>
        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>
        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
      <div className="mb-1">
        <button onClick={() => setMuteVolume(!muteVolume)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className=""
        />
      </div>
    </div>
  );
}
