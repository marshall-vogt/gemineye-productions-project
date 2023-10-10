import './ProgressBar.css';

type Props = {
  progressBarProps: {
    progressBarRef: React.MutableRefObject<HTMLInputElement | null>;
    audioRef: React.MutableRefObject<HTMLAudioElement | null>;
    timeProgress: number;
    duration: number;
  };
};

export default function ProgressBar({ progressBarProps }: Props) {
  const { progressBarRef, audioRef, timeProgress, duration } = progressBarProps;
  function handleProgessChange() {
    if (audioRef.current && progressBarRef.current) {
      audioRef.current!['currentTime'] = Number(
        progressBarRef.current['value']
      );
    }
  }
  const formatTime = (time: number): string => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };
  return (
    <div className="progress">
      <span className="time current">{formatTime(timeProgress)}</span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgessChange}
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
}
