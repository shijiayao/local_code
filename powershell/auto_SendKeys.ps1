$global:whileFlag = 1
$global:whileTime = 3

$global:openTime = -1
$global:fristTime = 0
$global:lastTime = 0

# 获取当前日期时间
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

# 日志
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

# 查询窗口标题
function queryApp {
    $windows = Get-Process | Where-Object { $_.MainWindowTitle -ne "" }

    foreach ($window in $windows) {
        <#
        Write-Host "进程名称: $($window.Name)"
        Write-Host "ID: $($window.Id)"
        Write-Host "Handle: $($window.Handle)"
        Write-Host "主窗口标题: $($window.MainWindowTitle)"
        Write-Host "------------------------"
        #>

        if ($window.MainWindowTitle -match "巡查辅助程序") {
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

            Start-Sleep -Seconds (1, 2, 3, 4 | Get-Random)

            clickPoint $window.MainWindowTitle
        }
    }
}


function clickPoint {
    param($title)

    $wshell = New-Object -ComObject wscript.shell
    $wshell.AppActivate($title)
    Start-Sleep -Seconds 0.5
    <#
    $wshell.SendKeys('{TAB}')
    Start-Sleep -Seconds 0.5
    $wshell.SendKeys('{ENTER}')
    #>
    [void] [System.Reflection.Assembly]::LoadWithPartialName("'System.Windows.Forms")
    [System.Windows.Forms.SendKeys]::SendWait("{TAB}")
    for ($i = 1; $i -le (1, 2, 3, 4 | Get-Random); $i++) {
        Start-Sleep -Seconds 0.3
        [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    }

    log "点击签到"
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

log "启动"

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
        log "结束"
    }

    info ("检测中 " + $global:whileTime)

    Start-Sleep -Seconds $global:whileTime
}
