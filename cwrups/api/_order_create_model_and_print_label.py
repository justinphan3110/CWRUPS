import os
import platform
from tempfile import gettempdir

import barcode
from barcode.writer import ImageWriter
from PIL import Image, ImageWin
from rest_framework import status
from rest_framework.response import Response
from rest_framework.settings import api_settings

PRINTER_NAME = "Brother QL-700"


def print_image(image_file):
    import win32ui

    HORZRES = 8
    VERTRES = 10
    PHYSICALWIDTH = 110
    PHYSICALHEIGHT = 111
    hDC = win32ui.CreateDC()
    try:
        hDC.CreatePrinterDC (PRINTER_NAME)
    except win32ui.error:
        print("Could not connect to printer '{0}'!".format(PRINTER_NAME))
    else:
        printable_area = hDC.GetDeviceCaps(HORZRES), hDC.GetDeviceCaps(VERTRES)
        printer_size = hDC.GetDeviceCaps(PHYSICALWIDTH), hDC.GetDeviceCaps(PHYSICALHEIGHT)
        bmp = Image.open (image_file)
        ratios = [1.0 * printable_area[0] / bmp.size[0], 1.0 * printable_area[1] / bmp.size[1]]
        scale = min(ratios)
        hDC.StartDoc(image_file)
        hDC.StartPage()
        dib = ImageWin.Dib(bmp)
        scaled_width, scaled_height = [int (scale * i) for i in bmp.size]
        x1 = int ((printer_size[0] - scaled_width) / 2)
        y1 = int ((printer_size[1] - scaled_height) / 2)
        x2 = x1 + scaled_width
        y2 = y1 + scaled_height
        dib.draw(hDC.GetHandleOutput (), (x1, y1, x2, y2))
        hDC.EndPage()
        hDC.EndDoc()
        hDC.DeleteDC()


def print_barcode(order_id):
    order_id_padded = f'{order_id:012}'
    ean_class_ref = barcode.get_barcode_class('ean13')
    ean_ins = ean_class_ref(order_id_padded, writer=ImageWriter())
    barcode_file = os.path.join(gettempdir(), order_id_padded)
    ean_ins.save(barcode_file, options={"write_text": False})
    barcode_file += ".png"

    print_image(barcode_file)
    os.remove(barcode_file)


class OrderCreateModelAndPrintLabelMixin:
    """Create a model instance and print the associated order label."""

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        if platform.system() == "Windows":
            print_barcode(serializer.data['order_id'])

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}
