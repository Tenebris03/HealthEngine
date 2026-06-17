import { useMemo, useState } from 'react';

const PAD = { top: 10, right: 10, bottom: 10, left: 10 };

interface Props {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

let uidCounter = 0;

export function SimpleSparkline({
  data,
  width = 600,
  height = 160,
  color = 'var(--color-primary)',
}: Props) {
  const [uid] = useState(() => `sf-${++uidCounter}`);
  const path = useMemo(() => {
    if (data.length < 2) return null;
    const innerW = width - PAD.left - PAD.right;
    const innerH = height - PAD.top - PAD.bottom;
    const xScale = (i: number) => PAD.left + (i / (data.length - 1)) * innerW;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 10;
    const yScale = (v: number) => PAD.top + (1 - (v - min) / range) * innerH;

    const xs = data.map((_, i) => xScale(i));
    const ys = data.map(yScale);

    const line = data
      .map((_, i) => `${i === 0 ? 'M' : 'L'}${xs[i]},${ys[i]}`)
      .join(' ');
    const fill = `${line} L${xs[xs.length - 1]},${height - PAD.bottom} L${xs[0]},${height - PAD.bottom} Z`;

    return { line, fill, xs, ys, min, max };
  }, [data, width, height]);

  if (!path) {
    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize={13}
        >
          Not enough data
        </text>
      </svg>
    );
  }

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`sf-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={path.fill} fill={`url(#sf-${uid})`} />
      <path d={path.line} fill="none" stroke={color} strokeWidth={2} />
      {path.xs.map((x, i) => (
        <circle key={i} cx={x} cy={path.ys[i]} r={3} fill={color} />
      ))}
    </svg>
  );
}
