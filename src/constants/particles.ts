export const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: (i * 7 + 13) % 8 + 4,
  left: (i * 13 + 7) % 100,
  delay: (i * 3) % 5,
  duration: (i * 11) % 10 + 15,
}));