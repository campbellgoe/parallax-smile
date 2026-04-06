"use client";
import Parallax from "@/components/Parallax";
import { ParallaxItem } from "@/components/ParallaxItem";
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
    setScore(score => (score+1)%48)
setSmileys(zs => {
  return [...zs.map(z => {
    return z-1
  })]
})
  }
  const handleMove = (e: any) => {
       const x = e.pageX;
    const y = e.pageY;
    const id = setTimeout(() => {
setPosition([x, y])
setSmileys(s => {
      return s.length < (Math.floor((frame/2)%score)) ? [...s, (s.at(-1) || 0)+0.01] : [...s.slice(0, s.length-3), (s.at(-1) || 0)+0.01]
  })
    }, 1000/60)
    
    
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
      src: "/Smiley_face_with_rainbow_joy_alpha.png",
      alt: "🙂",
      width: 256,
      height: 256,
      fill: false,
    }
   }
  }

  const [items, setItems] = useState<ParallaxItem[]>([])
  useEffect(() => {
  setItems(smileys.map((index, i, arr) => {
    return makeSmiley(index/arr.length**0.72+0.5)
  }))
  }, [smileys])

  return (
    <div style={{background: frame % 6000 < 3000 ? "black" : "white",
      width: '100vw', height: '100dvh'}} onPointerDown={handleDown}
     onPointerMove={handleMove}
     onPointerUp={handleUp}
     onPointerOut={handleUp}
    >
      
   <Parallax
   frame={frame}
   dimensions={[w, h]}
   items={items}
   setItems={setItems} />
  <button className="z-99 w-[48px] h-[48px] cursor-pointer text-yellow-500 fixed left-1/2 top-1/2 text-4xl" onClick={() => {
setNow(now => (now + 3000) % (3000*mapNowToEmoji.length))
      }}>{mapNowToEmoji[Math.floor(now/3000%(3000*mapNowToEmoji.length))]?.[1] || "😁" as string}</button>
      </div>)
}
