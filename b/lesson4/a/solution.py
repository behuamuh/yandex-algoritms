n = int(input())
map = {}

for i in range(n):
  arr = input().split(' ')
  d = int(arr[0])
  a = int(arr[1])
  if d not in map:
    map[d] = 0
  
  map[d] += a

keys = list(map.keys())
keys.sort()

for k in keys:
  print(k, map[k])
