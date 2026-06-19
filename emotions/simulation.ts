import { EMOTION_CONFIG, EmotionName, Person } from "../components/Entities";

export const EMOTIONS: EmotionName[] = [
  "joy",
  "sadness",
  "fear",
  "anger",
  "love",
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
  person: Person,
): EmotionName {
  return EMOTIONS.reduce((highest, emotion) =>
    person.emotions[emotion] >
    person.emotions[highest]
      ? emotion
      : highest,
  );
}

export function distance(
  a: Person,
  b: Person,
) {
  return Math.hypot(
    b.x - a.x,
    b.y - a.y,
  );
}

export function getEmoji(
  person: Person,
) {
  return EMOTION_CONFIG[
    getDominantEmotion(person)
  ].emoji;
}