# Setting up an environment by importing a couple of system assemblies ¡ª simply copy these two
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Drawing")
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")

Add-Type @'
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

    public struct RECT
    {
        public int Left;
        public int Top;
        public int Right;
        public int Bottom;
    }
'@

$signature = @'
    [DllImport("user32.dll",CharSet=CharSet.Auto,CallingConvention=CallingConvention.StdCall)]
    public static extern void mouse_event(long dwFlags, long dx, long dy, long cButtons, long dwExtraInfo);
'@
$SendMouseClick = Add-Type -memberDefinition $signature -name "Win32MouseEventNew" -namespace Win32Functions -passThru

Start-Sleep -Seconds 5

# Global Variable
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

    $filePath = "./log/" + $CurrentDateTime.FormatDate + ".txt"
    $text = $CurrentDateTime.FormatDate + " " + $CurrentDateTime.FormatTime + " " + $content

    Add-Content -Value $text -Encoding UTF8 -Path $filePath

    Write-Host $text
}

function info {
    param($content)

    $CurrentDateTime = GetDateTime

    $filePath = "./log/" + $CurrentDateTime.FormatDate + "-info.txt"
    $text = $CurrentDateTime.FormatDate + " " + $CurrentDateTime.FormatTime + " " + $content

    Add-Content -Value $text -Encoding UTF8 -Path $filePath

    Write-Host $text
}

# Query window title
function queryApp {
    $windows = Get-Process | Where-Object { $_.MainWindowTitle -ne "" }

    foreach ($window in $windows) {
        <#
        Write-Host "process name: $($window.Name)"
        Write-Host "ID: $($window.Id)"
        Write-Host "Handle: $($window.Handle)"
        Write-Host "Main Window Title: $($window.MainWindowTitle)"
        Write-Host "Main Window Handle: $($window.MainWindowHandle)"
        Write-Host "------------------------"
        #>

        if ($window.MainWindowTitle -match "ÊÓÆµÑ²²é¸¨Öú³ÌÐò") {
            if ($global:openTime -eq -1) {

                $CurrentDateTime = GetDateTime

                $global:openTime = $CurrentDateTime.minute

                if ($global:openTime -lt 30) {
                    $global:fristTime = $global:openTime
                    $global:lastTime = $global:openTime + 30
                }
                else {
                    $global:fristTime = $global:openTime - 30
                    $global:lastTime = $global:openTime
                }

                info ("openTime: " + $global:openTime)
                info ("fristTime: " + $global:fristTime)
                info ("lastTime: " + $global:lastTime)

            }

            Start-Sleep -Seconds (Get-Random -Minimum 0.0 -Maximum 2.0)

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


    for ($i = 1; $i -le (Get-Random -Minimum 1 -Maximum 4); $i++) {
        # Move the mouse to
        [UserWin32]::SetForegroundWindow($MainWindowHandle)
        [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point((Get-Random -Minimum ($WindowRect.Left + 130) -Maximum ($WindowRect.Left + 280)), (Get-Random -Minimum ($WindowRect.Left + 170) -Maximum ($WindowRect.Left + 240)))
        Start-Sleep -Seconds 0.3

        # will perform left click down
        $SendMouseClick::mouse_event(0x00000002, 0, 0, 0, 0);
        # will perform left click up
        $SendMouseClick::mouse_event(0x00000004, 0, 0, 0, 0);
    }

    log "Click on check-in"
}

function intervalFuzzy {
    $CurrentDateTime = GetDateTime

    if ($CurrentDateTime.minute -lt 10) {
        $global:whileTime = (10 - $CurrentDateTime.minute) * 60 - $CurrentDateTime.second
    }
    elseif ($CurrentDateTime.minute -ge 20 -and $CurrentDateTime.minute -lt 40) {
        $global:whileTime = (60 - $CurrentDateTime.minute) * 60 - $CurrentDateTime.second
    }
    elseif ($CurrentDateTime.minute -ge 50) {
        $global:whileTime = (60 - $CurrentDateTime.minute) * 60 + 10 * 60 - $CurrentDateTime.second
    }
    else {
        $global:whileTime = 3
    }

}

function intervalAccurate {
    $CurrentDateTime = GetDateTime

    $a = $global:fristTime - 2
    $b = $global:fristTime + 2
    $c = $global:lastTime - 2
    $d = $global:lastTime + 2

    if ($CurrentDateTime.minute -lt $a ) {
        $global:whileTime = ($a - $CurrentDateTime.minute) * 60 - $CurrentDateTime.second
    }
    elseif ($CurrentDateTime.minute -ge $b -and $CurrentDateTime.minute -lt $c) {
        $global:whileTime = ($c - $CurrentDateTime.minute) * 60 - $CurrentDateTime.second
    }
    elseif ($CurrentDateTime.minute -ge $d) {
        $global:whileTime = (60 - $CurrentDateTime.minute) * 60 + $a * 60 - $CurrentDateTime.second
    }
    else {
        $global:whileTime = 3
    }

}

log "Start"

while ($global:whileFlag) {
    $CurrentDateTime = GetDateTime

    queryApp

    if ($global:openTime -eq -1) {
        # intervalFuzzy
        $global:whileTime = 3
    }
    else {
        intervalAccurate
    }

    if ($CurrentDateTime.hour -ge 20) {
        $global:whileFlag = 0
        $global:whileTime = 1
        log "End"
    }

    info ("interval " + $global:whileTime + " second")

    Start-Sleep -Seconds $global:whileTime
}
