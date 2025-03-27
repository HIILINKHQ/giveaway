export function formatCompactNumber(input: number): string {
    if (input >= 1_000_000_000) {
      // Format for billions
      return `${(input / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
    } else if (input >= 1_000_000) {
      // Format for millions
      return `${(input / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    } else if (input >= 1_000) {
      // Format for thousands
      return `${(input / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
    } else {
      // Numbers below 1000
      return input.toFixed(1).toString();
    }
  }
  
//   // Examples
//   console.log(formatCompactNumber(999));          // Output: "999"
//   console.log(formatCompactNumber(9999));         // Output: "10K"
//   console.log(formatCompactNumber(999999));       // Output: "1M"
//   console.log(formatCompactNumber(999999999));    // Output: "1B"
//   console.log(formatCompactNumber(9_987_654));    // Output: "9.9M"
  