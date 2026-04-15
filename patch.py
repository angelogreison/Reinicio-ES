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

    # 2. Optimización de Fuentes ( display=swap )
    # Nos aseguramos de que la URL de Google Fonts tenga display=swap
    if 'fonts.googleapis.com' in html and 'display=swap' not in html:
        html = html.replace('family=Montserrat:wght@800', 'family=Montserrat:wght@800&display=swap')
        html = html.replace('family=Lato:wght@400;700', 'family=Lato:wght@400;700&display=swap')
        html = html.replace('family=Playfair+Display:ital,wght@0,700;0,900;1,700', 'family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap')

    # 3. Atributos de Carga para LCP
    # Forzamos decoding="async" y fetchpriority="high" en la imagen principal
    html = re.sub(
        r'(<img[^>]+src="assets/bundle\.webp"[^>]+)',
        r'\1 decoding="async" fetchpriority="high"',
        html
    )

    # 4. Dimensiones de las imágenes (CLS)
    # Ejemplo de parcheo para imágenes sin dimensiones (ya las añadimos manualmente, pero esto es por seguridad)
    html = html.replace('class="tp-avatar"', 'class="tp-avatar" width="64" height="64"')
    html = html.replace('class="bono-img"', 'class="bono-img" width="72" height="72"')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Patch aplicado con éxito optimizando PageSpeed.")
else:
    print("Error: index.html no encontrado para parchear.")
