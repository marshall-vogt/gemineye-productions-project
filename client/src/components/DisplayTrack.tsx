import { tracks } from '../lib/tracks';

type Props = {
  displayTrackProps: {
    currentIndex: number;
    audioRef: React.MutableRefObject<any>;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    progressBarRef: React.MutableRefObject<any>;
    handleNext: () => void;
  };
};

export default function DisplayTrack({ displayTrackProps }: Props) {
  const { currentIndex, audioRef, setDuration, progressBarRef, handleNext } =
    displayTrackProps;

  function onLoadedMetadata() {
    const seconds = audioRef.current['duration'];
    setDuration(seconds);
    progressBarRef.current['max'] = seconds;
  }

  return (
    <div>
      <audio
        src={tracks[currentIndex].url}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="text">
        <p className="name">{tracks[currentIndex].name}</p>
      </div>
    </div>
  );
}
