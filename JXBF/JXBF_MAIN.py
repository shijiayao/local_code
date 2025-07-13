import os
import sys
import time
import pyautogui

startTime = time.time()

def log(txt):
	log_file = open('D:/Run_log/' + time.strftime("%Y", time.localtime()) + '/' + time.strftime("%Y-%m-%d", time.localtime()) + '.python.log', mode='a+', encoding="utf8")
	log_file.write(f'{time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())} {txt}\n')
	log_file.close()

def auto_click_image():
	# 设置图片路径
	image_path = 'jxbf.png'

	if not os.path.isfile(image_path):
		log(f'图片路径未找到：{image_path}')
		return None
	else:
		log(f'图片路径已经找到：{image_path}')

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

	log("已执行完毕，退出。")

def main():
	auto_click_image()

if __name__ == "__main__":
	main()