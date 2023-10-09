import DisplayTrack from '../components/DisplayTrack';
import Controls from '../components/Controls';
import ProgressBar from '../components/ProgressBar';
import { useState, useRef } from 'react';
import { tracks } from '../lib/tracks';

export default function AudioPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
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
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack displayTrackProps={displayTrackProps} />
        <Controls controlsProps={controlsProps} />
        <ProgressBar progressBarProps={progressBarProps} />
      </div>
    </div>
  );
}
