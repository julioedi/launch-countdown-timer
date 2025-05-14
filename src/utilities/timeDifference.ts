type TimeDifference = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Returns an ISO string of the date 9 days from now.
 */
function getDateInNineDays(): string {
  const now = new Date();
  const nineDaysLater = new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000);
  return nineDaysLater.toISOString();
}

/**
 * Returns the time difference between now and the provided target datetime.
 * If the input is invalid or not provided, it defaults to 9 days in the future.
 */
function timeUntil(targetDateTime?: string): TimeDifference {
  const now = new Date();

  let targetDate: Date;

  if (!targetDateTime) {
    targetDate = new Date(getDateInNineDays());
  } else {
    targetDate = new Date(targetDateTime);
    if (isNaN(targetDate.getTime())) {
      // If date is invalid, fallback to 9 days in the future
      targetDate = new Date(getDateInNineDays());
    }
  }

  let diffMs = targetDate.getTime() - now.getTime();

  if (diffMs < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const seconds = Math.floor(diffMs / 1000) % 60;
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export {timeUntil,getDateInNineDays};
