import re

with open('C:/Users/angel/.gemini/antigravity/scratch/reinicio-bio-opt/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace <head> entirely
new_head = """<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Reinicio Biológico | Vuelve a Sentirte Tú Misma</title>
    <meta name="description" content="El protocolo de 14 días para apagar la inflamación crónica, la hinchazón y recuperar tu energía sin dietas imposibles.">
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="styles.css">
    <style>
      .hero-bg-picture{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;background:url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200') center 20%/cover;opacity:0.15;}
    </style>
</head>"""
html = re.sub(r'<head>.*?</head>', new_head, html, flags=re.DOTALL)

# Modify Hero Image
new_hero = """<header class="section hero">
        <div class="hero-bg-picture"></div>
        <div class="container hero-container">"""
html = re.sub(r'<header class="section hero">\s*<div class="hero-bg-image"></div>\s*<div class="container hero-container">', new_hero, html, flags=re.DOTALL)

# Modify the FAQ section structure
new_faq = """<div class="accordion">
                <div class="faq-item" data-open="false">
                    <button aria-expanded="false">¿Tengo que hacer una dieta muy estricta? <span>+</span></button>
                    <div class="faq-content"><p>No. El protocolo trabaja CON tus hábitos actuales, no contra ellos. No te pedimos que renuncies a tu vida social ni que pases hambre.</p></div>
                </div>
                <div class="faq-item" data-open="false">
                    <button aria-expanded="false">¿Funciona si tengo más de 45 años? <span>+</span></button>
                    <div class="faq-content"><p>El protocolo está diseñado específicamente para mujeres a partir de los 35, cuando la inflamación silenciosa es más activa. Muchas de las mejores transformaciones vienen de mujeres entre 45 y 55.</p></div>
                </div>
                <div class="faq-item" data-open="false">
                    <button aria-expanded="false">¿Cuándo recibo el acceso? <span>+</span></button>
                    <div class="faq-content"><p>Inmediatamente después del pago. Recibes un email con tus credenciales en menos de 2 minutos.</p></div>
                </div>
                <div class="faq-item" data-open="false">
                    <button aria-expanded="false">¿Necesito comprar productos o suplementos especiales? <span>+</span></button>
                    <div class="faq-content"><p>No. Todo el protocolo se basa en alimentos que encuentras en supermercados normales. Sin gastos extra.</p></div>
                </div>
                <div class="faq-item" data-open="false">
                    <button aria-expanded="false">¿Y si no me funciona? <span>+</span></button>
                    <div class="faq-content"><p>Tienes 15 días de garantía total. Si no notas ninguna diferencia, te devolvemos el 100% de tu dinero sin preguntas.</p></div>
                </div>
            </div>"""
html = re.sub(r'<div class="accordion">.*?</div>', new_faq, html, flags=re.DOTALL)

with open('C:/Users/angel/.gemini/antigravity/scratch/reinicio-bio-opt/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
