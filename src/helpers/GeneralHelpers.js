const positionImageRouteObject = {
  MOVED_DOWN: "/images/position_moved_down.svg",
  STAGNANT: "/images/position_stagnant.svg",
  MOVED_UP: "/images/position_moved_up.svg",
  NEW_ELEMENT: "/images/position_new.svg",
};

const timeRangeObject = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
};

export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const capitalizeFirstLetters = (input) => {
  return input
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
};

export const calculateStateOfPosition = (
  items,
  previousPositions,
  timeRange,
  isGenres = false
) => {
  if (timeRange === timeRangeObject.SHORT_TERM) {
    previousPositions = previousPositions.lastFourWeeks;
  } else if (timeRange === timeRangeObject.MEDIUM_TERM) {
    previousPositions = previousPositions.lastSixMonths;
  } else {
    previousPositions = previousPositions.allTime;
  }

  if(isGenres) {
    previousPositions = previousPositions.map(genre => genre.genre);
  }

  const result = items.map((item) => {
    const itemIndex = isGenres
      ? items.findIndex((i) => i.genre === item.genre)
      : items.findIndex((i) => i.id === item.id);
    const previousIndex = isGenres
      ? previousPositions.indexOf(item.genre)
      : previousPositions.indexOf(item.id);
      
    if (previousIndex !== -1) {
      if (previousIndex > itemIndex) {
        return {
          ...item,
          positionImageRoute: positionImageRouteObject.MOVED_UP,
        };
      } else if (previousIndex === itemIndex) {
        return {
          ...item,
          positionImageRoute: positionImageRouteObject.STAGNANT,
        };
      } else {
        return {
          ...item,
          positionImageRoute: positionImageRouteObject.MOVED_DOWN,
        };
      }
    } else {
      return {
        ...item,
        positionImageRoute: positionImageRouteObject.NEW_ELEMENT,
      };
    }
  });

  return result;
};

export const getCurrentDateFormatted = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
}
