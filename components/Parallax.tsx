"use client";

import { Dispatch, SetStateAction, useState } from "react"
import { type ParallaxItem } from "./ParallaxItem";
import Image from "next/image";
import { Person } from "./Entities";
import { getEmoji } from "@/emotions/simulation";
const svgImg = `data:image/svg+xml;utf8,<svg xmlns="http://w3.org" viewBox="0 0 32 32"><text y="28" font-size="28">😊</text></svg>`
const Parallax = ({ dimensions, items, setItems, frame }: {
    frame: number;
    dimensions: [w: number, h: number];
    items: (ParallaxItem & Person)[], setItems: Dispatch<SetStateAction<(ParallaxItem & Person)[]>>}) => {
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
        const enabled = item.image.enabled
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
            // textShadow: "0px 2px black",
            filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.3)) opacity(0.5)",
            backdropFilter: "blur(1px)",
            opacity: item.z,
            left: (item.x-w2-(item.textOverride ? 10 : 10))/(item.z**2)-(Math.cos((i/items.length)*Math.PI*2)*(item.z*2))+"px",
            top: (item.y-h2-(item.textOverride ? 10 : 10))/(item.z**2)-(Math.sin((i/items.length)*Math.PI*2)*(item.z*2))+"px",
            transform: `translate(${w2-((item.textOverride ? 50 : item.image.width||50)/2)}px, ${h2-((item.textOverride ? 50 : item.image.height||50)/2)}px) scale(${(1+(item.z**2))})`,
        }}
        onClick={() => {
            setItems?.((items) => {
return [...items]
            })
        }}
        >{(enabled ? (item.textOverride ? item.textOverride : <Image {...imgProps}/>) : item.dead ?  "x" : getEmoji(item))}</div>
    })}
   </div> 
}

export default Parallax