# 主程序模块
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# 防重复启动模块
$mutex = New-Object System.Threading.Mutex($true, "Global\SyncService", [ref]$null)
if (-not $mutex.WaitOne(0, $false)) {
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.MessageBox]::Show("程序已在运行中", "提示", "OK", "Information") | Out-Null
    exit
}

Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class IconAPI {
    [DllImport("shell32.dll")]
    public static extern int ExtractIconEx(
        string lpszFile,
        int nIconIndex,
        IntPtr[] phiconLarge,
        IntPtr[] phiconSmall,
        int nIcons
    );
}
"@

$Global:StartTime = Get-Date
$Global:CurrentTime = $null
$Global:TimeDifference = $null
$Global:Count = 0

# 日志函数
function log {
    param($content)
    $currentDateTime = Get-Date

    $LogPath = "D:/Run_log/" + $currentDateTime.ToString("yyyy") + "/"
    New-Item -ItemType Directory -Path $LogPath -Force

    $filePath = $LogPath + $currentDateTime.ToString("yyyy-MM-dd") + ".powershell.log"
    $text = $currentDateTime.ToString("yyyy-MM-dd") + " " + $currentDateTime.ToString("HH:mm:ss") + " " + $content
    Add-Content -Value $text -Encoding UTF8 -Path $filePath
}

function MainScript {
	log "Start Python3 Script"

	$commands = {
		Set-Location C:\Develop\JXBF
		.\Scripts\activate
		python JXBF_MAIN.py
	}
	
	Start-Process -NoNewWindow powershell -ArgumentList "-Command", $commands.ToString()
}

# 示例：提取大图标和小图标
$LargeIcons = New-Object IntPtr[] 1
$SmallIcons = New-Object IntPtr[] 1
[IconAPI]::ExtractIconEx("C:\Windows\System32\shell32.dll", 130, $LargeIcons, $SmallIcons, 1)

# 托盘图标初始化
$trayIcon = New-Object System.Windows.Forms.NotifyIcon
$trayIcon.Icon = [System.Drawing.Icon]::FromHandle($LargeIcons[0])
$trayIcon.Text = "Monit"
$trayIcon.Visible = $true

# 上下文菜单
$contextMenu = New-Object System.Windows.Forms.ContextMenuStrip

# 退出菜单项
$exitItem = $contextMenu.Items.Add("退出")
$exitItem.Add_Click({
    $trayIcon.Visible = $false
    $timer.Stop()
    [System.Windows.Forms.Application]::Exit()
})

$trayIcon.ContextMenuStrip = $contextMenu

# 定时器模块
$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 1000

$timer.Add_Tick({
    $Global:CurrentTime = Get-Date
    $Global:TimeDifference = $Global:CurrentTime - $Global:StartTime

    # 每 30 秒执行一次
    if($Global:Count % 30 -eq 0) {
        MainScript
    }
    
    # 运行 24 小时后，退出
    if ($Global:TimeDifference.Hours -ge 24) {
        $timer.Stop()
        [System.Windows.Forms.Application]::Exit()
    }

    Start-Sleep -Seconds 1
    $Global:Count += 1
})

# 启动服务
$timer.Start()
[System.Windows.Forms.Application]::Run()

# 退出清理
$timer.Dispose()
$trayIcon.Dispose()
$mutex.ReleaseMutex()
