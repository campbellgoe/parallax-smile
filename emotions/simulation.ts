import { EMOTION_CONFIG, EmotionName, Entity } from "../components/Entities";

export const EMOTIONS: EmotionName[] = [
  "joy",
  "sadness",
  "fear",
  "anger",
  "love",
  "fire",
  "plant"
];
// export function getDominantEmotion(
//   person: Person,
// ): EmotionName {
//   return (
//     Object.entries(person.emotions)
//       .sort(
//         (a, b) => b[1] - a[1],
//       )[0][0] as EmotionName
//   );
// }
export function getDominantEmotion(
  person: Entity,
): EmotionName {
  return EMOTIONS.reduce((highest, emotion) =>
    person.emotions[emotion] >
    person.emotions[highest]
      ? emotion
      : highest,
  );
}

export function distance(
  a: Entity,
  b: Entity,
) {
  return Math.hypot(
    b.x - a.x,
    b.y - a.y,
  );
}

export function getPersonConfig(
  person: Entity,
): { emoji: string; color: string; names?: string[] } {
  return EMOTION_CONFIG[
    getDominantEmotion(person)
  ];
}