import { useEffect, useState } from 'react';

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const images = [
    '/images/dj1.JPG',
    '/images/dj3.JPG',
    '/images/dj4.JPG',
    '/images/dj5.JPG',
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIndex((index + 1) % images.length), 3000);
    return () => clearTimeout(timer);
  }, [index, images.length]);
  return (
    <div className="flex justify-center">
      <img src={images[index]} alt="dj" className="w-auto" />
    </div>
  );
}
