$ShellPath = "C:\Develop\JXBF\script_monitor.ps1"
$Powershell_Process_Lock_path = "C:/Develop/JXBF/Powershell.Process.lock"

$content = Get-Content -Path $Powershell_Process_Lock_path

if ($content){
    exit 0
}

function log {
    param($content)

    $currentDateTime = Get-Date

    $filePath = "D:/Run_log/" + $currentDateTime.ToString("yyyy-MM-dd") + ".powershell.log"
    $text = $currentDateTime.ToString("yyyy-MM-dd") + " " + $currentDateTime.ToString("HH:mm:ss") + " " + $content

    Add-Content -Value $text -Encoding UTF8 -Path $filePath
}

$Process_Object = Start-Process powershell -WindowStyle Hidden -File $ShellPath -PassThru

log("script_monitor id " + $Process_Object.id)

Add-Content -Value $Process_Object.id -Encoding UTF8 -Path $Powershell_Process_Lock_path