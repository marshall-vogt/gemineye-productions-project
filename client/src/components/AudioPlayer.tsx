import DisplayTrack from '../components/DisplayTrack';
import Controls from '../components/Controls';
import ProgressBar from '../components/ProgressBar';
import { useState, useRef } from 'react';
import { tracks } from '../lib/tracks';

export default function AudioPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  function handleNext() {
    setCurrentIndex((currentIndex + 1) % tracks.length);
  }
  const progressBarProps = {
    progressBarRef,
    audioRef,
    timeProgress,
    duration,
  };
  const displayTrackProps = {
    currentIndex,
    audioRef,
    setDuration,
    progressBarRef,
    handleNext,
  };
  const controlsProps = {
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
    setCurrentIndex,
    currentIndex,
    handleNext,
  };

  return (
    <div className="flex flex-col justify-center items-center h-[8vh] sm:h-full sm:mr-5 bg-[#8368a6] rounded-md">
      <DisplayTrack displayTrackProps={displayTrackProps} />
      <Controls controlsProps={controlsProps} />
      <ProgressBar progressBarProps={progressBarProps} />
    </div>
  );
}
