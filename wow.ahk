; 注意 .ahk 文件的编码，如果与安装的 autohotkey 编码不一致，运行时会导致报错。

; Alt + ` 1 2 3
WinGet, wowid, List, 魔兽世界
!`::
IfWinActive, 魔兽世界
	ControlSend,, {Alt Down}``, ahk_id %wowid1%
	ControlSend,, {Alt Down}``, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
!1::
IfWinActive, 魔兽世界
	ControlSend,, {Alt Down}1, ahk_id %wowid1%
	ControlSend,, {Alt Down}1, ahk_id %wowid2%
	Return
	
WinGet, wowid, List, 魔兽世界
!2::
IfWinActive, 魔兽世界
	ControlSend,, {Alt Down}2, ahk_id %wowid1%
	ControlSend,, }{Alt Down}2, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
!3::
IfWinActive, 魔兽世界
	ControlSend,, {Alt Down}3, ahk_id %wowid1%
	ControlSend,, {Alt Down}3, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
+`::
IfWinActive, 魔兽世界
	ControlSend,, {Shift Down}``, ahk_id %wowid1%
	ControlSend,, {Shift Down}``, ahk_id %wowid2%
	Return

; ` 1 2 3 4 5 6 7 8 9 0 - =
WinGet, wowid, List, 魔兽世界
~`::
KeyWait ``
IfWinActive, 魔兽世界
	ControlSend,, ``, ahk_id %wowid1%
	ControlSend,, ``, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~1::
KeyWait 1
IfWinActive, 魔兽世界
	ControlSend,, 1, ahk_id %wowid1%
	ControlSend,, 1, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~2::
KeyWait 2
IfWinActive, 魔兽世界
	ControlSend,, 2, ahk_id %wowid1%
	ControlSend,, 2, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~3::
KeyWait 3
IfWinActive, 魔兽世界
	ControlSend,, 3, ahk_id %wowid1%
	ControlSend,, 3, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~4::
KeyWait 4
IfWinActive, 魔兽世界
	ControlSend,, 4, ahk_id %wowid1%
	ControlSend,, 4, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~5::
KeyWait 5
IfWinActive, 魔兽世界
	ControlSend,, 5, ahk_id %wowid1%
	ControlSend,, 5, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~6::
KeyWait 6
IfWinActive, 魔兽世界
	ControlSend,, 6, ahk_id %wowid1%
	ControlSend,, 6, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~7::
KeyWait 7
IfWinActive, 魔兽世界
	ControlSend,, 7, ahk_id %wowid1%
	ControlSend,, 7, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~8::
KeyWait 8
IfWinActive, 魔兽世界
	ControlSend,, 8, ahk_id %wowid1%
	ControlSend,, 8, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~9::
KeyWait 9
IfWinActive, 魔兽世界
	ControlSend,, 9, ahk_id %wowid1%
	ControlSend,, 9, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~0::
KeyWait 0
IfWinActive, 魔兽世界
	ControlSend,, 0, ahk_id %wowid1%
	ControlSend,, 0, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~-::
KeyWait -
IfWinActive, 魔兽世界
	ControlSend,, -, ahk_id %wowid1%
	ControlSend,, -, ahk_id %wowid2%
	Return

WinGet, wowid, List, 魔兽世界
~=::
KeyWait =
IfWinActive, 魔兽世界
	ControlSend,, =, ahk_id %wowid1%
	ControlSend,, =, ahk_id %wowid2%
	Return

; 空格键
;WinGet, wowid, List, 魔兽世界
;~Space::
;KeyWait Space
;IfWinActive, 魔兽世界
;	ControlSend,, Space, ahk_id %wowid1%
;	ControlSend,, Space, ahk_id %wowid2%
;	Return