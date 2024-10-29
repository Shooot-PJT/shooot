import React, { useRef, useEffect, useState } from 'react';

export interface BottomText {
  text: string;
  x: number;
  y: number;
}

const CanvasExample = () => {
  const [texts, setTexts] = useState<BottomText[]>([]);
  const [points, setPoints] = useState<BottomText[]>([]);
  const canvasRef = useRef(null);

  // 시각적 시간 문자열을 생성하는 함수
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 300;

    let elapsedTime = 0;
    let texts = [];
    let points = [];

    const addTimeText = () => {
      const randomY = 250 - Math.floor(Math.random() * 210);
      const timeText = {
        text: formatTime(elapsedTime),
        x: canvas.width + 250,
        y: 275,
        pointY: randomY,
      };
      texts.push(timeText);
      elapsedTime += 1;
    };

    const delayPoint = () => {
      if (texts.length > points.length) {
        points.push(texts[points.length]);
      }
    };

    const drawSpline = (points) => {
      if (points.length < 2) return;

      context.beginPath();
      context.strokeStyle = '#ff5c5c';
      context.lineWidth = 2;

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
              (2 * p0.pointY - 5 * p1.pointY + 4 * p2.pointY - p3.pointY) *
                t ** 2 +
              (-p0.pointY + p2.pointY) * t +
              2 * p1.pointY);

          context.lineTo(x + 17, y);
        }
      }
      context.stroke();
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.moveTo(29, 250);
      context.lineTo(500, 250);
      context.strokeStyle = '#825cff';
      context.lineWidth = 3;
      context.stroke();

      context.beginPath();
      context.moveTo(30, 0);
      context.lineTo(30, 250);
      context.strokeStyle = '#825cff';
      context.lineWidth = 3;
      context.stroke();

      context.font = '12px Arial';
      for (let i = 0; i <= 10; i++) {
        const value = i * 10;
        context.fillText(`${value}`, 6, 250 - value * 2.5);
      }

      texts = texts
        .map(({ text, x, y, pointY }) => ({ text, x: x - 2, y, pointY }))
        .filter(({ x }) => x > -500);

      points = points
        .map(({ text, x, y, pointY }) => ({ text, x: x - 2, y, pointY }))
        .filter(({ x }) => x > -500);

      drawSpline(points);

      texts.forEach(({ text, x, y, pointY }) => {
        context.font = '14px Arial';
        context.fillStyle = 'white';
        context.fillText(text, x, y);

        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(x + 17, 0);
        context.lineTo(x + 17, 250);
        context.strokeStyle = '#825cff';
        context.stroke();
        context.setLineDash([]);
      });

      points.forEach(({ x, pointY }) => {
        context.beginPath();
        context.arc(x + 17, pointY, 4, 0, 2 * Math.PI);
        context.fillStyle = '#ff5c5c';
        context.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const timeInterval = setInterval(addTimeText, 1000);
    const pointInterval = setInterval(delayPoint, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(pointInterval);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>대충 예시 그래프</h3>
      <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default CanvasExample;
