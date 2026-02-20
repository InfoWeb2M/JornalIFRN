export const isVideo = (url: string) => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
};