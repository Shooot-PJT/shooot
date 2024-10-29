import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as s from './Graph.css';
import { GraphColor } from './Graph.type';
import { graphColorPalette } from './GraphColor';

export interface BottomText {
  text: string;
  x: number;
  y: number;
  pointY: number;
}

export interface GraphProps {
  frameColor: GraphColor;
  lineColor: GraphColor;
}

const formatTime = (seconds: number) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

const convertToPercentage = (value: number) => {
  if (value <= 0) return 100;
  if (value >= 280) return 0;

  return Math.round(((280 - value) / 280) * 100);
};

const drawSpline = (
  context: CanvasRenderingContext2D,
  points: BottomText[],
  lineColor: GraphColor,
) => {
  if (points.length < 2) return;

  context.beginPath();
  context.strokeStyle = `${graphColorPalette[lineColor].stroke}`;
  context.lineWidth = 4;

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

      context.lineTo(x + 17, Math.min(y, 280));
    }
  }
  context.stroke();

  context.lineTo(points[points.length - 1].x + 17, 280);
  context.lineTo(points[0].x + 17, 280);
  context.closePath();
  context.fillStyle = `${graphColorPalette[lineColor].stroke}` + '80';
  context.fill();
};

export const Graph = ({ frameColor, lineColor }: GraphProps) => {
  const [texts, setTexts] = useState<BottomText[]>([]);
  const [points, setPoints] = useState<BottomText[]>([]);
  const [time, setTime] = useState<number>(0);
  const [hoveredPoint, setHoveredPoint] = useState<BottomText | null>(null); // hover된 점 상태
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(time);

  const addTimeText = useCallback((time: number) => {
    const randomY = 280 - Math.floor(Math.random() * 280);
    const timeText = {
      text: formatTime(time),
      x: 1350,
      y: 300,
      pointY: randomY,
    };
    setPoints((prevPoints) => [timeText, ...prevPoints]);
    setTexts((prevTexts) => [timeText, ...prevTexts]);
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.rect(0, 0, 500, 30);
    context.fillStyle = `${graphColorPalette[frameColor].rowFrame}`;
    context.fillRect(0, 280, 1000, 50);

    texts.forEach(({ text, x, y }) => {
      context.font = '14px Pretendard';
      context.fillStyle = 'white';
      context.fillText(text, x, y);

      context.beginPath();
      context.setLineDash([2, 5]);
      context.moveTo(x + 17, 0);
      context.lineTo(x + 17, 280);
      context.strokeStyle = `${graphColorPalette[lineColor].dashLine}`;
      context.lineWidth = 3;
      context.stroke();
      context.setLineDash([]);
    });

    drawSpline(context, points, lineColor);

    points.forEach(({ x, pointY }) => {
      context.beginPath();
      context.arc(x + 17, pointY, 6, 0, 2 * Math.PI);
      context.fillStyle = `${graphColorPalette[lineColor].point}`;
      context.fill();
    });

    if (hoveredPoint) {
      context.font = '16px Pretendard';
      context.fillStyle = 'white';
      context.fillText(
        `Value: ${convertToPercentage(hoveredPoint.pointY)}%`,
        hoveredPoint.x + 25,
        hoveredPoint.pointY < 50
          ? hoveredPoint.pointY + 20
          : hoveredPoint.pointY - 10,
      );
    }

    context.rect(20, 20, 200, 200);
    context.fillStyle = `${graphColorPalette[frameColor].columnFrame}`;
    context.fillRect(0, 0, 28, 320);

    context.font = '12px Pretendard';
    for (let i = 0; i <= 10; i++) {
      const value = i * 10;
      context.fillStyle = 'white';
      const xPos = i === 10 ? 2 : i === 0 ? 10 : 6;
      context.fillText(`${value}`, xPos, 286 - value * 2.72);
    }
  }, [texts, points, hoveredPoint]);

  const animate = useCallback(() => {
    setTexts((prevTexts) =>
      prevTexts
        .map(({ text, x, y, pointY }) => ({ text, x: x - 1, y, pointY }))
        .filter(({ x }) => x > -5000),
    );
    setPoints((prevPoints) =>
      prevPoints
        .map(({ text, x, y, pointY }) => ({ text, x: x - 1, y, pointY }))
        .filter(({ x }) => x > -5000),
    );
    renderCanvas();
  }, [renderCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 960;
      canvas.height = 320;
    }
    requestAnimationFrame(animate);
  }, [renderCanvas, addTimeText, time, animate]);

  useEffect(() => {
    const secondIntervalId = setInterval(() => {
      setTime(timeRef.current);
      addTimeText(timeRef.current);
      timeRef.current += 3;
    }, 3000);
    return () => {
      clearInterval(secondIntervalId);
    };
  }, [addTimeText]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const hovered = points.find(
        ({ x, pointY }) =>
          mouseX >= x + 17 - 30 &&
          mouseX <= x + 17 + 30 &&
          mouseY >= pointY - 30 &&
          mouseY <= pointY + 30,
      );
      setHoveredPoint(hovered || null);
    },
    [points],
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>실시간 그래프</h3>
      <canvas
        ref={canvasRef}
        className={s.canvas}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default Graph;
