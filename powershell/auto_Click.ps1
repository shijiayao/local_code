# 主程序模块
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

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

public class UserWin32 {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);

    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool GetClientRect(IntPtr hWnd, out RECT lpRect);

    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
}

public struct RECT {
    public int Left;
    public int Top;
    public int Right;
    public int Bottom;
}

public class IconAPI {
    [DllImport("shell32.dll")]
    public static extern int ExtractIconEx(
        string IpszFile,
        int nIconIndex,
        IntPtr[] phiconLarge,
        IntPtr[] phiconSmall,
        int nIcons
    );
}
"@

$signature = @"
    [DllImport("user32.dll", CharSet=CharSet.Auto, CallingConvention=CallingConvention.StdCall)]
    public static extern void mouse_event(
        long dwFlags,
        long dx,
        long dy,
        long cButtons,
        long dwExtraInfo
    );
"@
$SendMouseClick = Add-Type -memberDefinition $signature -name "Win32MouseEventNew" -namespace Win32Functions -passThru

Start-Sleep -Seconds 5

# Global Variable
$global:ScriptPath = "E:/Development/powershell/"
$global:startFlag = $true
$global:whileFlag = 1
$global:whileTime = 3

$global:openTime = -1
$global:fristTime = 0
$global:lastTime = 0

# Get the current date and time
function GetDateTime {
    $currentDateTime = Get-Date

    return @{
        year       = [int]($currentDateTime.Year);
        month      = [int]($currentDateTime.Month);
        day        = [int]($currentDateTime.Day);
        hour       = [int]($currentDateTime.Hour);
        minute     = [int]($currentDateTime.Minute);
        second     = [int]($currentDateTime.Second);
        FormatDate = $currentDateTime.ToString("yyyy-MM-dd");
        FormatTime = $currentDateTime.ToString("HH:mm:ss");
    }
}

function log {
    param($content)

    $CurrentDateTime = GetDateTime

    $directoryPath = $global:ScriptPath + "/log/" + $CurrentDateTime.year
    New-Item -ItemType Directory -Path $directoryPath -Force | Out-Null

    $filePath = $directoryPath + "/" + $CurrentDateTime.FormatDate + ".txt"
    $text = $CurrentDateTime.FormatDate + " " + $CurrentDateTime.FormatTime + " " + $content

    Add-Content -Value $text -Encoding UTF8 -Path $filePath

    Write-Host $text
}

function info {
    param($content)

    $CurrentDateTime = GetDateTime

    $directoryPath = $global:ScriptPath + "/log/" + $CurrentDateTime.year
    New-Item -ItemType Directory -Path $directoryPath -Force | Out-Null

    $filePath = $directoryPath + "/" + $CurrentDateTime.FormatDate + "-info.txt"
    $text = $CurrentDateTime.FormatDate + " " + $CurrentDateTime.FormatTime + " " + $content

    Add-Content -Value $text -Encoding UTF8 -Path $filePath

    Write-Host $text
}

# Query window title
function queryApp {
    $windows = Get-Process | Where-Object { $_.MainWindowTitle -ne "" }

    foreach ($window in $windows) {
        # Write-Host "Window Title: $($window.MainWindowTitle)"
        if ($window.MainWindowTitle -match "视频巡查辅助程序") {

            if ($global:openTime -eq -1) {
                $CurrentDateTime = GetDateTime

                $global:openTime = $CurrentDateTime.minute

                if ($global:openTime -lt 30) {
                    $global:fristTime = $global:openTime
                    $global:lastTime = $global:openTime + 30
                } else {
                    $global:fristTime = $global:openTime - 30
                    $global:lastTime = $global:openTime
                }

                log ("openTime: " + $global:openTime)
                log ("fristTime: " + $global:fristTime)
                log ("lastTime: " + $global:lastTime)

            }

            waitWindow
        }
    }
}

function waitWindow {
    $windows = Get-Process | Where-Object { $_.MainWindowTitle -ne "" }

    for ($i = 1; $i -le 5; $i++) {
        $windows = Get-Process | Where-Object { $_.MainWindowTitle -ne "" }

        foreach ($window in $windows) {
            if ($window.MainWindowTitle -match "视频巡查辅助程序") {
                [UserWin32]::SetForegroundWindow($window.MainWindowHandle)
            }
        }

        log "$($i):wait 2 Seconds"

        Start-Sleep -Seconds 2
    }

    $windows = Get-Process | Where-Object { $_.MainWindowTitle -ne "" }

    foreach ($window in $windows) {
        if ($window.MainWindowTitle -match "视频巡查辅助程序") {
            clickPoint $window.MainWindowHandle
        }
    }
}

function clickPoint {
    param($MainWindowHandle)

    [UserWin32]::SetForegroundWindow($MainWindowHandle)
    $WindowRect = New-Object RECT
    [UserWin32]::GetWindowRect($MainWindowHandle, [ref]$WindowRect)

    # Write-Host "`t`twindow Left: $($WindowRect.Left), Top: $($WindowRect.Top), Right: $($WindowRect.Right), Bottom: $($WindowRect.Bottom)"

    for ($i = 1; $i -le (Get-Random -Minimum 1.0 -Maximum 2.1); $i++) {
        [UserWin32]::SetForegroundWindow($MainWindowHandle)
        $WindowRect = New-Object RECT
        [UserWin32]::GetWindowRect($MainWindowHandle, [ref]$WindowRect)

        Start-Sleep -Seconds 0.2

        # Move the mouse to
        $X = (Get-Random -Minimum ($WindowRect.Left + 130) -Maximum ($WindowRect.Left + 280))
        $Y = (Get-Random -Minimum ($WindowRect.Top + 170) -Maximum ($WindowRect.Top + 220)) + 200

        [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($X, $Y)
        Start-Sleep -Seconds 0.2

        # will perform left click down
        $SendMouseClick::mouse_event(0x00000002, 0, 0, 0, 0);
        # will perform left click up
        $SendMouseClick::mouse_event(0x00000004, 0, 0, 0, 0);

        log "Click-$($i) Left: $($WindowRect.Left), Top: $($WindowRect.Top), Right: $($WindowRect.Right), Bottom: $($WindowRect.Bottom)"
    }

    log "Click on check-in"
}

log "Start"

while ($global:whileFlag) {
    $CurrentDateTime = GetDateTime

    queryApp

    if ($global:openTime -eq -1) {
        # intervalFuzzy
        # $global:whileTime = 3
    }
    else {
        # intervalAccurate
    }

    if ($CurrentDateTime.hour -ge 20) {
        $global:whileFlag = 0
        $global:whileTime = 1
        log "End"
    }

    info ("interval " + $global:whileTime + " second")

    Start-Sleep -Seconds $global:whileTime
}

# 示例：提取大图标和小图标
$LargeIcons = New-Object IntPtr[] 1
$SmallIcons = New-Object IntPtr[] 1
[IconAPI]::ExtractIconEx("C:\Windows\System32\shell32.dll", 130, $LargeIcons, $SmallIcons, 1)
$newIcon = [System.Drawing.Icon]::FromHandle($LargeIcons[0])

# 托盘图标初始化
$trayIcon = New-Object System.Windows.Forms.NotifyIcon
$trayIcon.Icon = $newIcon
$trayIcon.Text = "AC-PS"
$trayIcon.Visible = $true

# 上下文菜单
$contextMenu = New-Object System.Windows.Forms.ContextMenuStrip

# 退出菜单项
$exitItem = $contextMenu.Items.Add("退出")
$exitItem.Add_Click({
    $trayIcon.Visible = $false
    $timer.Stop()
    log "菜单退出"
    [System.Windows.Forms.Application]::Exit()
})

# 其他菜单项
$syncItem = $contextMenu.Items.Add("其他菜单选项")
$syncItem.Add_Click({
    # 其他菜单项逻辑
})

$trayIcon.ContextMenuStrip = $contextMenu

# 定时器模块
$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 3000


$timer.Add_Tick({

    if($global:startFlag) {
        log "定时器启动"
        $global:startFlag = $false
    }
    if($global:whileFlag) {
        $CurrentDateTime = GetDateTime

        queryApp

        if ($CurrentDateTime.hour -ge 20) {
            $global:whileFlag = 0
            $global:whileTime = 1
            log "End"
        }

        info ("interval " + $global:whileTime + " second")

        Start-Sleep -Seconds $global:whileTime
    } else {
        $timer.Stop()
        [System.Windows.Forms.Application]::Exit()
    }
})

# 启动服务
$timer.Start()
[System.Windows.Forms.Application]::Run()

# 退出清理
$timer.Dispose()
$trayIcon.Dispose()
$mutex.ReleaseMutex()


<#
# 点击特定坐标.ps1
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(100, 100)
[System.Windows.Forms.SendMouseEvents]::MouseEvent("LeftDown")
Start-Sleep -Milliseconds 100
[System.Windows.Forms.SendMouseEvents]::MouseEvent("LeftUp")
#>
