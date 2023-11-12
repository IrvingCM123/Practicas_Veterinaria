import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  async generatePdf(
    reportTitle: string,
    informacion_Reporte_JSON: any
  ): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const borderX = 28.35; // 1 cm en puntos (1 cm = 28.35 puntos)
    const borderY = 28.35;
    const borderWidth = width - 2 * borderX;
    const borderHeight = height - 2 * borderY;

    const direccion: string =
      'Junto al garaje del Hotel Trueba. Sur. 11 No. 337 Orizaba, Ver.';
    const tel: string = '272-724-2852';
    const cel_1: string = '272-114-6086';
    const cel_2: string = '272-154-7909';

    let resultado = calcularTotalProductosVendidos(informacion_Reporte_JSON);
    let totalSales = calcularTotalVentas(informacion_Reporte_JSON);

    page.drawRectangle({
      x: borderX,
      y: borderY,
      width: borderWidth,
      height: borderHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    const Nombre_Negocio = 'Como Perros y Gatos';
    const Fecha_Reporte_Generado = new Date().toLocaleDateString();

    const commonStyle = {
      font,
      size: 12,
      color: rgb(0, 0, 0),
    };

    // Calcular el ancho de cada texto
    const businessNameWidth = font.widthOfTextAtSize(
      `Veterinaria: ${Nombre_Negocio}`,
      10
    );
    const currentDateWidth = font.widthOfTextAtSize(
      `Fecha: ${Fecha_Reporte_Generado}`,
      10
    );

    const businessNameX = borderX + 2;
    const currentDateX = width - currentDateWidth - borderX - 18;

    page.drawText(`Reporte ${reportTitle}`, {
      x: businessNameX,
      y: height - 60,
      ...commonStyle,
    });

    page.drawText(`Fecha: ${Fecha_Reporte_Generado}`, {
      x: currentDateX,
      y: height - 60,
      ...commonStyle,
    });

    page.drawText(`Veterinaria: ${Nombre_Negocio}`, {
      x: width / 3,
      y: height - 95,
      font,
      size: 14,
      color: rgb(0, 0, 1), // Azul oscuro
    });

    const logoUrl = '../../../assets/Imagenes/logo.png';
    const logoImageBytes = await fetch(logoUrl).then((res) =>
      res.arrayBuffer()
    );
    const logoImage = await pdfDoc.embedPng(logoImageBytes);

    const originalWidth = logoImage.width;
    const originalHeight = logoImage.height;

    const newWidth = 50;
    const newHeight = (originalHeight / originalWidth) * newWidth;

    const logoX =
      (businessNameX + currentDateX + currentDateWidth) / 2 - newWidth / 2;

    page.drawImage(logoImage, {
      x: logoX,
      y: height - 20 - newHeight - 10,
      width: newWidth,
      height: newHeight,
    });

    page.drawText(`Ventas realizadas en el mes: ${totalSales}`, {
      x: 50,
      y: height - 120,
      font,
      size: 12,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Total de productos vendidos: ${resultado} productos`, {
      x: 50,
      y: height - 130,
      font,
      size: 12,
      color: rgb(0, 0, 0),
    });

    let currentPositionY = height - 150;

    informacion_Reporte_JSON.forEach((jsonObject: any) => {
      // Fecha de Venta
      page.drawText(`Fecha de Venta: ${jsonObject.fecha_venta}`, {
        x: 50,
        y: currentPositionY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      });

      currentPositionY -= 20;

      // Vendedor
      page.drawText(`Vendedor: ${jsonObject.vendedor.acronimo}`, {
        x: 50,
        y: currentPositionY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      });

      currentPositionY -= 20;

      // Total Venta
      page.drawText(`Total Venta: ${jsonObject.total_venta}`, {
        x: 50,
        y: currentPositionY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      });

      currentPositionY -= 30; // Espacio entre las ventas

      // Agregar más campos según sea necesario...
    });

    const contactInfo = `${direccion} | Tel: ${tel} | Cel: ${cel_1} | Cel: ${cel_2}`;

    page.drawText(contactInfo, {
      x: borderX,
      y: borderY,
      font,
      size: 10,
      color: rgb(0, 0, 0),
    });

    return pdfDoc.save();
  }
}

export function calcularTotalProductosVendidos(Informacion_JSON: any[] | any) {
  let total = 0;
  let cantidad = 0;
  Informacion_JSON.forEach((jsonObject: any) => {
    for (let i = 0; i < jsonObject.detallesVenta.length; i++) {
      cantidad += jsonObject.detallesVenta[i].id_producto.length;
    }
    total = cantidad;
  });
  return total;
}

export function calcularTotalVentas(Informacion_JSON: any[] | any) {
  let totalSales = 0;
  Informacion_JSON.forEach((jsonObject: { total_venta: any }) => {
    jsonObject.total_venta = +jsonObject.total_venta;
    totalSales += jsonObject.total_venta;
  });
  return totalSales;
}
