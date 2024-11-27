import pyautogui
import os
import time
import win32gui
import win32con
import portalocker

startTime = time.time()

def log(txt):
	log_file = open('D:/Run_log/' + time.strftime("%Y-%m-%d", time.localtime()) + '.python.log', mode='a+', encoding="utf8")
	log_file.write(f'{time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())} {txt}\n')
	log_file.close()

def JudgmentCondition_Time():
	current = time.time()
	return startTime + 24 * 60 * 60 >= current

def showWindow():
	hwnd = win32gui.FindWindow(None, "海康互联")
	if hwnd:
		win32gui.ShowWindow(hwnd, win32con.SW_SHOWNORMAL)
		win32gui.SetForegroundWindow(hwnd)
		log("激活并前置窗口")
	else:
		log("未找到目标窗口")

def auto_click_image():
	# 设置图片路径
	image_path = 'jxbf.png'
	
	if not os.path.isfile(image_path):
		log(f'图片路径未找到：{image_path}')
		return None
	else:
		log(f'图片路径已经找到：{image_path}')
	
	while (JudgmentCondition_Time()):
		
		try:
			location = pyautogui.locateOnScreen(image_path)
		except:
			log(f'屏幕上未找到目标图片')
		else:
			x, y = pyautogui.center(location)
			pyautogui.click(x, y)
			log(f'图片点击完成。')
			time.sleep(3)
			pyautogui.moveTo(100, 700)

		time.sleep(30)
	
	log("已执行完毕，退出。")

def main():
	# 尝试获取文件锁
	try:
		with open("C:/Develop/JXBF/Python.Process.lock", 'w') as lock_file:
			portalocker.lock(lock_file, portalocker.LOCK_EX | portalocker.LOCK_NB)
			
			log("已获取文件锁")
			showWindow()	
			auto_click_image()
			
	except:
		log("已有实例在运行。")
		os._exit(0)


main()