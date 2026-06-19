
export const influenceMatrix = {
  joy: {
    joy: 0.002,
    sadness: -0.002,
    fear: -0.001,
    anger: -0.001,
    love: 0.001,
  },

  sadness: {
    joy: -0.001,
    sadness: 0.002,
    fear: 0.001,
    anger: 0,
    love: 0.001,
  },

  fear: {
    joy: -0.002,
    sadness: 0.001,
    fear: 0.003,
    anger: 0.001,
    love: -0.001,
  },

  anger: {
    joy: -0.002,
    sadness: 0.001,
    fear: 0.002,
    anger: 0.003,
    love: -0.002,
  },

  love: {
    joy: 0.002,
    sadness: -0.002,
    fear: -0.002,
    anger: -0.002,
    love: 0.003,
  },
} as const;