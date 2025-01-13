"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [selectedColor, setSelectedColor] = useState("#000");
  const [canvasContext, setCanvasContext] = useState({});

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  const draw = (e, ctx) => {
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = windowWidth - 80;
    canvas.height = windowHeight - 80;

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

  const changeColor = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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
        onMouseMoveCapture={draw}
        width={windowWidth}
        height={windowHeight}
      ></canvas>
    </div>
  );
}
