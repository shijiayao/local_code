$Python_process_path = "C:/Develop/JXBF/Scripts/python.exe" -replace "/", ""
$ShellPath = "C:\Develop\JXBF\script_python_venv.ps1"
$Powershell_Process_Lock_path = "C:/Develop/JXBF/Powershell.Process.lock"
$global:StartTime = [int](Get-Date -UFormat %s) + (48 * 60 * 60)

function log {
    param($content)

    $currentDateTime = Get-Date

    $filePath = "D:/Run_log/" + $currentDateTime.ToString("yyyy-MM-dd") + ".powershell.log"
    $text = $currentDateTime.ToString("yyyy-MM-dd") + " " + $currentDateTime.ToString("HH:mm:ss") + " " + $content

    Add-Content -Value $text -Encoding UTF8 -Path $filePath
}

function CompareTime {
    $CurrentTime = [int](Get-Date -UFormat %s)
    return ($global:StartTime -ge $CurrentTime)
}

while (CompareTime) {
    log "script_monitor->检查"
    
    $Python_process = Get-Process "python" -ErrorAction SilentlyContinue
    $Start_Flag = $false
    
    foreach ($python_process in $Python_process) {
        $path_string = $python_process.path -replace "\\", ""

        if ($path_string -eq $Python_process_path) {
            $Start_Flag = $true
        }
    }
    
    
    if (!$Start_Flag){
        $Process_Object = Start-Process powershell -WindowStyle Hidden -File $ShellPath -PassThru
        log "script_monitor->启动"
    }
    
    Start-Sleep (30 * 60)
}

Clear-Content -Path $Powershell_Process_Lock_path