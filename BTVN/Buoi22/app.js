function sum(...numbers) {
     console.log(numbers);
     let total = 0;
     for (let i = 0; i < numbers.length; i++) {
          if (
               typeof numbers[i] === "number" &&
               !Number.isNaN(numbers[i]) &&
               numbers[i] !== Infinity
          ) {
               total += numbers[i];
          }
     }
     return total;
}

console.log(sum(1000, 2000, "abc", 4000.75, NaN, Infinity, [1, 2, 3, 4, 5]));
