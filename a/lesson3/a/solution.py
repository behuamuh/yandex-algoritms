n = int(input())
variants = set(map(str, range(1, n + 1)))
answers = []

while True:
  param = input()

  if param == 'HELP':
    break

  nums = set(param.split(' '))

  if len(nums) < len(variants) / 2:
    answers.append('NO')
    variants = variants.difference(nums)
  else :
    yes = variants.intersection(nums)
    no = variants.difference(nums)
    
    if len(yes) > len(no):
      answers.append('YES')
      variants = yes

    else :
      answers.append('NO')
      variants = no

for a in answers:
  print(a)
  
print(' '.join(sorted(variants, key=int)))
