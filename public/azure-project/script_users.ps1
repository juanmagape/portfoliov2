Import-Module ActiveDirectory

$csvPath = "C:\Scripts\usuarios.csv"
$logPath = "C:\Scripts\user-creation-log.txt"

$users = Import-Csv -Path $csvPath

foreach ($user in $users) {

    $fullName = "$($user.Nombre) $($user.Apellido)"
    $samAccountName = $user.NombreUsuario
    $upn = "$samAccountName@ad.suppora.com"

    try {
        if (Get-ADUser -Filter "SamAccountName -eq '$samAccountName'" -ErrorAction SilentlyContinue) {
            Write-Warning "User $samAccountName already exists. Skipping."
            Add-Content -Path $logPath -Value "$(Get-Date) - SKIPPED (already exists): $samAccountName"
            continue
        }

        $securePassword = ConvertTo-SecureString $user.Password -AsPlainText -Force

        New-ADUser `
            -Name $fullName `
            -GivenName $user.Nombre `
            -Surname $user.Apellido `
            -SamAccountName $samAccountName `
            -UserPrincipalName $upn `
            -Path $user.OU `
            -Department $user.Departamento `
            -Title $user.Puesto `
            -AccountPassword $securePassword `
            -Enabled $true `
            -ChangePasswordAtLogon $true

        Write-Host "User created successfully: $samAccountName" -ForegroundColor Green
        Add-Content -Path $logPath -Value "$(Get-Date) - CREATED: $samAccountName"
    }
    catch {
        Write-Host "Error creating $samAccountName : $_" -ForegroundColor Red
        Add-Content -Path $logPath -Value "$(Get-Date) - ERROR ($samAccountName): $_"
    }
}

Write-Host "`nProcess finished. Check the log at $logPath"