"use client";
import { type Entity } from "@/components/Entities";
import Parallax from "@/components/Parallax";
import { type ParallaxItem } from "@/components/ParallaxItem";
import { interact } from "@/emotions/interactions";
import { updateMovement } from "@/emotions/movement";
import { distance, getDominantEmotion, getPersonConfig } from "@/emotions/simulation";
import { v4 as uuidv4 } from "uuid"
import { useEffect, useRef, useState } from "react";
const collectRandomEmotions = () => {
  return { "joy": Math.random(), "sadness": Math.random(), "fear": Math.random(), "anger": Math.random(), "love": Math.random(), "fire": Math.random()*0.75, }
}
const abortController = new AbortController()
export function updatePeople(
  people: Entity[],
  width: number,
  height: number,
  frame: number,
  pointer: { current: { lastX: number; lastY: number; down: boolean }}
) {
  const next = structuredClone(people);

  for (let i = 0; i < next.length; i++) {
    const personA = next[i];

    for (
      let j = i + 1;
      j < next.length;
      j++
    ) {
      const personB = next[j];

      const d = distance(
        personA,
        personB,
      );

      if (d > 100) continue;

      interact(personA, personB);
      interact(personB, personA);
    }
  }

  for (const person of next) {
    updateMovement(person, frame, pointer);

    person.x += person.vx;
    person.y += person.vy;

    person.vx *= 0.98;
    person.vy *= 0.98;

    if (person.x < 0) {
      person.x = width-10;
      // person.vx *= -1;
    }

    if (person.x > width) {
      person.x = 10;
      // person.vx *= -1;
    }

    if (person.y < 0) {
      person.y = height-10;
      // person.vy *= -1;
    }

    if (person.y > height) {
      person.y = 10;
      // person.vy *= -1;
    }
  }

  return next;
}
export default function HomePage() {
  const [nAncestors, setNAncestors] = useState(0)
  const [enableSmileWinState, setEnableSmileWinState] = useState(false)
  // const[score, setScore] = useState(32)
  const [looping, setLooping] = useState(true)
  const [position, setPosition] = useState([0, 0])

  const [smileys, setSmileys] = useState<number[]>([])

  const [happies, setHappies] = useState<(ParallaxItem & Entity)[]>([])
  const [fires, setFires] = useState<(ParallaxItem & Entity)[]>([])
  const pointer = useRef({
    down: false,
    lastX: null,
    lastY: null
  })
  const handleDown = (e: any) => {
    const x = e.pageX || e.touches?.[0]?.pageX;
    const y = e.pageY || e.touches?.[0]?.pageY;
    pointer.current.lastX = x
    pointer.current.lastY = y
    setPosition([x, y])
    pointer.current.down = true
  }
  const handleMove = (e: any) => {
    
    const x = e.pageX || e.touches?.[0]?.pageX;
    const y = e.pageY || e.touches?.[0]?.pageY;
    pointer.current.lastX = x
    pointer.current.lastY = y
    if (!pointer.current.down) return
    // const id = setTimeout(() => {
    setPosition([x, y])
    setNAncestors(happies.length)
    if (frame % 7 == 0 && enableSmileWinState) {
      setSmileys(s => {
        return (s.length < nAncestors) ? [...s, (s.at(-1) || 0) - 0.01] : [...s.slice(1, s.length - 3), (s.at(-1) || 0) + 0.01]
      })
      console.log("win")
    }
    // }, 1000 / 60)


  }
  useEffect(() => {
    if (happies.length > 16 && happies.every(person => {
      const emotion = getDominantEmotion(person)
      return emotion === "joy" || emotion === "love"
    })) {
      setEnableSmileWinState(true)
    } else {
      setEnableSmileWinState(false)
    }
  }, [happies])
  const [items, setItems] = useState<(ParallaxItem & Entity)[]>([])

  const handleUp = (e: any) => {
    if (!pointer.current.down) return
    const x = position[0]
    const y = position[1]
    
      setHappies((items) => {
        const newSmiley = {
          x,
          y,
          z: 0.94+Math.random()*0.06-0.03,
          type: 'smiley' as 'smiley',
          image: {
            src: "/Smiley_face_with_rainbow_joy_alpha.png",
            alt: "🙂",
            width: 256,
            height: 256,
            fill: false,
            draggable: false,
            enabled: enableSmileWinState
          },
          age: 0,
          isDead: false,
          id: uuidv4(),
          vx: 0,
          vy: 0,
          emotions: collectRandomEmotions(),
          name: Math.random() > 0.5 ? "Hi": "Hello",
        }
        const personConfig = getPersonConfig(newSmiley)
        // get random starting name from names list
        const nNames = personConfig?.names?.length || 0
        const index = Math.floor(Math.random()*nNames)
        const name = personConfig?.names?.[index] || newSmiley.name
        
        return [...(items.length > 32 ? items.slice(1) : items), {
          ...newSmiley,
          name
        }]
      })
    pointer.current.down = false
  }
  const [w, setW] = useState(900)
  const [h, setH] = useState(900)
  const [frame, setFrame] = useState(0)
  const people = happies
  const peopleRef = useRef<
    (ParallaxItem & Entity)[]
  >([]);
  useEffect(() => {
    peopleRef.current = happies;
  }, [happies]);
  // const update = () => {
  //   for (let i = 0; i < people.length; i++) {
  //   const personA = people[i]

  //   for (let j = 0; j < people.length; j++) {
  //     if (i === j) continue

  //     const personB = people[j]

  //     const dx = personB.x - personA.x
  //     const dy = personB.y - personA.y

  //     const distance = Math.hypot(dx, dy)

  //     if (distance > 100) continue

  //     interact(personA, personB)
  //   }
  // }
  // }
  useEffect(() => {
    if (typeof window != 'undefined') {
      const resize = () => {
        setW(window.innerWidth)
        setH(window.innerHeight)
      }
      addEventListener("resize", resize, { signal: abortController.signal })
      let frameInner = 0
      const loop = () => {
        // if (frame % 3 == 0) {
          setHappies((current) =>
            updatePeople(
              current,
              window.innerWidth,
              window.innerHeight,
              frameInner,
              pointer
            ) as typeof current,
          );
        // }


        setFrame(frameInner)
        frameInner++;
        requestAnimationFrame(loop)
      }
      requestAnimationFrame(loop)
      return () => {
        abortController.abort()
        // removeEventListener("resize", resize, false)
      }
    }
  }, [])
  // const [now, setNow] = useState(0)
  // const happyEmoji = [
  //   [0, "🙃"],
  //   [3000, "🙂"],
  //   [0, "🙃"],
  //   [4500, "😊"],
  //   [0, "🙃"],
  //   [6000, "😄"],
  //   [0, "🙃"],
  //   [0, "😺"]
  // ]

  const makeSmiley = (z: number) => {
    return {
      type: "dynamic" as "dynamic",
      x: position[0],
      y: position[1],
      z,
      image: {
        src: "/Smiley_face_with_rainbow_joy_alpha.png",
        alt: "🙂",
        width: 256,
        height: 256,
        fill: false,
        draggable: false,
        enabled: enableSmileWinState
      },
      age: 0,
      isDead: false,
      id: uuidv4(),
      vx: Math.random() * 0.1 - 0.05,
      vy: Math.random() * 0.1 - 0.05,
      emotions: collectRandomEmotions(),
  name: "Hi"
    }
  }
  useEffect(() => {
    setItems(smileys.map((z, i, arr) => {
      if (typeof z == 'number') {
        return makeSmiley(z)
      }
      return z
    }))
  }, [smileys])

  return (
    <div style={{
      background: frame % 6000 < 3000 ? "white" : "black",
      width: '100vw', height: '100dvh',
      transition: "all 5s ease-out",
    }} onTouchStart={handleDown}
      onTouchMove={handleMove}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      onMouseDown={handleDown}
      onTouchEnd={handleUp}
    >

      <Parallax
        frame={frame}
        dimensions={[w, h]}
        items={[...items, ...happies]}
        setItems={setItems} />
      {/* <button className="z-99 w-[48px] h-[48px] cursor-pointer text-yellow-500 fixed left-1/2 top-1/2 text-4xl" onClick={() => {
        setNow(now => (now + 3000) % (3000 * happyEmoji.length))
      }}>{happyEmoji[Math.floor(now / 3000 % (3000 * happyEmoji.length))]?.[1] || "😁" as string}</button> */}
    </div>)
}
