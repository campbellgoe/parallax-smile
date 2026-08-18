import { Entity } from "@/components/Entities";
import { getDominantEmotion } from "./simulation";
export function updateMovement(
  person: Entity,
  frame: number
) {
  const dominant =
    getDominantEmotion(person);

  switch (dominant) {
    case "joy":
      person.vx +=
        (Math.random() - 0.5) * 0.1;

      person.vy +=
        (Math.random() - 0.5) * 0.1;
      break;

    case "sadness":
      person.vx *= 0.95;
      person.vy *= 0.95;
      if(person.age%Math.floor(Math.random()*500) === 0){
person.name = Math.random() > 0.78 ? "" : ":'("
      }
      break;

    case "fear":
      person.vx +=
        (Math.random() - 0.5) * 0.25;

      person.vy +=
        (Math.random() - 0.5) * 0.25;
        if(person.age%Math.floor(Math.random()*500) === 0){
person.name = Math.random() > 0.5 ? "uh oh" : ":("
        }
      
      break;

    case "anger":
      person.vx *= 1.02;
      person.vy *= 1.02;
      if(person.age%295 === 0){
        person.name = Math.random() > 0.5 ? "Grrr" : "Argh!"
      }
      break;

    case "love":
      person.vx *= 0.99;
      person.vy *= 0.99;
      if(person.age%650 === 0){
        person.name = Math.random()>0.28 ? "Hi" : Math.random()> 0.72 ? "" : "Hello"
      }
      break;

  case "fire":
    person.vx *= 0.997
    person.vy *= 0.997;
    person.vx +=
    (Math.random() - 0.5) * 0.025;
        person.vy +=
        (Math.random() - 0.5) * 0.025;
        // starting from 0 (first frame) and at every 300 frames, choose a random text for the fire emoji
    if(person.age%300 === 0){
      person.name = Math.random() > 0.5 ? "Ahhh" : "Oh no!"
    }
    break;
  }
  person.age ++
}