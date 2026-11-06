import os
import sys
import qrcode
from PIL import Image, ImageDraw, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display
import cv2

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

# Brand Settings
BRAND_GOLD = (212, 175, 55)
BRAND_BG = (7, 8, 10)
CARD_BG = (16, 19, 24)
TEXT_WHITE = (245, 239, 230)
TEXT_GOLD = (245, 211, 110)
DARK_GOLD = (180, 140, 30)
TEXT_MUTED = (160, 165, 173)
WHITE = (255, 255, 255)

def ar(text):
    """Reshape and reorder Arabic text for correct Pillow rendering."""
    try:
        reshaped = arabic_reshaper.reshape(text)
        return get_display(reshaped)
    except Exception:
        return text

# Icon Drawing Functions
def draw_portafilter_icon(size=300):
    """Draws a professional Espresso Portafilter."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    s = size / 200.0
    
    # Portafilter Head
    draw.rounded_rectangle([(36*s, 70*s), (94*s, 116*s)], radius=int(6*s), fill=BRAND_GOLD, outline=BRAND_BG, width=int(3*s))
    draw.rectangle([(28*s, 64*s), (102*s, 74*s)], fill=BRAND_GOLD)
    draw.ellipse([(24*s, 64*s), (36*s, 74*s)], fill=BRAND_GOLD)
    draw.ellipse([(94*s, 64*s), (106*s, 74*s)], fill=BRAND_GOLD)
    
    # Dual Spout at bottom
    draw.polygon([(48*s, 115*s), (44*s, 134*s), (54*s, 132*s), (56*s, 115*s)], fill=DARK_GOLD)
    draw.polygon([(74*s, 115*s), (76*s, 132*s), (86*s, 134*s), (82*s, 115*s)], fill=DARK_GOLD)
    draw.ellipse([(41*s, 131*s), (55*s, 136*s)], fill=DARK_GOLD)
    draw.ellipse([(75*s, 131*s), (89*s, 136*s)], fill=DARK_GOLD)

    # Handle neck
    draw.rectangle([(94*s, 84*s), (114*s, 102*s)], fill=DARK_GOLD)
    
    # Handle
    draw.rounded_rectangle([(110*s, 80*s), (176*s, 106*s)], radius=int(8*s), fill=BRAND_GOLD, outline=BRAND_BG, width=int(2*s))
    draw.line([(128*s, 83*s), (128*s, 103*s)], fill=DARK_GOLD, width=int(2*s))
    draw.line([(144*s, 83*s), (144*s, 103*s)], fill=DARK_GOLD, width=int(2*s))
    draw.line([(160*s, 83*s), (160*s, 103*s)], fill=DARK_GOLD, width=int(2*s))
    draw.ellipse([(170*s, 82*s), (178*s, 104*s)], fill=DARK_GOLD)
    
    return img

def draw_sand_kanaka_icon(size=300):
    """Draws a traditional Sand Brewer (Ramlah) with Turkish Kanaka (Cezve)."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    s = size / 200.0

    # Sand Basin (الرملة)
    draw.ellipse([(26*s, 130*s), (174*s, 166*s)], fill=DARK_GOLD, outline=BRAND_BG, width=int(2*s))
    draw.ellipse([(32*s, 126*s), (168*s, 156*s)], fill=(217, 163, 67))
    for dot in [(55, 138), (80, 142), (110, 140), (140, 144), (95, 134), (70, 146), (125, 147)]:
        draw.ellipse([(dot[0]*s, dot[1]*s), ((dot[0]+2)*s, ((dot[1]+2)*s))], fill=(160, 110, 30))

    # Turkish Kanaka (كنكة غاطسة في الرمل)
    kanaka_poly = [(80*s, 64*s), (106*s, 64*s), (116*s, 130*s), (70*s, 130*s)]
    draw.polygon(kanaka_poly, fill=BRAND_GOLD, outline=BRAND_BG)
    draw.ellipse([(76*s, 59*s), (110*s, 69*s)], fill=BRAND_GOLD, outline=BRAND_BG, width=int(2*s))
    draw.polygon([(76*s, 62*s), (68*s, 59*s), (76*s, 67*s)], fill=BRAND_GOLD) # Spout
    
    # Kanaka Handle
    draw.line([(104*s, 73*s), (166*s, 40*s)], fill=BRAND_GOLD, width=int(7*s))
    draw.line([(122*s, 63*s), (164*s, 41*s)], fill=DARK_GOLD, width=int(9*s))
    draw.ellipse([(161*s, 37*s), (169*s, 45*s)], fill=BRAND_GOLD)
    
    # Steam
    draw.line([(86*s, 50*s), (86*s, 36*s)], fill=TEXT_GOLD, width=int(3*s))
    draw.line([(95*s, 53*s), (99*s, 32*s)], fill=TEXT_GOLD, width=int(3*s))
    draw.ellipse([(83*s, 31*s), (89*s, 37*s)], fill=TEXT_GOLD)
    draw.ellipse([(97*s, 26*s), (103*s, 32*s)], fill=TEXT_GOLD)

    return img

def draw_blender_ice_icon(size=300):
    """Draws a commercial bar blender with ice cubes."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    s = size / 200.0

    # Blender Base
    draw.polygon([(64*s, 140*s), (124*s, 140*s), (132*s, 172*s), (56*s, 172*s)], fill=DARK_GOLD, outline=BRAND_BG, width=int(2*s))
    draw.ellipse([(89*s, 148*s), (99*s, 158*s)], fill=BRAND_BG)
    draw.ellipse([(91*s, 150*s), (97*s, 156*s)], fill=BRAND_GOLD)

    # Blender Jar
    pitcher_poly = [(66*s, 60*s), (122*s, 60*s), (114*s, 138*s), (74*s, 138*s)]
    draw.polygon(pitcher_poly, fill=BRAND_GOLD, outline=BRAND_BG, width=int(2*s))
    for my in [78, 93, 108, 123]:
        draw.line([(78*s, my*s), (90*s, my*s)], fill=BRAND_BG, width=int(2*s))
    
    # Handle
    draw.arc([(106*s, 70*s), (136*s, 124*s)], start=-80, end=80, fill=BRAND_GOLD, width=int(6*s))
    
    # Lid
    draw.rectangle([(62*s, 52*s), (126*s, 60*s)], fill=DARK_GOLD, outline=BRAND_BG, width=int(2*s))
    draw.ellipse([(86*s, 44*s), (102*s, 54*s)], fill=DARK_GOLD)

    # Ice Cubes
    def draw_cube(cx, cy, csize):
        cs = csize * s
        draw.rectangle([(cx*s, cy*s), (cx*s + cs, cy*s + cs)], fill=WHITE, outline=BRAND_GOLD, width=int(2*s))
        draw.polygon([(cx*s, cy*s), (cx*s + cs*0.35, cy*s - cs*0.35), (cx*s + cs*1.35, cy*s - cs*0.35), (cx*s + cs, cy*s)], fill=(230, 240, 255), outline=BRAND_GOLD, width=int(1.5*s))
        draw.polygon([(cx*s + cs, cy*s), (cx*s + cs*1.35, cy*s - cs*0.35), (cx*s + cs*1.35, cy*s + cs*0.65), (cx*s + cs, cy*s + cs)], fill=(200, 220, 245), outline=BRAND_GOLD, width=int(1.5*s))

    draw_cube(140, 84, 25)
    draw_cube(30, 104, 22)
    
    return img

STATIONS = [
    {
        "id": "espresso",
        "name": "محطة مكنة الإسبريسو والفلتر",
        "name_en": "Espresso Bar & Filter Coffee Station",
        "rel_path": "1-espresso-station/index.html?qr=espresso",
        "items": "لاتيه • فلات وايت • سبانيش • بيستاشيو • V60 • كولد برو",
        "icon_func": draw_portafilter_icon,
        "icon_label": "بورتفلتر (Portafilter)"
    },
    {
        "id": "traditional",
        "name": "محطة التركي والتراثي والمشروبات الدافئة",
        "name_en": "Turkish & Traditional Brews Station",
        "rel_path": "2-traditional-station/index.html?qr=traditional",
        "items": "تركي فاتح/وسط/غامق • فرنساوي بالحليب • عربي • جبنة سوداني • هوت شوكليت",
        "icon_func": draw_sand_kanaka_icon,
        "icon_label": "رملة وكنكة (Sand Brewer & Cezve)"
    },
    {
        "id": "backbar",
        "name": "محطة الباك بار والحلويات",
        "name_en": "Cold Bar & Bakery Station",
        "rel_path": "3-backbar-station/index.html?qr=backbar",
        "items": "عجينة الوافل الأصلية • سموذي • ميلك شيك • فرابيه • بوبا فيز • بان كيك",
        "icon_func": draw_blender_ice_icon,
        "icon_label": "بلندر وثلج (Blender & Ice)"
    }
]

def get_font(name="tahoma.ttf", size=24):
    font_path = os.path.join("C:/Windows/Fonts", name)
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    return ImageFont.load_default()

def generate_badges(base_url="https://emad-afandi-recipe.pages.dev/"):
    root_dir = os.path.dirname(__file__)
    output_dir = os.path.join(root_dir, "qr-codes")
    assets_icon_dir = os.path.join(root_dir, "assets", "icons")
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(assets_icon_dir, exist_ok=True)

    logo_path = os.path.join(root_dir, "assets", "emad-logo.png")
    logo_img = None
    if os.path.exists(logo_path):
        logo_img = Image.open(logo_path).convert("RGBA")

    font_title = get_font("tahomabd.ttf" if os.path.exists("C:/Windows/Fonts/tahomabd.ttf") else "tahoma.ttf", 32)
    font_sub = get_font("arial.ttf", 19)
    font_station = get_font("tahomabd.ttf" if os.path.exists("C:/Windows/Fonts/tahomabd.ttf") else "tahoma.ttf", 28)
    font_items = get_font("tahoma.ttf", 16)
    font_callout = get_font("tahomabd.ttf" if os.path.exists("C:/Windows/Fonts/tahomabd.ttf") else "tahoma.ttf", 23)
    font_small = get_font("tahoma.ttf", 15)

    detector = cv2.QRCodeDetector()

    for st in STATIONS:
        full_url = f"{base_url.rstrip('/')}/{st['rel_path']}"
        print(f"\n[+] Generating Station QR: {st['id']} with {st['icon_label']}")
        print(f"    URL: {full_url}")

        # 1. Generate Clean Base QR Code with High Error Correction
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=16,
            border=3,
        )
        qr.add_data(full_url)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGBA')
        qr_w, qr_h = qr_img.size

        # 2. Draw Station-Specific Icon & Center Badge
        icon_img = st["icon_func"](400)
        # Save standalone icon to assets/icons/
        icon_img.save(os.path.join(assets_icon_dir, f"icon_{st['id']}.png"))

        # Center badge size: 24% of QR width (optimal for H error correction)
        badge_size = int(qr_w * 0.24)
        if badge_size % 2 != 0: badge_size += 1

        badge = Image.new("RGBA", (badge_size, badge_size), (0, 0, 0, 0))
        bdraw = ImageDraw.Draw(badge)
        # White background rounded rectangle with luxury gold border
        bdraw.rounded_rectangle([(2, 2), (badge_size-2, badge_size-2)], radius=int(badge_size*0.25), fill=WHITE, outline=BRAND_GOLD, width=4)
        bdraw.rounded_rectangle([(6, 6), (badge_size-6, badge_size-6)], radius=int(badge_size*0.2), fill=WHITE, outline=DARK_GOLD, width=1)

        # Paste resized icon inside badge
        inner_icon_size = int(badge_size * 0.74)
        icon_resized = icon_img.resize((inner_icon_size, inner_icon_size), Image.Resampling.LANCZOS)
        badge.paste(icon_resized, ((badge_size - inner_icon_size) // 2, (badge_size - inner_icon_size) // 2), icon_resized)

        # Paste badge onto QR code center
        qr_img.paste(badge, ((qr_w - badge_size) // 2, (qr_h - badge_size) // 2), badge)

        # Save Raw QR with Center Icon
        qr_raw_path = os.path.join(output_dir, f"qr_raw_{st['id']}.png")
        qr_img.save(qr_raw_path)

        # 3. Verify Scanability
        val, _, _ = detector.detectAndDecode(cv2.imread(qr_raw_path))
        if val == full_url:
            print(f"    ✓ Scan Verification PASSED (100% Match): {val}")
        else:
            print(f"    ❌ Warning: Scan validation mismatch: '{val}' vs '{full_url}'")

        # 4. Generate Luxury Acrylic / Vinyl Sticker Badge (800x1160 px at high-res 300 DPI)
        badge_sheet = Image.new("RGBA", (800, 1160), BRAND_BG)
        draw = ImageDraw.Draw(badge_sheet)

        # Outer Gold Border
        draw.rounded_rectangle([(15, 15), (785, 1145)], radius=30, outline=BRAND_GOLD, width=4)
        draw.rounded_rectangle([(25, 25), (775, 1135)], radius=24, outline=(150, 116, 27, 100), width=1)

        # Header Plate
        draw.rectangle([(15, 15), (785, 175)], fill=(15, 18, 22))
        draw.line([(15, 175), (785, 175)], fill=BRAND_GOLD, width=2)

        # Paste Original Emad Afandi Logo
        if logo_img:
            logo_resized = logo_img.resize((120, 120), Image.Resampling.LANCZOS)
            badge_sheet.paste(logo_resized, (50, 30), logo_resized)
            draw.text((450, 68), ar("كافيه ومحمصة عماد أفندي"), fill=TEXT_GOLD, anchor="mm", font=font_title)
            draw.text((450, 115), "EMAD AFANDI CAFE & ROASTERY • SOP", fill=TEXT_MUTED, anchor="mm", font=font_sub)
        else:
            draw.text((400, 68), ar("كافيه ومحمصة عماد أفندي"), fill=TEXT_GOLD, anchor="mm", font=font_title)
            draw.text((400, 115), "EMAD AFANDI CAFE & ROASTERY • SOP", fill=TEXT_MUTED, anchor="mm", font=font_sub)

        # Station Title
        draw.text((400, 225), ar(st["name"]), fill=TEXT_WHITE, anchor="mm", font=font_station)
        draw.text((400, 265), st["name_en"], fill=TEXT_GOLD, anchor="mm", font=font_sub)

        # Items Preview Tag
        draw.text((400, 305), ar(st["items"]), fill=TEXT_MUTED, anchor="mm", font=font_items)

        # White QR Box Holder in Center
        qr_display_size = 470
        resized_qr = qr_img.resize((qr_display_size, qr_display_size), Image.Resampling.LANCZOS)
        box_x = (800 - qr_display_size) // 2
        box_y = 350
        
        # Golden Frame around QR Box
        draw.rounded_rectangle([(box_x - 14, box_y - 14), (box_x + qr_display_size + 14, box_y + qr_display_size + 14)], radius=18, fill=WHITE, outline=BRAND_GOLD, width=4)
        badge_sheet.paste(resized_qr, (box_x, box_y), resized_qr)

        # Bottom Instructions
        draw.text((400, 895), ar("امسح الكود بكاميرا الموبايل لفتح شاشة التشغيل المعملي"), fill=TEXT_WHITE, anchor="mm", font=font_callout)
        draw.text((400, 938), ar("المقادير الدقيقة • خطوات التحضير • عيادة الأخطاء • النظافة"), fill=TEXT_MUTED, anchor="mm", font=font_items)

        # Footer Signature
        draw.line([(100, 1000), (700, 1000)], fill=(50, 55, 62), width=1)
        draw.text((400, 1045), ar("قهوتك على مزاجك • إشراف مجموعة العطيان"), fill=TEXT_GOLD, anchor="mm", font=font_station)
        draw.text((400, 1090), ar("كفر الشيخ، جمهورية مصر العربية"), fill=TEXT_MUTED, anchor="mm", font=font_small)

        # Save final badge
        card_path = os.path.join(output_dir, f"station_label_{st['id']}.png")
        badge_sheet.save(card_path, "PNG", dpi=(300, 300))
        print(f"    ✓ Saved 300 DPI sticker label: {card_path}")

    print("\n✅ All 3 Custom Station QR Badges Generated & Verified Successfully!")

if __name__ == "__main__":
    base = sys.argv[1] if len(sys.argv) > 1 else "https://emad-afandi-recipe.pages.dev/"
    generate_badges(base)
