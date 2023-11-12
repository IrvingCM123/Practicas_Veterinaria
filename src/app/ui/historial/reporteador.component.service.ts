import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  async generatePdf(
    reportTitle: string,
    totalSales: number,
    json1: any,
  ): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Calcular límites para el borde
    const borderX = 28.35; // 1 cm en puntos (1 cm = 28.35 puntos)
    const borderY = 28.35;
    const borderWidth = width - 2 * borderX;
    const borderHeight = height - 2 * borderY;

    const direccion: string =
      'Junto al garaje del Hotel Trueba. Sur. 11 No. 337 Orizaba, Ver.';
    const tel: string = '272-724-2852';
    const cel_1: string = '272-114-6086';
    const cel_2: string = '272-154-7909';

    // Agregar borde negro de 1 cm
    page.drawRectangle({
      x: borderX,
      y: borderY,
      width: borderWidth,
      height: borderHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    // Agregar encabezado con el nombre del negocio y la fecha
    const businessName = 'Como Perros y Gatos';
    const currentDate = new Date().toLocaleDateString();

    // Configuración de estilo común
    const commonStyle = {
      font,
      size: 12,
      color: rgb(0, 0, 0),
    };

    // Calcular el ancho de cada texto
    const businessNameWidth = font.widthOfTextAtSize(
      `Veterinaria: ${businessName}`,
      10
    );
    const currentDateWidth = font.widthOfTextAtSize(
      `Fecha: ${currentDate}`,
      10
    );

    // Calcular las posiciones x para alinear los textos en los extremos izquierdo y derecho
    const businessNameX = borderX + 2;
    const currentDateX = width - currentDateWidth - borderX - 18;

    // Dibujar los textos en las posiciones calculadas
    page.drawText(`Reporte ${reportTitle}`, {
      x: businessNameX,
      y: height - 60,
      ...commonStyle,
    });

    page.drawText(`Fecha: ${currentDate}`, {
      x: currentDateX,
      y: height - 60,
      ...commonStyle,
    });

    // Centrar el título en azul
    page.drawText(`Veterinaria: ${businessName}`, {
      x: width / 3,
      y: height - 95,
      font,
      size: 14,
      color: rgb(0, 0, 1), // Azul oscuro
    });

    // Cargar la imagen desde la carpeta assets (asegúrate de tener la imagen en la carpeta assets)
    const logoUrl = '../../../assets/Imagenes/logo.png'; // Reemplaza 'tu-logo.png' con el nombre de tu imagen
    const logoImageBytes = await fetch(logoUrl).then((res) =>
      res.arrayBuffer()
    );
    const logoImage = await pdfDoc.embedPng(logoImageBytes);

    // Obtener las dimensiones originales de la imagen
    const originalWidth = logoImage.width;
    const originalHeight = logoImage.height;

    // Especificar el nuevo tamaño deseado (ajusta según tus necesidades)
    const newWidth = 50; // Ancho en puntos
    const newHeight = (originalHeight / originalWidth) * newWidth; // Mantener la proporción original

    // Calcular la posición x para centrar la imagen entre los textos
    const logoX =
      (businessNameX + currentDateX + currentDateWidth) / 2 - newWidth / 2;

    // Dibujar la imagen en el centro con el nuevo tamaño
    page.drawImage(logoImage, {
      x: logoX,
      y: height - 20 - newHeight - 10, // Ajusta según sea necesario para separar la imagen del texto
      width: newWidth,
      height: newHeight,
    });

    // Agregar total de ventas
    page.drawText(`Total de ventas: ${totalSales}`, {
      x: 50,
      y: height - 110,
      font,
      size: 12,
      color: rgb(0, 0, 0),
    });

    // Definir la posición inicial para el primer objeto
    let currentPositionY = height - 130;

    // Iterar sobre la matriz de objetos JSON
    json1.forEach((jsonObject: { id_venta: any; total_venta: any; }) => {
      // Dibujar la información del objeto JSON
      page.drawText(`ID Venta: ${jsonObject.id_venta}`, {
        x: 50,
        y: currentPositionY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Total Venta: ${jsonObject.total_venta}`, {
        x: 200, // Ajusta la posición x según sea necesario
        y: currentPositionY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      });

      // Agregar más campos según sea necesario...

      // Ajustar la posición Y para el siguiente objeto
      currentPositionY -= 30; // Puedes ajustar este valor según sea necesario
    });

    //// Agregar JSON 2
    //page.drawText(`JSON 2: ${JSON.stringify(json2)}`, {
    //  x: 50,
    //  y: height - 160,
    //  font,
    //  size: 12,
    //  color: rgb(0, 0, 0),
    //});

    // Agregar pie de página con información de contacto
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
