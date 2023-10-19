import { QRCodeSVG } from 'qrcode.react';

export default function QrCode(code: string, index: number, size: number) {
  const qrcode = (
    <QRCodeSVG
      id={String(index)}
      value={code}
      size={size}
      bgColor={'#00ff00'}
      level={'H'}
    />
  );
  return (
    <div>
      <div>{qrcode}</div>
    </div>
  );
}
