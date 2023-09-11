cacheArray = [0, 1]
a, b = 0, 1
c = 0
file2 = open('./2.txt', mode='w+')
while c < 800:
    c += 1
    a, b = b, a + b
    cacheArray.append(b)
    file2.write(str(b))
    file2.write('\n')

print(cacheArray)
file2.close()

'''
num = 0
arr = [1, 2, 3]
for i in arr:
    for j in arr:
        for k in arr:
            if i != j and i != k and j != k:
                print(i, j, k)
                num += 1
print(num)
'''
