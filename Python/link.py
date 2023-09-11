#! python3
# coding: utf-8
import requests


def indexFlowMerge(data):
    print(1, data)


xhr = requests.get("https://local.mil.eastday.com/ns/json/index/index-flow-merge.json?callback=indexFlowMerge&_=1656573411563", verify=False)

eval(xhr.text)
