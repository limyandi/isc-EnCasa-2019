export function removeDuplicates(arr, value) {
  const counts = arr.reduce((counts, item) => {
    counts[item.ID] = (counts[item.ID] || 0) + 1;
    return counts;
  }, {});
  return Object.keys(counts).reduce(function(arr, item) {
    if (counts[item] === 1) {
      arr.push(
        ...value.filter(val => {
          return val.ID == item;
        })
      );
    }
    return arr;
  }, []);
}

export const basicDriverDetails = {
  Monday: {
    from: '08:30:00Z',
    to: '20:00:00Z'
  },
  Tuesday: {
    from: '08:30:00Z',
    to: '20:00:00Z'
  },
  Wednesday: {
    from: '08:30:00Z',
    to: '20:00:00Z'
  },
  Thursday: {
    from: '08:30:00Z',
    to: '20:00:00Z'
  },
  Friday: {
    from: '08:30:00Z',
    to: '20:00:00Z'
  },
  Saturday: {
    from: '08:30:00Z',
    to: '20:00:00Z'
  },
  Sunday: {
    from: '08:30:00Z',
    to: '20:00:00Z'
  }
};

export const convertTimeToDate = (date, time) => {
  time += ':00';
  const dateObj = new Date(`${date} ${time}`);
  return dateObj;
};
