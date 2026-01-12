from PIL import Image
from collections import Counter

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

try:
    img = Image.open('/home/navya/.gemini/antigravity/brain/48ca4253-6104-4b81-9268-bb1f983cedcd/uploaded_image_1768242961962.png')
    img = img.resize((50, 50))  # Resize to speed up
    pixels = list(img.getdata())
    # remove transparent pixels if any
    pixels = [p[:3] for p in pixels if len(p) == 3 or p[3] > 0]
    
    # Get most common colors
    counts = Counter(pixels)
    common = counts.most_common(5)
    
    print("Dominant Colors:")
    for color, count in common:
        print(f"{rgb_to_hex(color)} (Count: {count})")

except Exception as e:
    print(f"Error: {e}")
