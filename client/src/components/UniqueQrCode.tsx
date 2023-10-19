import QrCode from './QrCode';

type Props = {
  code: string;
  index: number;
  size: number;
};

export default function UniqueQrCode({ code, index, size }: Props) {
  return QrCode(code, index, size);
}
