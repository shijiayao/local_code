import sys
import threading
import time

import pyautogui
from pynput import keyboard

screenWidth, screenHeight = pyautogui.size()
position_X, position_Y = pyautogui.position()

print("屏幕尺寸", screenWidth, screenHeight)
print("鼠标位置", position_X, position_Y)

exit_flag = 0


def position_click(x, y):
    global exit_flag

    num = 500

    while num >= 0:
        if exit_flag == 1:
            sys.exit(0)

        time.sleep(1)

        pyautogui.moveTo(x, y)
        pyautogui.click(x=x, y=y)

        num -= 1

    pyautogui.hotkey('ctrl', 'c')


def hotkey_exit():
    def on_activate():
        global exit_flag
        exit_flag = 1

        print('全局热键已激活！')

        sys.exit(0)

    def for_canonical(f):
        return lambda k: f(l.canonical(k))

    hotkey = keyboard.HotKey(keyboard.HotKey.parse('<ctrl>+c'), on_activate)
    with keyboard.Listener(on_press=for_canonical(hotkey.press), on_release=for_canonical(hotkey.release)) as l:
        l.join()


class MyThread(threading.Thread):
    def __init__(self, thread_id, name):
        threading.Thread.__init__(self)
        self.threadID = thread_id
        self.name = name

    def run(self):
        print("开始线程：" + self.name)
        if self.threadID == 1:
            position_click(position_X, position_Y)
        else:
            hotkey_exit()
        print("退出线程：" + self.name)


# 创建新线程
thread1 = MyThread(1, "click")
thread2 = MyThread(2, "hotkey")

# 开启新线程
thread1.start()
thread2.start()
thread1.join()
thread2.join()

print("退出主线程")
