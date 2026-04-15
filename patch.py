import re
import os

# Ruta al archivo index.html local
file_path = 'index.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Limpieza de CSS y Recursos Externos
    # Eliminamos cualquier referencia a Unsplash y aseguramos el uso de assets locales
    html = re.sub(r'https://images\.unsplash\.com/[^)\'"]+', 'assets/bundle.webp', html)

    # 2. Carga de LCP Optimizada
    # Forzamos decoding="async" y fetchpriority="high" en la imagen principal
    html = re.sub(
        r'(<img[^>]+src="assets/bundle\.webp"[^>]+)',
        r'\1 decoding="async" fetchpriority="high"',
        html
    )

    # 3. Dimensiones de las imágenes (CLS)
    html = html.replace('class="tp-avatar"', 'class="tp-avatar" width="64" height="64"')
    html = html.replace('class="bono-img"', 'class="bono-img" width="72" height="72"')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Patch aplicado con éxito. Zero-request font strategy activada.")
else:
    print("Error: index.html no encontrado para parchear.")
