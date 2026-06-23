[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.Net.Http

$client = New-Object System.Net.Http.HttpClient
$client.Timeout = [TimeSpan]::FromSeconds(15)
$client.DefaultRequestHeaders.Add("User-Agent", "KalotaszegChurchBot/1.0 (research)")

$outFile = "C:\Users\Hover\EMEOLDAL\candidates.txt"
[System.IO.File]::WriteAllText($outFile, "START`r`n", [System.Text.Encoding]::UTF8)

function Append($line) {
  [System.IO.File]::AppendAllText($outFile, $line + "`r`n", [System.Text.Encoding]::UTF8)
}

function Get-Json($url) {
  try {
    $task = $client.GetStringAsync($url)
    if ($task.Wait(16000)) { return ($task.Result | ConvertFrom-Json) }
    else { return $null }
  } catch { return $null }
}

function Search-Commons($term) {
  $url = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=" + [uri]::EscapeDataString($term) + "&srnamespace=6&srlimit=15&format=json"
  $j = Get-Json $url
  if ($j -eq $null) { return @("ERR/timeout") }
  return ($j.query.search | ForEach-Object { $_.title })
}

# slug | hungarian(ascii) | romanian(ascii)
$rows = @(
  "banffyhunyad|Banffyhunyad|Huedin",
  "bogartelke|Bogartelke|Bagara",
  "egeres|Egeres|Aghires",
  "farnas|Farnas|Sfaras",
  "gyalu|Gyalu|Gilau",
  "gyerovasarhely|Gyerovasarhely|Dumbrava",
  "inaktelke|Inaktelke|Inucu",
  "kalotadamos|Kalotadamos|Domosu",
  "kalotaszentkiraly|Kalotaszentkiraly|Sancraiu",
  "ketesd|Ketesd|Tetisu",
  "kispetri|Kispetri|Petrinzel",
  "korosfo|Korosfo|Izvoru Crisului",
  "kozeplak|Kozeplak|Cuzaplac",
  "magyarbikal|Magyarbikal|Bicalatu",
  "magyargyeromonostor|Magyargyeromonostor|Manastireni",
  "magyarkapus|Magyarkapus|Capusu Mare",
  "magyarkiskapus|Magyarkiskapus|Capusu Mic",
  "magyarlona|Magyarlona|Luna de Sus",
  "magyarvista|Magyarvista|Vistea",
  "makofalva|Makofalva|Macau",
  "mera|Mera|Mera",
  "nadasdaroc|Nadasdaroc|Doroltu",
  "nagypetri|Nagypetri|Petrindu",
  "nyarszo-sarvasar|Nyarszo|Nearsova",
  "ture|Ture|Turea",
  "varalmas|Varalmas|Almasu",
  "zsobok|Zsobok|Jebucu",
  "magyarokerek|Magyarokerek|Alunisu",
  "sztana|Sztana|Stana"
)

foreach ($row in $rows) {
  $p = $row.Split("|")
  $slug = $p[0]; $hu = $p[1]; $ro = $p[2]
  Append("=== " + $slug + " | " + $hu + " | " + $ro + " ===")
  $terms = @(
    ($ro + " biserica reformata"),
    ("reformed church " + $ro),
    ($hu + " reformatus templom"),
    ($hu + " templom"),
    ($ro + " templom")
  )
  $seen = @{}
  foreach ($t in $terms) {
    $res = Search-Commons $t
    foreach ($title in $res) {
      if ($title -and -not $seen.ContainsKey($title)) {
        $seen[$title] = $true
        Append("   " + $title)
      }
    }
  }
}
Append("ALLDONE")
