function quickSort(arr, start = 0, end = arr.length - 1) {
  const originStart = start, originEnd = end;
  while(start < end) {
    if (arr[start] >= arr[start + 1]) {
      [arr[start], [arr[start + 1]]] = [arr[start + 1], [arr[start]]];
      start++;
    } else {
      [arr[end], [arr[start + 1]]] = [arr[start + 1], [arr[end]]];
      end--;
    }
  }
  originStart<start-1 && quickSort(arr, originStart, start-1);
  start+1 < originEnd && quickSort(arr, start+1, originEnd);
}

const arr = [2,5,6,3,1,8,3]
quickSort(arr)
console.log(arr)