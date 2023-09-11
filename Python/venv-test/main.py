#! python3
# coding: utf-8
import requests

from bs4 import BeautifulSoup

# mulu = ['https://www.3qdu.com/xiaoshuo/423378_' + str(i) + '/' for i in range(1, 10)]
# neirong1 = "目录：\n"
#
#
# def fn1(url):
#     xhr = requests.get(url, {"verify": False})
#
#     xhr.encoding = "gbk"
#
#     soup = BeautifulSoup(xhr.text, 'html.parser')
#
#     for link in soup.select('li.chapter > a'):
#         fn2(url="https://www.3qdu.com" + link.get('href'), title=link.get_text())
#
#
# def fn2(url, title):
#     print(title, url)
#     global neirong1
#
#     neirong1 = title + '\n'
#
#     xhr = requests.get(url, {"verify": False})
#
#     xhr.encoding = "gbk"
#
#     soup = BeautifulSoup(xhr.text, 'html.parser')
#
#     txt = open('./1.txt', mode="a+", encoding="utf-8")
#     txt.write(title + '\n' + soup.select('#articlecontent')[0].get_text() + '\n')
#     txt.close()
#
#
# for i in range(len(mulu)):
#     print("目录地址", mulu[i])
#     fn1(mulu[i])
#
# txt = open('./1.txt', mode="r+", encoding="utf-8")
# txt.write(neirong1)
# txt.close()
# print('写入完成')



















