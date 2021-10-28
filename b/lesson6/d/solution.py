a, k, b, m, x = map(int, input().split())
L = 0
R = x // (a + b)

while L < R:
  M = (R - L) // 2 + L
  if (M - M // k) * a + (M - M // m) * b >= x:
    R = M
  else:
    L = M + 1

print(L)
