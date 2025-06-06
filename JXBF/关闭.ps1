$Python_process = Get-Process | Where-Object { $_.ProcessName -eq "python" }
$Python_process_path = "C:/Develop/JXBF/Scripts/python.exe" -replace "/", ""
$Powershell_Process_Lock_path = "C:/Develop/JXBF/Powershell.Process.lock"
$content = Get-Content -Path $Powershell_Process_Lock_path

function log {
    param($content)

    $currentDateTime = Get-Date

    $filePath = "D:/Run_log/" + $currentDateTime.ToString("yyyy-MM-dd") + ".powershell.log"
    $text = $currentDateTime.ToString("yyyy-MM-dd") + " " + $currentDateTime.ToString("HH:mm:ss") + " " + $content

    Add-Content -Value $text -Encoding UTF8 -Path $filePath
}

log "关闭->检查"

if ($content){
    Stop-Process -Id $content -Force
}

Clear-Content -Path $Powershell_Process_Lock_path

foreach ($python_process in $Python_process) {
    $path_string = $python_process.path -replace "\\", ""
    
    if ($path_string -eq $Python_process_path) {
        Stop-Process -Id $python_process.id -Force
    }
}

log "关闭->关闭"

Clear-Content -Path $Powershell_Process_Lock_path
