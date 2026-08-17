"use client";

import { Dispatch, SetStateAction, useState } from "react"
import { type ParallaxItem } from "./ParallaxItem";
import Image from "next/image";
import { Entity } from "./Entities";
import { getEmoji } from "@/emotions/simulation";
const svgImg = `data:image/svg+xml;utf8,<svg xmlns="http://w3.org" viewBox="0 0 32 32"><text y="28" font-size="28">😊</text></svg>`
const Parallax = ({ dimensions, items, setItems, frame }: {
    frame: number;
    dimensions: [w: number, h: number];
    items: (ParallaxItem & Entity)[], setItems: Dispatch<SetStateAction<(ParallaxItem & Entity)[]>>}) => {
        const [w, h] = dimensions 
    let w2 = w/2 
    let h2 = h/2
        if(typeof window != 'undefined'){
         w2 = window.innerWidth/2
         h2 = window.innerHeight/2
        }
   return <div>
    {items.map((item, i) => {
        const img = item.image
        const imgProps =  {
            src: (img.src || svgImg) as string,
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
            opacity: item.z,
            left: (item.x-w2-(item.textOverride ? 10 : 10))/(item.z**2)-(Math.cos((i/items.length)*Math.PI*2)*(item.z*2))+"px",
            top: (item.y-h2-(item.textOverride ? 10 : 10))/(item.z**2)-(Math.sin((i/items.length)*Math.PI*2)*(item.z*2))+"px",
            transform: `translate(${w2-((item.textOverride ? 50 : item.image.width||50)/2)}px, ${h2-((item.textOverride ? 50 : item.image.height||50)/2)}px) scale(${(1+(item.z**2))})`,
        }}
        onClick={() => {
//             setItems?.((items) => {
// return [...items]
//             })
        }}
        >{(img.enabled ? (item.textOverride ? item.textOverride : <Image {...imgProps}/>) : item.isDead ?  "x" : getEmoji(item))}</div>
    })}
   </div> 
}

export default Parallax