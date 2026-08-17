export type EmotionName =
  | "joy"
  | "sadness"
  | "fear"
  | "anger"
  | "love"
  | "fire";

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
    emoji: "vYv",
    color: "orange"
  }
} satisfies Record<
  EmotionName,
  {
    emoji: string;
    color: string;
  }
>;

export type EmotionLevels = Record<
  EmotionName,
  number
>;

export type Entity = {
  id: string;
  type: 'smiley' | 'dynamic' | 'fire'
  x: number;
  y: number;

  vx: number;
  vy: number;

  emotions: EmotionLevels;
  isDead?: boolean;
  intensity?: number;
  name: string;
};