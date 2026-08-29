export type EmotionName =
  | "joy"
  | "sadness"
  | "fear"
  | "anger"
  | "love"
  | "fire"
  | "plant";

export const EMOTION_CONFIG = {
  joy: {
    emoji: "😊",
    color: "#FFD54F",
  },

  sadness: {
    emoji: "😢",
    color: "#64B5F6",
  },

  fear: {
    emoji: "😨",
    color: "#B39DDB",
  },

  anger: {
    emoji: "😡",
    color: "#EF5350",
  },

  love: {
    emoji: "🥰",
    color: "#EC407A",
  },
  fire: {
    emoji: "🔥",
    color: "orange",
    names: ["Ahhhh!", "Oh noes!"],
  },
  plant: {
    emoji: "🌱",
    color: "green",
  }
} satisfies Record<
  EmotionName,
  {
    emoji: string;
    color: string;
    names?: string[]
  }
>;

export type EmotionLevels = Record<
  EmotionName,
  number
>;

export type Entity = {
  id: string;
  type: 'smiley' | 'dynamic' | 'fire' | 'plant'
  x: number;
  y: number;

  vx: number;
  vy: number;

  emotions: EmotionLevels;
  isDead?: boolean;
  intensity?: number;
  name: string;
  age: number;
};