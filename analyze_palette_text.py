from PIL import Image
import pytesseract

try:
    img_path = '/home/navya/.gemini/antigravity/brain/48ca4253-6104-4b81-9268-bb1f983cedcd/uploaded_image_1768243705024.png'
    img = Image.open(img_path)
    
    # OCR to read the hex codes directly
    text = pytesseract.image_to_string(img)
    print("OCR Result:")
    print(text)
    
    # Also sample colors just in case
    # Let's sample the centers of the circles if we can guess coordinates, but OCR is safer for the text labels
    
except Exception as e:
    print(f"Error: {e}")
