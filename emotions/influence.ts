
export const influenceMatrix = {
  joy: {
    joy: 0.0002,
    sadness: -0.0002,
    fear: -0.0001,
    anger: -0.0001,
    love: 0.0001,
  },

  sadness: {
    joy: -0.0001,
    sadness: 0.0002,
    fear: 0.0001,
    anger: 0,
    love: 0.0001,
  },

  fear: {
    joy: -0.0002,
    sadness: 0.0001,
    fear: 0.0003,
    anger: 0.0001,
    love: -0.0001,
  },

  anger: {
    joy: -0.0002,
    sadness: 0.0001,
    fear: 0.0002,
    anger: 0.0003,
    love: -0.0002,
  },

  love: {
    joy: 0.0002,
    sadness: -0.0002,
    fear: -0.0002,
    anger: -0.0002,
    love: 0.0003,
  },
} as const;