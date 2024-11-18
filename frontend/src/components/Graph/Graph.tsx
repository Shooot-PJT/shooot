import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as s from './Graph.css';
import { GraphColor } from './Graph.type';
import { graphColorPalette } from './GraphColor';
import { TestSSEData } from '../../pages/ServerTest/types';

export interface BottomText {
  text: string;
  x: number;
  y: number;
  pointY: number;
}

export interface GraphProps {
  frameColor: GraphColor;
  lineColor: GraphColor;
  SSEData: TestSSEData[];
  dataName: 'cpu' | 'memory' | 'disk' | 'network';
  time: number;
  dataIndex: number;
}

const formatTime = (seconds: number) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

const convertToPercentage = (value: number) => {
  if (value <= 0) return 100;
  if (value >= 120) return 0;

  return Math.round(((120 - value) / 120) * 100);
};

const drawSpline = (
  context: CanvasRenderingContext2D,
  points: BottomText[],
  lineColor: GraphColor,
) => {
  if (points.length < 2) return;

  context.beginPath();
  context.strokeStyle = `${graphColorPalette[lineColor].stroke}`;
  context.lineWidth = 3;

  context.moveTo(points[0].x + 17, points[0].pointY);

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    for (let t = 0; t < 1; t += 0.1) {
      const x =
        0.5 *
        ((-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t ** 3 +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t ** 2 +
          (-p0.x + p2.x) * t +
          2 * p1.x);
      const y =
        0.5 *
        ((-p0.pointY + 3 * p1.pointY - 3 * p2.pointY + p3.pointY) * t ** 3 +
          (2 * p0.pointY - 5 * p1.pointY + 4 * p2.pointY - p3.pointY) * t ** 2 +
          (-p0.pointY + p2.pointY) * t +
          2 * p1.pointY);

      context.lineTo(x + 17, Math.min(y, 120));
    }
  }
  context.stroke();

  context.lineTo(points[points.length - 1].x + 17, 120);
  context.lineTo(points[0].x + 17, 120);
  context.closePath();
  context.fillStyle = `${graphColorPalette[lineColor].stroke}` + '80';
  context.fill();
};

export const Graph = ({
  frameColor,
  lineColor,
  SSEData,
  dataName,
  time,
  dataIndex,
}: GraphProps) => {
  const [texts, setTexts] = useState<BottomText[]>([]);
  const [points, setPoints] = useState<BottomText[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addTimeText = useCallback(
    (time: number) => {
      const pointY =
        120 - Math.floor((SSEData[dataIndex]['curr'][dataName] / 100) * 120);
      const timeText = {
        text: formatTime(time / 60),
        x: 1170,
        y: 134,
        pointY: pointY,
      };
      setPoints((prevPoints) => [timeText, ...prevPoints]);
      setTexts((prevTexts) => [timeText, ...prevTexts]);
    },
    [SSEData, dataIndex, dataName],
  );

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.rect(0, 140, 500, 30);
    context.fillStyle = `${graphColorPalette[frameColor].rowFrame}`;
    context.fillRect(0, 120, 1000, 50);

    texts.forEach(({ text, x, y }) => {
      context.font = '13px Pretendard';
      context.fillStyle = 'white';
      context.fillText(text, x, y);
    });

    drawSpline(context, points, lineColor);

    points.forEach(({ x, pointY }) => {
      context.beginPath();
      context.arc(x + 17, pointY, 4, 0, 2 * Math.PI);
      context.fillStyle = `${graphColorPalette[lineColor].point}`;
      context.fill();

      if (pointY <= 20) {
        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(x + 17, 0);
        context.lineTo(x + 17, pointY);
        context.stroke();

        context.moveTo(x + 17, pointY + 25);
        context.lineTo(x + 17, 120);
        context.strokeStyle = `${graphColorPalette[lineColor].dashLine}`;
        context.lineWidth = 3;
        context.stroke();
        context.setLineDash([]);
      } else {
        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(x + 17, 0);
        context.lineTo(x + 17, pointY - 25);
        context.stroke();

        context.moveTo(x + 17, pointY);
        context.lineTo(x + 17, 120);
        context.strokeStyle = `${graphColorPalette[lineColor].dashLine}`;
        context.lineWidth = 3;
        context.stroke();
        context.setLineDash([]);
      }
    });

    points.forEach(({ x, pointY }) => {
      context.font = 'semibold 12px Pretendard';
      context.fillStyle = 'white';

      context.fillText(
        `${convertToPercentage(Number(pointY))}%`,
        x + 6,
        pointY <= 20 ? pointY + 20 : pointY - 10,
      );
    });

    context.rect(20, 20, 200, 200);
    context.fillStyle = `${graphColorPalette[frameColor].columnFrame}`;
    context.fillRect(0, 0, 28, 320);

    context.font = '11px Pretendard';
    for (let i = 0; i <= 5; i++) {
      const value = i * 20;
      context.fillStyle = 'white';
      const xPos = i === 5 ? 4 : i === 0 ? 11 : 6;
      context.fillText(`${value}`, xPos, 120 - value * 1.12);
    }
  }, [texts, points]);

  const animate = useCallback(() => {
    setTexts((prevTexts) =>
      prevTexts
        .map(({ text, x, y, pointY }) => ({ text, x: x - 1, y, pointY }))
        .filter(({ x }) => x > -1000),
    );
    setPoints((prevPoints) =>
      prevPoints
        .map(({ text, x, y, pointY }) => ({ text, x: x - 1, y, pointY }))
        .filter(({ x }) => x > -1000),
    );
    if (time % 180 === 0) {
      addTimeText(time);
    }
    renderCanvas();
  }, [renderCanvas, addTimeText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 960;
      canvas.height = 140;
    }
    requestAnimationFrame(animate);
  }, [renderCanvas, addTimeText, time, animate]);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        style={
          {
            '--color': `${graphColorPalette[frameColor].columnFrame}`,
          } as React.CSSProperties
        }
        className={s.canvas}
      />
    </div>
  );
};

export default Graph;
