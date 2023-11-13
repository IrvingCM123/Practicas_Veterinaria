import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root',
})
export class ReporteadorPDFService {
  async generarReporte(
    reportTitle: string,
    informacion_Reporte_JSON: any
  ): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
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
    const contactInfo = `${direccion} | Tel: ${tel} | Cel: ${cel_1} | Cel: ${cel_2}`;

    let total_Ventas_Mes = calcularTotalVentasPorMes(informacion_Reporte_JSON);
    let total_Productos_Vendidos = calcularTotalProductosVendidos(
      informacion_Reporte_JSON
    );
    let total_VentasTotales = calcularTotalVentas(informacion_Reporte_JSON);

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

    const TitulosStyle = {
      font,
      size: 13,
      color: rgb(1, 0, 0),
    };

    const ProductosStyle = {
      font,
      size: 12,
      color: rgb(0, 0, 1),
    };

    const businessNameWidth = font.widthOfTextAtSize(
      `Veterinaria: ${Nombre_Negocio}`,
      10
    );
    const currentDateWidth = font.widthOfTextAtSize(
      `Fecha: ${Fecha_Reporte_Generado}`,
      10
    );

    const businessNameX = borderX + 10;
    const currentDateX = width - currentDateWidth - borderX - 26;

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
      color: rgb(0, 0, 1),
    });

    const logoUrl = '/assets/Imagenes/logo.png';
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

    page.drawText('Ventas realizadas en el mes:', {
      x: 50,
      y: height - 120,
      ...TitulosStyle,
    });

    page.drawText(`${total_Ventas_Mes}`, {
      x: 208,
      y: height - 120,
      ...commonStyle,
    });

    const currentTotalWidth = font.widthOfTextAtSize(
      `Productos: ${total_Productos_Vendidos}`,
      10
    );

    const currentVenta = borderX + 21;
    const currentProductoX = width - currentTotalWidth - borderX - 190;

    page.drawText(`Total de ventas en el mes: `, {
      x: currentVenta,
      y: height - 145,
      ...TitulosStyle,
    });

    page.drawText(`$${total_VentasTotales}`, {
      x: 190,
      y: height - 145,
      ...commonStyle,
    });

    page.drawText(`Total de productos vendidos:`, {
      x: currentProductoX,
      y: height - 145,
      ...TitulosStyle,
    });

    page.drawText(`${total_Productos_Vendidos} productos`, {
      x: currentProductoX + 152,
      y: height - 145,
      ...commonStyle,
    });

    page.drawLine({
      start: { x: borderX + 27, y: height - 158 },
      end: { x: width - borderX - 27, y: height - 158 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    let currentPositionY = height - 180;

    informacion_Reporte_JSON.forEach((jsonObject: any) => {
      currentPositionY -= 20;
      if (currentPositionY < borderY || currentPositionY == borderY) {
        page.drawText(contactInfo, {
          x: borderX,
          y: borderY - 14,
          font,
          size: 11,
          color: rgb(0, 0, 0),
        });
        page = pdfDoc.addPage();
        currentPositionY = height - 60;
        page.drawRectangle({
          x: borderX,
          y: borderY,
          width: borderWidth,
          height: borderHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
      }

      if (currentPositionY < 200) {
        page.drawText(contactInfo, {
          x: borderX,
          y: borderY - 14,
          font,
          size: 11,
          color: rgb(0, 0, 0),
        });
        page = pdfDoc.addPage();
        currentPositionY = height - 60;
        page.drawRectangle({
          x: borderX,
          y: borderY,
          width: borderWidth,
          height: borderHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
      }

      page.drawText(`Fecha de Venta: ${jsonObject.fecha_venta}`, {
        x: 50,
        y: currentPositionY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Total Venta: $${jsonObject.total_venta}`, {
        x: width / 3,
        y: currentPositionY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Vendedor: ${jsonObject.vendedor.acronimo}`, {
        x: width / 2 + 30,
        y: currentPositionY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      });

      currentPositionY -= 20;

      jsonObject.detallesVenta.forEach((detalleVenta: any) => {
        currentPositionY -= 10;

        let productos = detalleVenta.id_producto[0];
        page.drawText(` * Producto: `, {
          x: 50,
          y: currentPositionY,
          ...ProductosStyle,
        });

        if (productos?.nombre) {
          page.drawText(`${productos.nombre}`, {
            x: 120,
            y: currentPositionY,
            ...commonStyle,
          });
        } else {
          page.drawText(`Producto eliminado`, {
            x: 120,
            y: currentPositionY,
            ...commonStyle,
          });
        }

        currentPositionY -= 25;

        page.drawText(`* Precio de venta: `, {
          x: 53,
          y: currentPositionY,
          ...ProductosStyle,
        });

        if (productos?.precio) {
          page.drawText(`$${productos.precio}`, {
            x: 150,
            y: currentPositionY,
            ...commonStyle,
          });
        } else {
          page.drawText(`eliminado`, {
            x: 145,
            y: currentPositionY,
            ...commonStyle,
          });
        }

        page.drawText(`* Cantidad: `, {
          x: width / 3,
          y: currentPositionY,
          ...ProductosStyle,
        });

        if (detalleVenta?.cantidad_vendida) {
          page.drawText(`${detalleVenta.cantidad_vendida}`, {
            x: width / 3 + 70,
            y: currentPositionY,
            ...commonStyle,
          });
        } else {
          page.drawText(`eliminado`, {
            x: 170,
            y: currentPositionY,
            ...commonStyle,
          });
        }

        page.drawText(`* Subtotal: `, {
          x: width / 2 + 30,
          y: currentPositionY,
          ...ProductosStyle,
        });

        if (detalleVenta?.subtotal) {
          page.drawText(`$${detalleVenta.subtotal}`, {
            x: width / 2 + 100,
            y: currentPositionY,
            ...commonStyle,
          });
        } else {
          page.drawText(`eliminado`, {
            x: 120,
            y: currentPositionY,
            ...commonStyle,
          });
        }

        currentPositionY -= 25;

        page.drawText(`* Descripcion:`, {
          x: 53,
          y: currentPositionY,
          ...ProductosStyle,
        });

        if (productos?.descripcion) {
          page.drawText(`${productos.descripcion}`, {
            x: 130,
            y: currentPositionY,
            ...commonStyle,
          });
        } else {
          page.drawText(`eliminado`, {
            x: 130,
            y: currentPositionY,
            ...commonStyle,
          });
        }

        currentPositionY -= 20;
      });

      if (currentPositionY > borderY) {
        page.drawLine({
          start: { x: borderX + 21, y: currentPositionY },
          end: { x: width - borderX - 400, y: currentPositionY },
          thickness: 1,
          color: rgb(0, 0, 0),
        });
      }
    });

    page.drawText(contactInfo, {
      x: borderX,
      y: borderY - 14,
      font,
      size: 11,
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
  totalSales = +totalSales.toFixed(2);
  return totalSales;
}

export function calcularTotalVentasPorMes(Informacion_JSON: any[] | any) {
  let totalVentas = 0;
  totalVentas = Informacion_JSON.length;
  return totalVentas;
}
