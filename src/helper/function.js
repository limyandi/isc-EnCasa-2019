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
