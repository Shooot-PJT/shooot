import React, { useEffect, useRef } from 'react';
import * as s from './StarFieldAnimation.css';

interface Star {
  myX: number;
  myY: number;
  myColor: number;
  updatePos: () => void;
  updateColor: () => void;
}

const StarFieldAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starField: Star[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const xMod = 0;
    const yMod = 6;

    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 480;
    canvas.height = 320;

    // Star 생성자 함수
    const createStar = (): Star => ({
      myX: Math.random() * window.innerWidth,
      myY: (Math.random() * window.innerHeight) / 2,
      myColor: 128,
      updatePos() {
        const speedMult = 0.01;
        this.myX += xMod + (this.myX - window.innerWidth / 2) * 0.0006;
        this.myY += yMod + (this.myY - window.innerHeight / 4) * speedMult;
        this.updateColor();

        if (this.myX > window.innerWidth || this.myX < 0) {
          this.myX = Math.random() * window.innerWidth;
          this.myColor = 0;
        }
        if (this.myY > window.innerHeight || this.myY < 0) {
          this.myY = Math.random() * window.innerHeight;
          this.myColor = 0;
        }
      },
      updateColor() {
        this.myColor = Math.min(this.myColor + 12, 255);
      },
    });

    // Star 초기화
    for (let i = 0; i < 300; i++) {
      starField.push(createStar());
    }

    // 애니메이션 루프
    const draw = () => {
      if (ctx) {
        // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = 'rgba(58, 58, 74, 1)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        starField.forEach((star) => {
          ctx.fillStyle = `rgb(${star.myColor}, ${star.myColor}, ${star.myColor})`;
          ctx.fillRect(star.myX, star.myY, 4, (star.myColor / 128) * 2);
          star.updatePos();
        });
        requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {};
  }, []);

  return <canvas className={s.myCanvas} ref={canvasRef} />;
};

export default StarFieldAnimation;
