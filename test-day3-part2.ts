const findMaxJoltage12 = (bank: string): bigint => {
  const n = bank.length
  const keep = 12
  const skip = n - keep

  let result = ""
  let pos = 0
  let skipped = 0

  for (let i = 0; i < keep; i++) {
    const remaining = keep - i
    const canSkipMore = skip - skipped
    const searchEnd = Math.min(pos + canSkipMore, n - remaining)

    let maxDigit = bank[pos]
    let maxPos = pos

    for (let j = pos; j <= searchEnd; j++) {
      if (bank[j] > maxDigit) {
        maxDigit = bank[j]
        maxPos = j
      }
    }

    result += maxDigit
    skipped += maxPos - pos
    pos = maxPos + 1
  }

  console.log(`${bank} -> ${result}`)
  return BigInt(result)
}

// Test with examples
const examples = [
  "987654321111111", // Expected: 987654321111
  "811111111111119", // Expected: 811111111119
  "234234234234278", // Expected: 434234234278
  "818181911112111", // Expected: 888911112111
]

console.log("Testing Part 2 examples:")
let total = 0n
examples.forEach(bank => {
  const result = findMaxJoltage12(bank)
  total += result
})

console.log(`\nTotal: ${total}`)
console.log(`Expected: 3121910778619`)
console.log(`Match: ${total === 3121910778619n ? "✓" : "✗"}`)
