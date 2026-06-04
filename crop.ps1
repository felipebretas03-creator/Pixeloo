Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('c:\Users\Marcos Nunes\Desktop\sites-pixeloo\luna-identidade.png')
$w = $img.Width
$h = $img.Height
$cropRect = New-Object System.Drawing.Rectangle($w/2, 0, $w/2, $h/2)
$bmp = New-Object System.Drawing.Bitmap($cropRect.Width, $cropRect.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$img.Dispose()
$bmp.Save('c:\Users\Marcos Nunes\Desktop\sites-pixeloo\luna-identidade-cropped.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
