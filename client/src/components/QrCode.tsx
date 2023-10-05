import { QRCodeSVG } from 'qrcode.react';

export default function QrCode(code: string) {
  const qrcode = (
    <QRCodeSVG
      id="qrCode"
      value={code}
      size={300}
      bgColor={'#00ff00'}
      level={'H'}
    />
  );
  return (
    <div className="qrcode__container">
      <div>{qrcode}</div>
    </div>
  );
}
