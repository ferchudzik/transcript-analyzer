const formatTime = (timeFrom: number): string => {
  let time = '';

  if (timeFrom < 60) {
    time = `00:${timeFrom}`;
  } else {
    const minutes =
      Math.floor(timeFrom / 60) < 10
        ? `0${Math.floor(timeFrom / 60)}`
        : Math.floor(timeFrom / 60);
    const seconds = timeFrom % 60 < 10 ? `0${timeFrom % 60}` : timeFrom % 60;

    time = `${minutes}:${seconds}`;
  }

  return time;
};

export default formatTime;
