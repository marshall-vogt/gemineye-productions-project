import { tracks } from '../lib/tracks';

type Props = {
  displayTrackProps: {
    currentIndex: number;
    audioRef: React.MutableRefObject<HTMLAudioElement | null>;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    progressBarRef: React.MutableRefObject<HTMLInputElement | null>;
    handleNext: () => void;
  };
};

export default function DisplayTrack({ displayTrackProps }: Props) {
  const { currentIndex, audioRef, setDuration, progressBarRef, handleNext } =
    displayTrackProps;

  function onLoadedMetadata() {
    const seconds = audioRef.current!['duration'];
    setDuration(seconds);
    progressBarRef.current!['max'] = String(seconds);
  }

  return (
    <div>
      <audio
        src={tracks[currentIndex].url}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="tracking-wide text-sm mb-2 font-medium">
        <p>Artist- {tracks[currentIndex].name}</p>
      </div>
    </div>
  );
}
