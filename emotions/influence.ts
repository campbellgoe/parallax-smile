
export const influenceMatrix = {
  joy: {
    joy: 0.0002,
    sadness: -0.0002,
    fear: -0.0001,
    anger: -0.0001,
    love: 0.0001,
    fire: 0
  },

  sadness: {
    joy: -0.0001,
    sadness: 0.0002,
    fear: 0.0001,
    anger: 0,
    love: 0.0001,
    fire: 0
  },

  fear: {
    joy: -0.0002,
    sadness: 0.0001,
    fear: 0.0003,
    anger: 0.0001,
    love: -0.0001,
    fire: 0
  },

  anger: {
    joy: -0.0002,
    sadness: 0.0001,
    fear: 0.0002,
    anger: 0.0003,
    love: -0.0002,
    fire: 0
  },

  love: {
    joy: 0.0002,
    sadness: -0.0002,
    fear: -0.0002,
    anger: -0.0002,
    love: 0.0003,
    fire: 0,
  },
  fire: {
    joy: 0,
    sadness: 0,
    fear: 0,
    anger: 0,
    love: 0,
    fire: 0.01
  }
} as const;