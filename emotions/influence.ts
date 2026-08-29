
export const influenceMatrix = {
  joy: {
    joy: 0.0002,
    sadness: -0.0002,
    fear: -0.0001,
    anger: -0.0001,
    love: 0.0001,
    fire: 0,
    plant: 0,
  },

  sadness: {
    joy: -0.0001,
    sadness: 0.0002,
    fear: 0.0001,
    anger: 0,
    love: 0.0001,
    fire: 0,
    plant: 0,
  },

  fear: {
    joy: -0.0002,
    sadness: 0.0001,
    fear: 0.0003,
    anger: 0.0001,
    love: -0.0001,
    fire: 0,
    plant: 0,
  },

  anger: {
    joy: -0.0002,
    sadness: 0.0001,
    fear: 0.0002,
    anger: 0.0003,
    love: -0.0002,
    fire: 0,
    plant: 0,
  },

  love: {
    joy: 0.0002,
    sadness: -0.0002,
    fear: -0.0002,
    anger: -0.0002,
    love: 0.0003,
    fire: 0,
    plant: 0,
  },
  fire: {
    joy: 0,
    sadness: 0,
    fear: 0,
    anger: 0,
    love: 0,
    fire: 0.01,
    plant: 0,
  },
  plant: {
    joy: 0.0001,
    sadness:-0.0003,
    fear: 0,
    anger: -0.0002,
    love: 0,
    fire: 0.0001,
    plant: 0.00015,
  }
} as const;