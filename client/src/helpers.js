export const calculateOffset = (fraction, fractionNumber) => {
  return Math.max(0, (fractionNumber - 1) * fraction)
}
