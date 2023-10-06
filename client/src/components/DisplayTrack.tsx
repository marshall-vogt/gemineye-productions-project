type Props = {
  currentTrack: string;
  audioRef: React.MutableRefObject<any>;
};

export default function DisplayTrack({ currentTrack, audioRef }: Props) {
  return (
    <div>
      <audio src={currentTrack} ref={audioRef} />
    </div>
  );
}
