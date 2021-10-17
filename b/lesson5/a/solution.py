with open('input.txt') as f:
  n,q = map(int, f.readline().split())

  arr = list(map(int, f.readline().split()))
  prefix = [0]

  for i in range(n):
    prefix += [prefix[-1] + arr[i]]

  for _ in range(q):
    L,R = map(int, f.readline().split())
    print(prefix[R] - prefix[L-1])
