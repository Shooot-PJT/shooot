import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface BottomText {
  text: string;
  x: number;
  y: number;
}

const formatTime = (seconds: number) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

const CanvasExample = () => {
  const [texts, setTexts] = useState<BottomText[]>([
    {
      text: '00:00',
      x: 250,
      y: 275,
    },
  ]);
  const [time, setTime] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 새로운 텍스트 추가 함수
  const addTimeText = useCallback((time: number) => {
    const randomY = 250 - Math.floor(Math.random() * 210);
    const timeText = {
      text: formatTime(time),
      x: 500,
      y: 275,
    };
    setTexts((prevTexts) => [timeText, ...prevTexts]);
  }, []);

  // Canvas 렌더링 함수
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // 타임라인과 축 그리기
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

    // 텍스트와 점선 렌더링
    texts.forEach(({ text, x, y }) => {
      context.font = '14px Arial';
      context.fillStyle = 'white';
      context.fillText(text, x, y);

      // 점선 렌더링
      context.beginPath();
      context.setLineDash([2, 5]);
      context.moveTo(x + 17, 0);
      context.lineTo(x + 17, 250);
      context.strokeStyle = '#825cff';
      context.stroke();
      context.setLineDash([]); // 점선 해제
    });
  }, []);

  // 상태 업데이트 및 캔버스 렌더링 관리
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 300;
    }

    // 애니메이션 프레임 설정
    const animate = (timestamp) => {
      renderCanvas();
      setTexts(
        (prevTexts) =>
          prevTexts
            .map(({ text, x, y }) => ({ text, x: x - 2, y })) // 왼쪽으로 이동
            .filter(({ x }) => x > -50), // 화면 밖으로 나간 텍스트 제거
      );
      requestAnimationFrame(animate);
    };

    animate(time);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>실시간 그래프</h3>
      <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default CanvasExample;
