import AudioPlayer from './AudioPlayer';

export default function Footer() {
  return (
    <div className="mt-auto bg-[#310a5d] w-full h-[10vh] flex items-end justify-between text-white font-light">
      <div className="ml-5 bg-[#8368a6] p-2 round h-[8vh] flex flex-col items-center rounded-sm">
        <div>&copy; Gemineye Productions. All rights reserved.</div>
        <div className="underline">Privacy Policy</div>
      </div>
      <div className="w-[25vw] h-full">
        <AudioPlayer />
      </div>
    </div>
  );
}
