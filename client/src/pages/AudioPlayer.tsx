import DisplayTrack from '../components/DisplayTrack';
import Controls from '../components/Controls';
import ProgressBar from '../components/ProgressBar';
import { useState, useRef } from 'react';
import { tracks } from '../lib/tracks';

export default function AudioPlayer() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const audioRef = useRef();
  console.log(audioRef);
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
          currentTrack={tracks[currentIndex].url}
          audioRef={audioRef}
        />
        <Controls />
        <ProgressBar />
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % tracks.length)}>
          Next
        </button>
      </div>
    </div>
  );
}
