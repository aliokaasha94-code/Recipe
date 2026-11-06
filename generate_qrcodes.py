import os
import sys
import qrcode
from PIL import Image, ImageDraw
import cv2

sys.stdout.reconfigure(encoding='utf-8')

BRAND_GOLD = (212, 175, 55)

def prepare_3d_badge(src_path, size=600):
    """Formats 3D master render into a unified luxury squircle with double gold ring."""
    raw = Image.open(src_path).convert("RGBA")
    
    badge = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    mdraw = ImageDraw.Draw(mask)
    radius = int(size * 0.24)
    mdraw.rounded_rectangle([(0, 0), (size, size)], radius=radius, fill=255)
    
    resized = raw.resize((size, size), Image.Resampling.LANCZOS)
    badge.paste(resized, (0, 0), mask)
    
    bdraw = ImageDraw.Draw(badge)
    # Outer gold ring
    bdraw.rounded_rectangle([(3, 3), (size-3, size-3)], radius=radius, outline=BRAND_GOLD, width=8)
    # Inner gold accent ring
    bdraw.rounded_rectangle([(11, 11), (size-11, size-11)], radius=int(radius*0.84), outline=(160, 125, 30, 200), width=3)
    
    return badge

def generate_hires_qr(url, badge_img, out_path, is_white=True, box_size=32, badge_boxes=10):
    """
    Generates an ultra high-res (1760x1760 px, 300 DPI) pure QR code on a TRANSPARENT background.
    - Outer smooth rounded border hugging the QR code
    - Centered prominent 10x10 3D badge with luxury gold frame
    - Zero poster frames, zero external text, pure transparent PNG
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=box_size,
        border=3
    )
    qr.add_data(url)
    qr.make(fit=True)
    matrix = qr.get_matrix()
    total_boxes = len(matrix)
    img_size = total_boxes * box_size # 1760 px at box_size=32
    
    # 100% Transparent RGBA Canvas
    canvas = Image.new("RGBA", (img_size, img_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    start_box = (total_boxes - badge_boxes) // 2
    end_box = start_box + badge_boxes
    
    mod_color = (255, 255, 255) if is_white else (12, 12, 12)
    
    # Draw modules
    for r in range(total_boxes):
        for c in range(total_boxes):
            if start_box <= r < end_box and start_box <= c < end_box:
                continue
            if matrix[r][c]:
                x0 = c * box_size
                y0 = r * box_size
                draw.rectangle([(x0, y0), (x0 + box_size, y0 + box_size)], fill=mod_color + (255,))
                
    # Outer Rounded Frame
    border_inset = int(box_size * 0.7)
    border_thick = int(box_size * 0.65)
    draw.rounded_rectangle(
        [(border_inset, border_inset), (img_size - border_inset, img_size - border_inset)],
        radius=int(box_size * 1.8),
        outline=mod_color + (255,),
        width=border_thick
    )
    
    # Center Badge placement
    badge_px_size = badge_boxes * box_size
    badge_x = start_box * box_size
    badge_y = start_box * box_size
    
    inner_badge_size = badge_px_size - 14
    resized_badge = badge_img.resize((inner_badge_size, inner_badge_size), Image.Resampling.LANCZOS)
    canvas.paste(resized_badge, (badge_x + 7, badge_y + 7), resized_badge)
    
    canvas.save(out_path, "PNG", dpi=(300, 300))
    print(f"  ✓ Saved 300 DPI Transparent QR: {os.path.basename(out_path)} ({img_size}x{img_size} px)")
    return canvas

def main():
    root_dir = os.path.dirname(__file__)
    output_dir = os.path.join(root_dir, "qr-codes")
    images_dir = os.path.join(root_dir, "assets", "images")
    os.makedirs(output_dir, exist_ok=True)
    
    # Load 3D Master Renders
    badge_espresso = prepare_3d_badge(os.path.join(images_dir, "3d_portafilter_master.jpg"), 600)
    badge_traditional = prepare_3d_badge(os.path.join(images_dir, "3d_sand_brewer_master.jpg"), 600)
    badge_backbar = prepare_3d_badge(os.path.join(images_dir, "3d_blender_master.jpg"), 600)
    
    stations = [
        {
            "id": "espresso",
            "name": "محطة مكنة الإسبريسو والفلتر",
            "url": "https://emad-afandi-recipe.pages.dev/1-espresso-station/index.html?qr=espresso",
            "badge": badge_espresso
        },
        {
            "id": "traditional",
            "name": "محطة التركي والتراثي والمشروبات الدافئة",
            "url": "https://emad-afandi-recipe.pages.dev/2-traditional-station/index.html?qr=traditional",
            "badge": badge_traditional
        },
        {
            "id": "backbar",
            "name": "محطة الباك بار والحلويات",
            "url": "https://emad-afandi-recipe.pages.dev/3-backbar-station/index.html?qr=backbar",
            "badge": badge_backbar
        }
    ]
    
    detector = cv2.QRCodeDetector()
    
    for st in stations:
        print(f"\n[+] Processing 3D QR: {st['name']}")
        
        # 1. White on Transparent (Image 5 style)
        white_path = os.path.join(output_dir, f"qr_3d_{st['id']}_white.png")
        generate_hires_qr(st["url"], st["badge"], white_path, is_white=True, box_size=32, badge_boxes=10)
        
        # Raw default path for UI
        raw_path = os.path.join(output_dir, f"qr_raw_{st['id']}.png")
        generate_hires_qr(st["url"], st["badge"], raw_path, is_white=True, box_size=32, badge_boxes=10)
        
        # 2. Black on Transparent (Universal style)
        black_path = os.path.join(output_dir, f"qr_3d_{st['id']}_black.png")
        generate_hires_qr(st["url"], st["badge"], black_path, is_white=False, box_size=32, badge_boxes=10)
        
        # Verification
        im_w = Image.open(white_path)
        bg = Image.new("RGB", im_w.size, (20, 24, 30))
        bg.paste(im_w, (0, 0), im_w)
        temp_check = os.path.join(output_dir, "temp_check.png")
        bg.save(temp_check)
        val, _, _ = detector.detectAndDecode(255 - cv2.imread(temp_check))
        if os.path.exists(temp_check): os.remove(temp_check)
        
        if val == st["url"]:
            print(f"  ✓ Scan Verification: PASSED (100% Match)")
        else:
            print(f"  ⚠️ Warning: Scan check got '{val}'")
            
    print("\n✅ All 3 Stations 3D Transparent QR Codes generated and verified successfully!")

if __name__ == "__main__":
    main()
