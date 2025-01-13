"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  const draw = (e: any, ctx: any) => {
    if (!isDrawing) return;
    if (ctx === undefined) return;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  };

  useEffect(() => {
    const canvas = document.querySelector("#draw") as HTMLCanvasElement;
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas?.getContext("2d");
    if (ctx === null) return;

    canvas.width = window.innerWidth - 80;
    canvas.height = window.innerHeight - 80;

    ctx.lineCap = "round";
    ctx.lineWidth = 10;

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener("mousemove", (e) => draw(e, ctx));
    canvas.addEventListener("mouseup", () => (isDrawing = false));
    canvas.addEventListener("mouseout", () => (isDrawing = false));
  }, []);

  const changeColor = (e: any) => {
    const canvas = document.querySelector("#draw") as HTMLCanvasElement;
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    ctx.strokeStyle = e.target.value;
  };
  return (
    <div className="p-10">
      <h1>Sketchy</h1>
      <input type="color" onChange={(e) => changeColor(e)} />
      <canvas
        id="draw"
        className="border-black border-1px bg-white "
        ref={canvasRef}
        onMouseMoveCapture={() => draw}
      ></canvas>
    </div>
  );
}
