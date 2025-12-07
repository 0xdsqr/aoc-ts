function findMaxJoltage(bank: string): number {
  let maxJolts = 0
  let maxPair = ""

  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const digit1 = bank[i]
      const digit2 = bank[j]
      if (digit1 && digit2) {
        const jolts = parseInt(digit1) * 10 + parseInt(digit2)
        if (jolts > maxJolts) {
          maxJolts = jolts
          maxPair = `(${i},${j}): ${digit1}${digit2}`
        }
      }
    }
  }

  console.log(`${bank} -> ${maxJolts} ${maxPair}`)
  return maxJolts
}

// Test with examples
const examples = [
  "987654321111111", // Expected: 98
  "811111111111119", // Expected: 89
  "234234234234278", // Expected: 78
  "818181911112111", // Expected: 92
]

console.log("Testing examples:")
let total = 0
examples.forEach(bank => {
  const result = findMaxJoltage(bank)
  total += result
})

console.log(`\nTotal: ${total}`)
console.log(`Expected: 357`)
console.log(`Match: ${total === 357 ? "✓" : "✗"}`)
