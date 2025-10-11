import os
import sys
import time
import pyautogui

startTime = time.time()

def log(txt):
	log_file = open('C:/Run_log/' + time.strftime("%Y", time.localtime()) + '/' + time.strftime("%Y-%m-%d", time.localtime()) + '.python.log', mode='a+', encoding="utf8")
	log_file.write(f'{time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())} {txt}\n')
	log_file.close()

def auto_click_image():
	# 图片路径
	image_paths = ['jxbf.png', 'sx.png']
	
	query_image_path = False
	
	for _ in range(10):
		for image_path in image_paths:
			if not os.path.isfile(image_path):
				log(f'图片路径未找到：{image_path}')
			else:
				log(f'图片路径已经找到：{image_path}')
				
				try:
					location = pyautogui.locateOnScreen(image_path)
				except:
					log(f'屏幕上未找到目标图片')
				else:
					query_image_path = True # 查找到以后才继续循环
					
					x, y = pyautogui.center(location)
					pyautogui.click(x, y)
					log(f'图片点击完成。')
					time.sleep(2)
					pyautogui.moveTo(100, 700)
			
		if not query_image_path:
			break

	log("已执行完毕，退出。")
	
	return None

def main():
	auto_click_image()

if __name__ == "__main__":
	main()