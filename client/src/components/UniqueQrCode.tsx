import QrCode from './QrCode';

export default function UniqueQrCode({ code }: { code: string }) {
  return QrCode(code);
}
