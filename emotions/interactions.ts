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

  if (distBetween > 50) {
    const directionX = dx / distBetween;
    const directionY = dy / distBetween;
    if (distBetween < 100) {
      if (dominant === 'fear') {
        if (targetDominant === 'anger') {
          source.x += directionX * 0.25;
          source.y += directionY * 0.25;
        } else if (targetDominant === 'fire') {
          source.x += directionX;
          source.y += directionY;
        } else {
          source.x -= directionX * 0.01;
          source.y -= directionY * 0.01;
        }
      }
      if (dominant === 'anger') {
        if (targetDominant === 'fear') {
          source.x -= directionX * 0.25;
          source.y -= directionY * 0.25;
        } else {
          // source.x -= directionX * 0.01;
          // source.y -= directionY * 0.01;
        }
      }
      if (distBetween > 75){
        if((dominant === 'joy' || dominant === 'love') && (targetDominant === 'joy' || targetDominant === 'love')) {
          source.x -= directionX * 0.03;
          source.y -= directionY * 0.03;
        }
      }
    }
    if (distBetween < 125) {
      if (dominant != 'fire' && targetDominant === 'fire') {
        source.x += directionX * 2;
        source.y += directionY * 2;
      }
    }
  }

}