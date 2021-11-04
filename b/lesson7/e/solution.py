import math
import pathlib

f = open(pathlib.PurePath(pathlib.Path(__file__).parent.resolve(), 'input.txt'), "r")
n = int(f.readline())

r1max = 0
r2min = 10000000
fs = []

def compare(p):
  return p[0]

for i in range(n):
  r1, r2, f1, f2 = map(float, f.readline().split())
  r1max = max(r1max, r1)
  r2min = min(r2min, r2)

  fs.append([f1, True, i])
  fs.append([f2, False, i])

fs.sort(key=compare)
opens = set()
lastOpen = 0

for i in range(2 * n):
  f, open, index = fs[i]
  if open:
    opens.add(index)

    if len(opens) == n:
      lastOpen = f
  else:
    if index in opens:
      opens.remove(index)

fres = 0

for i in range(2 * n):
  f, open, index = fs[i]
  if open:
    opens.add(index)

    if len(opens) == n:
      lastOpen = f
  else:
    if len(opens) == n:
      fres = fres + (2 * math.pi + f - lastOpen) % (2 * math.pi)

    if index in opens:
      opens.remove(index)

result = fres / 2 * (r2min ** 2 - r1max ** 2)

print(result)
