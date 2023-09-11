import sys
import threading
import time

import pyautogui
from pynput import keyboard


exitFlag = 0

screenWidth, screenHeight = pyautogui.size()

print(screenWidth, screenHeight)

print(pyautogui.position())


def _h_t():
    global exitFlag

    def _h_k(x, y, distance=200):
        pyautogui.moveTo(x, y)

        time.sleep(0.1)

        while distance > 0:
            if exitFlag == 1:
                sys.exit(0)
            pyautogui.drag(distance, 0, duration=0.1)  # move right
            distance -= 5
            pyautogui.drag(0, distance, duration=0.1)  # move down
            pyautogui.drag(-distance, 0, duration=0.1)  # move left
            distance -= 5
            pyautogui.drag(0, -distance, duration=0.1)  # move up

    _h_k(x=200, y=200)
    _h_k(x=200, y=400)
    _h_k(x=200, y=600)
    _h_k(x=200, y=800)
    _h_k(x=400, y=200)
    _h_k(x=400, y=400)
    _h_k(x=400, y=600)
    _h_k(x=400, y=800)
    _h_k(x=600, y=200)
    _h_k(x=600, y=400)
    _h_k(x=600, y=600)
    _h_k(x=600, y=800)
    _h_k(x=800, y=200)
    _h_k(x=800, y=400)
    _h_k(x=800, y=600)
    _h_k(x=800, y=800)

    pyautogui.hotkey('ctrl', 'c')


def _t_c():
    def on_activate():
        print('全局热键已激活！')
        global exitFlag
        exitFlag = 1
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
            _h_t()
        else:
            _t_c()
        print("退出线程：" + self.name)


# 创建新线程
thread1 = MyThread(1, "Thread-1")
thread2 = MyThread(2, "Thread-2")

# 开启新线程
thread1.start()
thread2.start()
thread1.join()
thread2.join()

print("退出主线程")
