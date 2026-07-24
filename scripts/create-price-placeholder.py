from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "price.pdf"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

pdfmetrics.registerFont(TTFont("DejaVu", FONT))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", FONT_BOLD))

page_width, page_height = A4
pdf = canvas.Canvas(str(OUTPUT), pagesize=A4)
pdf.setTitle("Прайс-лист m-print.by")
pdf.setAuthor("m-print.by")

pdf.setFillColor(HexColor("#23262B"))
pdf.rect(0, 0, page_width, page_height, fill=1, stroke=0)

pdf.setFillColor(HexColor("#FFD200"))
pdf.roundRect(54, page_height - 122, 52, 52, 14, fill=1, stroke=0)
pdf.setFillColor(HexColor("#14161A"))
pdf.setFont("DejaVu-Bold", 30)
pdf.drawCentredString(80, page_height - 107, "m")

pdf.setFillColor(HexColor("#FFFFFF"))
pdf.setFont("DejaVu-Bold", 28)
pdf.drawString(124, page_height - 96, "m-print.by")

pdf.setFillColor(HexColor("#FFD200"))
pdf.setFont("DejaVu-Bold", 15)
pdf.drawString(54, page_height - 190, "ПРАЙС-ЛИСТ")

pdf.setFillColor(HexColor("#FFFFFF"))
pdf.setFont("DejaVu-Bold", 34)
pdf.drawString(54, page_height - 238, "Цены на услуги печати")

pdf.setFillColor(HexColor("#D8DBE0"))
pdf.setFont("DejaVu", 14)
pdf.drawString(54, page_height - 276, "Здесь будет размещена актуальная версия полного прайс-листа.")
pdf.drawString(54, page_height - 302, "Перед публикацией замените этот файл, сохранив имя price.pdf.")

pdf.setStrokeColor(HexColor("#4A4E55"))
pdf.line(54, 150, page_width - 54, 150)
pdf.setFillColor(HexColor("#FFFFFF"))
pdf.setFont("DejaVu-Bold", 12)
pdf.drawString(54, 116, "+375 (00) 000-00-00")
pdf.setFont("DejaVu", 12)
pdf.drawRightString(page_width - 54, 116, "info@m-print.by")
pdf.setFillColor(HexColor("#9AA1AB"))
pdf.drawString(54, 88, "Минск, ул. Вязынская, 2")

pdf.save()
