import os
import shutil

tempPath = os.getcwd()
print(tempPath)


def subFileList(item):
    subTempFileList = os.listdir(tempPath  + '\\' +  item)
    for subItem in subTempFileList:
        if subItem == '.idea':
            print('.idea')
            shutil.rmtree(tempPath  + '\\' +  item + '\\' + subItem)
    else:
        print('6666' + item)


tempFileList = os.listdir(tempPath)

print(tempFileList)

for item in tempFileList:
    print(tempPath + '\\' + item)
    if os.path.isdir(tempPath + '\\' +  item):
        subFileList(item)
else:
    print('for 循环结束了')
