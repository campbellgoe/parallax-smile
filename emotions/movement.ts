import { Person } from "@/components/Entities";
import { getDominantEmotion } from "./simulation";

export function updateMovement(
  person: Person,
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
      break;

    case "fear":
      person.vx +=
        (Math.random() - 0.5) * 0.25;

      person.vy +=
        (Math.random() - 0.5) * 0.25;
      break;

    case "anger":
      person.vx *= 1.02;
      person.vy *= 1.02;
      break;

    case "love":
      person.vx *= 0.99;
      person.vy *= 0.99;
      break;
  }
}