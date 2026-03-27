"use client";
import Parallax from "@/components/Parallax";
import { PointerEventHandler, useEffect, useState } from "react";

export default function HomePage() {
  const[score, setScore] = useState(32)
  const [looping, setLooping] = useState(true)
  const [position, setPosition] = useState([0,0])
  
  const [smileys, setSmileys] = useState<number[]>([])
  const handleDown = (e: any) => {
    const x = e.pageX;
    const y = e.pageY;
    setPosition([x, y])
    // setLooping(true)
  }
  const handleMove = (e: any) => {
       const x = e.pageX;
    const y = e.pageY;
    setPosition([x, y])
    setSmileys(s => {
      const z = ((w/2-x)+(h/2-y))/2
      return s.length < (frame%score) ? [...s, z] : [...s.slice(1), z]
  })
  }
  const handleUp = (e: any) => {
  // setLooping(false)
  }
  const [w, setW] = useState(900)
  const [h, setH] = useState(900)
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if(typeof window != 'undefined'){
      const resize = () => {
        setW(window.innerWidth)
        setH(window.innerHeight)
      }
      addEventListener("resize", resize, false)
      const loop = () => {
        setFrame(frame => frame + 1)
        requestAnimationFrame(loop)
      }
      requestAnimationFrame(loop)
      return () => {
        removeEventListener("resize", resize, false)
      }
    }
  }, [])
  const [now, setNow] = useState(0)
  const mapNowToEmoji = [
    [0, ""],
    [3000, "🙂"],
    [0, ""],
    [4500, "😊"],
    [0, ""],
    [6000, "😄"],
    [0, ""],
    [0, "😺"]
  ]
  const makeSmiley = (z: number) => {
    return {
    x: () => position[0]+Math.cos(performance.now()/1000)*(z*20),
    y: () => position[1]+Math.sin(performance.now()/1000)*(z*20),
    z,
    textOverride: (mapNowToEmoji[Math.floor(now/3000%(3000*mapNowToEmoji.length))]?.[1] as string || ""),
    image: {
      src: "/smile.svg",
      alt: "🙂",
      width: 80,
      height: 80,
      fill: false,
    }
   }
  }
  const items = smileys.map((index, i, arr) => {
    return makeSmiley(index/arr.length/2+0.5)
  })
  return (
    <div style={{background: frame % 6000 < 3000 ? "black" : "white",
      width: '100vw', height: '100dvh'}} onPointerDown={handleDown}
     onPointerMove={handleMove}
     onPointerUp={handleUp}
     onPointerOut={handleUp}
    >
      <h1 className="z-99 cursor-pointer text-yellow-500 fixed left-1/2 top-1/2 text-4xl" onClick={() => {
setNow(now => (now + 3000) % (3000*mapNowToEmoji.length))
      }}>{mapNowToEmoji[Math.floor(now/3000%(3000*mapNowToEmoji.length))]?.[1] || ":)" as string}</h1>
   <Parallax
   frame={frame}
   dimensions={[w, h]}
   items={items} /></div>
  );
  
}
