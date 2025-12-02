import { first, readAocInput } from "@dsqr/aoc-utils";

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function invalidID(num: number): number | null {
  const s = String(num);

  if (s.length % 2 !== 0) return null;

  const mid = s.length / 2;
  const left = s.slice(0, mid);
  const right = s.slice(mid);

  return left === right ? num : null;
}

export async function solutionOne(): Promise<number> {
  const singleLine = (await first(readAocInput(2))).trim();

  let total = 0;
  const ranges = singleLine.split(",");

  ranges.forEach((block) => {
    const cleaned = block.trim();
    if (!cleaned) return;

    const [startStr, endStr] = cleaned.split("-");
    const start = Number(startStr);
    const end = Number(endStr);

    range(start, end).forEach((n) => {
      const bad = invalidID(n);
      if (bad !== null) {
        total += bad;
      }
    });
  });

  return total;
}
