import os
import sys
import qrcode
from PIL import Image, ImageDraw, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

# Brand Settings
BRAND_GOLD = (212, 175, 55)
BRAND_BG = (10, 11, 13)
CARD_BG = (19, 22, 24)
TEXT_WHITE = (245, 239, 230)
TEXT_GOLD = (245, 211, 110)
TEXT_MUTED = (160, 165, 173)

def ar(text):
    """Reshape and reorder Arabic text for correct Pillow rendering."""
    try:
        reshaped = arabic_reshaper.reshape(text)
        return get_display(reshaped)
    except Exception:
        return text

STATIONS = [
    {
        "id": "espresso",
        "name": "محطة مكنة الإسبريسو والفلتر",
        "name_en": "Espresso Bar & Filter Coffee Station",
        "rel_path": "stations/espresso/index.html",
        "items": "لاتيه • فلات وايت • سبانيش • بيستاشيو • V60 • كولد برو"
    },
    {
        "id": "traditional",
        "name": "محطة التركي والتراثي والمشروبات الدافئة",
        "name_en": "Turkish & Traditional Brews Station",
        "rel_path": "stations/traditional/index.html",
        "items": "تركي فاتح/وسط/غامق • فرنساوي بالحليب • عربي • جبنة سوداني • هوت شوكليت"
    },
    {
        "id": "backbar",
        "name": "محطة الباك بار والحلويات",
        "name_en": "Cold Bar & Bakery Station",
        "rel_path": "stations/backbar/index.html",
        "items": "سموذي فواكه • ميلك شيك • فرابيه • بوبا فيز • وافل مقرمش • بان كيك"
    }
]

def get_font(name="tahoma.ttf", size=24):
    font_path = os.path.join("C:/Windows/Fonts", name)
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    return ImageFont.load_default()

def generate_badges(base_url="https://emadafandi.github.io/Recipe/"):
    output_dir = os.path.join(os.path.dirname(__file__), "qr-codes")
    os.makedirs(output_dir, exist_ok=True)

    font_title = get_font("tahomabd.ttf" if os.path.exists("C:/Windows/Fonts/tahomabd.ttf") else "tahoma.ttf", 34)
    font_sub = get_font("arial.ttf", 20)
    font_station = get_font("tahomabd.ttf" if os.path.exists("C:/Windows/Fonts/tahomabd.ttf") else "tahoma.ttf", 30)
    font_items = get_font("tahoma.ttf", 17)
    font_callout = get_font("tahomabd.ttf" if os.path.exists("C:/Windows/Fonts/tahomabd.ttf") else "tahoma.ttf", 24)
    font_small = get_font("tahoma.ttf", 16)

    for st in STATIONS:
        full_url = f"{base_url.rstrip('/')}/{st['rel_path']}"
        print(f"Generating QR for: {st['id']} -> {full_url}")

        # 1. Generate Clean QR Code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=16,
            border=2,
        )
        qr.add_data(full_url)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGBA')

        # Save raw QR
        qr_raw_path = os.path.join(output_dir, f"qr_raw_{st['id']}.png")
        qr_img.save(qr_raw_path)

        # 2. Generate Luxury Acrylic / Vinyl Sticker Badge (800x1100 px at high-res)
        badge = Image.new("RGBA", (800, 1100), BRAND_BG)
        draw = ImageDraw.Draw(badge)

        # Outer Gold Border
        draw.rounded_rectangle([(15, 15), (785, 1085)], radius=30, outline=BRAND_GOLD, width=4)
        draw.rounded_rectangle([(25, 25), (775, 1075)], radius=24, outline=(150, 116, 27, 100), width=1)

        # Top Header Accent
        draw.rectangle([(15, 15), (785, 140)], fill=(20, 24, 27))
        draw.line([(15, 140), (785, 140)], fill=BRAND_GOLD, width=2)

        # Brand Text
        draw.text((400, 50), ar("كافيه ومحمصة عماد أفندي"), fill=TEXT_GOLD, anchor="mm", font=font_title)
        draw.text((400, 95), "EMAD AFANDI CAFE & ROASTERY • SOP", fill=TEXT_MUTED, anchor="mm", font=font_sub)

        # Station Title
        draw.text((400, 190), ar(st["name"]), fill=TEXT_WHITE, anchor="mm", font=font_station)
        draw.text((400, 230), st["name_en"], fill=TEXT_GOLD, anchor="mm", font=font_sub)

        # Items Preview Tag
        draw.text((400, 275), ar(st["items"]), fill=TEXT_MUTED, anchor="mm", font=font_items)

        # White QR Box Holder in Center
        qr_size = 460
        resized_qr = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
        box_x = (800 - qr_size) // 2
        box_y = 330
        
        # Golden Frame around QR Box
        draw.rounded_rectangle([(box_x - 14, box_y - 14), (box_x + qr_size + 14, box_y + qr_size + 14)], radius=18, fill=(255, 255, 255), outline=BRAND_GOLD, width=4)
        badge.paste(resized_qr, (box_x, box_y), resized_qr)

        # Bottom Instructions
        draw.text((400, 860), ar("امسح الكود بكاميرا الموبايل للتشغيل الفوري"), fill=TEXT_WHITE, anchor="mm", font=font_callout)
        draw.text((400, 905), ar("المقادير الدقيقة • خطوات التحضير • عيادة الأخطاء • النظافة"), fill=TEXT_MUTED, anchor="mm", font=font_items)

        # Footer Signature
        draw.line([(100, 960), (700, 960)], fill=(50, 55, 62), width=1)
        draw.text((400, 1000), ar("قهوتك على مزاجك ☕👑 | إشراف مجموعة العطيان"), fill=TEXT_GOLD, anchor="mm", font=font_station)
        draw.text((400, 1045), ar("كفر الشيخ، جمهورية مصر العربية"), fill=TEXT_MUTED, anchor="mm", font=font_small)

        # Save final badge
        card_path = os.path.join(output_dir, f"station_label_{st['id']}.png")
        badge.save(card_path, "PNG", dpi=(300, 300))
        print(f"✓ Saved printable label: {card_path}")

    print("\nAll 3 Station QR Badges generated successfully in 'qr-codes/' folder!")

if __name__ == "__main__":
    base = sys.argv[1] if len(sys.argv) > 1 else "https://emadafandi.github.io/Recipe/"
    generate_badges(base)
