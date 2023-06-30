export const formatTime = (payloadSeconds) => {
  const minutes = Math.floor(payloadSeconds / 60);
  const seconds = Math.floor(payloadSeconds % 60);

  let minutesFormatted;
  let secondsFormatted;

  if (minutes < 10) minutesFormatted = `0${minutes}`;
  else minutesFormatted = minutes;

  if (seconds < 10) secondsFormatted = `0${seconds}`;
  else secondsFormatted = seconds;

  return `${minutesFormatted}:${secondsFormatted}`;
};

export const addClass = (element, className) => {
  if (!element.classList.contains(className)) element.classList.add(className);
};

export const removeClass = (element, className) => {
  if (element.classList.contains(className)) element.classList.remove(className);
};

export const getPercent = (partialValue, totalValue) => partialValue / totalValue * 100;
