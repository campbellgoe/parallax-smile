import { Entity } from "@/components/Entities";
import { EMOTIONS, getDominantEmotion } from "./simulation";
import { influenceMatrix } from "./influence";

export function interact(
  source: Entity,
  target: Entity,
) {
  const dominant =
    getDominantEmotion(source);
  
  const influences =
    influenceMatrix[dominant];

  for (const emotion of EMOTIONS) {
    target.emotions[emotion] +=
      influences[emotion];

    target.emotions[emotion] =
      Math.max(
        0,
        Math.min(
          1,
          target.emotions[emotion],
        ),
      );
  }
  const targetDominant = getDominantEmotion(target)
  const px = target.x;
const py = target.y;

const dx = source.x - px;
const dy = source.y - py;

const distBetween = Math.hypot(dx, dy);

if (distBetween < 500 && distBetween >10) {
  const directionX = dx / distBetween;
  const directionY = dy / distBetween;
  if(distBetween < 300 && dominant === 'fear') {
    if(targetDominant === 'anger' || targetDominant === 'fire'){
      source.x += directionX * 0.25;
      source.y += directionY * 0.25;
    } else {
      source.x -= directionX * 0.01;
      source.y -= directionY * 0.01;
    }
  }
   if(distBetween < 500 && dominant === 'anger') {
    if(targetDominant === 'fear'){
      source.x -= directionX * 0.25;
      source.y -= directionY * 0.25;
    } else {
      // source.x -= directionX * 0.01;
      // source.y -= directionY * 0.01;
    }
  }
}
  
}