"use client";

import { Dispatch, SetStateAction, useState } from "react"
import { type ParallaxItem } from "./ParallaxItem";
import Image from "next/image";
const Parallax = ({ dimensions, items, setItems, frame }: {
    frame: number;
    dimensions: [w: number, h: number];
    items: ParallaxItem[], setItems: Dispatch<SetStateAction<ParallaxItem[]>>}) => {
        const [w, h] = dimensions 
        const w2 = w/2
        const h2 = h/2
   return <div>
    {items.map((item, i) => {
        const img = item.image
        const imgProps = {
            src: img.src,
            alt: img.alt,
            width: img.width,
            height: img.height,
            fill: img.fill
        }
        return <div key={item.image.alt+i} style={{
            userSelect: "none",
            zIndex: -(item.z),
            position: "fixed",
            fill: "yellow",
            // textShadow: "0px 2px black",
            filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.3))",
            opacity: item.z,
            left: (item.x()-w2)/(item.z**2)-(Math.cos((i/items.length)*Math.PI*2)*(item.z*2))+"px",
            top: (item.y()-h2)/(item.z**2)-(Math.sin((i/items.length)*Math.PI*2)*(item.z*2))+"px",
            transform: `translate(${-(item.image.width || 0)/2+w2}px, ${-(item.image.width || 0)/2+h2}px) scale(${(1+(item.z**2))})`,
        }}
        onClick={() => {
            setItems?.((items: ParallaxItem[]) => {
return [...items]
            })
        }}
        >{item.textOverride ? item.textOverride : <Image {...imgProps}/>}</div>
    })}
   </div> 
}

export default Parallax