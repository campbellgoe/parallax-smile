import { Person } from "@/components/Entities";
import { EMOTIONS, getDominantEmotion } from "./simulation";
import { influenceMatrix } from "./influence";

export function interact(
  source: Person,
  target: Person,
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
}