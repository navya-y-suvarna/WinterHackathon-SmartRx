from PIL import Image
from collections import Counter

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

try:
    img = Image.open('/home/navya/.gemini/antigravity/brain/48ca4253-6104-4b81-9268-bb1f983cedcd/uploaded_image_1768243705024.png')
    # Analyze dominant colors again to get the exact values for the big circles
    pixels = list(img.getdata())
    counts = Counter(pixels)
    common = counts.most_common(20)
    
    print("Dominant Colors found:")
    for color, count in common:
        print(f"{rgb_to_hex(color[:3])} (Count: {count})")
        
except Exception as e:
    print(f"Error: {e}")
