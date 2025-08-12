from paddleocr import PaddleOCR
from manga_ocr import MangaOcr
import numpy as np
from PIL import Image

img = Image.open("F:/Kushal's Project/MangaLens/backend/test_data/test2.jpg")
mocr = MangaOcr()

ocr = PaddleOCR(
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False)


result = ocr.predict(input="F:/Kushal's Project/MangaLens/backend/test_data/test2.jpg")


for res in result:
    res.save_to_img("F:/Kushal's Project/MangaLens/backend/output")
    with np.printoptions(threshold=np.inf, suppress=True):
        print(res['dt_polys'])

index = len(result[0]['dt_polys'])
array = result[0]['dt_polys'][index-1]

temp_x1, temp_y1 = array[0][0], array[0][1]
temp_x3, temp_y3 = array[2][0], array[2][1]
dialogue_box_text = ""

# Using coordinates of the outlined boxed with text present to crop that portion and extract the text more precisely
for arr in reversed(result[0]['dt_polys']):
    
    #coordinates of the outlined box
    x1, y1 = arr[0][0], arr[0][1] 
    x2, y2 = arr[1][0], arr[1][1]
    x3, y3 = arr[2][0], arr[2][1] 
    x4, y4 = arr[3][0], arr[3][1]


    cropbox = (x1,y1,x3,y3)
    crop_img = img.crop(cropbox)

    text = mocr(crop_img)
    crop_img.save(f"F:/Kushal's Project/MangaLens/backend/output/cropped{index}.jpg")

    if abs(temp_x1 - x2) <=10:
        dialogue_box_text = text + dialogue_box_text
    
    else:
        print("Dialogue Box: ")
        print(dialogue_box_text)
        dialogue_box_text = text
    
    temp_x1, temp_y1, temp_x3, temp_y3 = x1, y1, x3, y3
    index -= 1

print(dialogue_box_text)
# print(dict)