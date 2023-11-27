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
    const font = await pdfDoc.embedFont(StandardFonts.Courier);

    const borderX = 28.35; // 1 cm en puntos (1 cm = 28.35 puntos)
    const borderY = 28.35;
    const borderWidth = width - 2 * borderX;
    const borderHeight = height - 2 * borderY;

    const direccion: string =
      'Junto al garaje del Hotel Trueba. Sur. 11 No. 337 Orizaba, Ver.';
    const tel: string = '272-724-2852';
    const cel_1: string = '272-114-6086';
    const cel_2: string = '272-154-7909';
    const contactInfo = `${direccion} | Tel: ${tel} | Cel: ${cel_1} `;

    let total_Ventas_Mes = calcularTotalVentasPorMes(informacion_Reporte_JSON);
    let total_Productos_Vendidos = calcularTotalProductosVendidos(
      informacion_Reporte_JSON
    );
    let total_VentasTotales = calcularTotalVentas(informacion_Reporte_JSON);
    let pageNumber = 1;

    page.drawRectangle({
      x: borderX,
      y: borderY,
      width: borderWidth,
      height: borderHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    page.drawText('Página: ' + pageNumber, {
      x: width/2 + 190,
      y: borderY + 4,
      font,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const Nombre_Negocio = 'Como Perros y Gatos';
    const Fecha_Reporte_Generado = new Date().toLocaleDateString();

    const commonStyle = {
      font,
      size: 11,
      color: rgb(1 / 255, 1 / 255, 1 / 255),
    };

    const TitulosStyle = {
      font,
      size: 12,
      color: rgb(5 / 255, 102 / 255, 141 / 255),
    };

    const ProductosStyle = {
      font,
      size: 12,
      color: rgb(0 / 255, 41 / 255, 107 / 255),
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
      x: width / 3 - 50,
      y: height - 95,
      font,
      size: 14,
      color: rgb(0 / 255, 41 / 255, 107 / 255),
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

    page.drawText('Ventas realizadas:', {
      x: 50,
      y: height - 120,
      ...TitulosStyle,
    });

    page.drawText(`${total_Ventas_Mes}`, {
      x: 185,
      y: height - 120,
      ...commonStyle,
    });

    const currentTotalWidth = font.widthOfTextAtSize(
      `Productos: ${total_Productos_Vendidos}`,
      10
    );

    const currentVenta = borderX + 21;
    const currentProductoX = width - currentTotalWidth - borderX - 190;

    page.drawText(`Total de ventas: `, {
      x: currentVenta,
      y: height - 145,
      ...TitulosStyle,
    });

    page.drawText(`$${total_VentasTotales}`, {
      x: 170,
      y: height - 145,
      ...commonStyle,
    });

    page.drawText(`Productos vendidos:`, {
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

    let currentPositionY = height - 170;

    informacion_Reporte_JSON.forEach((jsonObject: any) => {
      currentPositionY -= 15;
      if (currentPositionY < borderY || currentPositionY == borderY) {
        page.drawText(contactInfo, {
          x: borderX - 10,
          y: borderY - 14,
          font,
          size: 9,
          color: rgb(0, 0, 0),
        });
        page = pdfDoc.addPage();
        pageNumber += 1;

        currentPositionY = height;
        page.drawRectangle({
          x: borderX,
          y: borderY,
          width: borderWidth,
          height: borderHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });

        page.drawText('Página: ' + pageNumber, {
          x: width/2 + 190,
          y: borderY + 4,
          font,
          size: 12,
          color: rgb(0, 0, 0),
        });
      }

      if (currentPositionY < 200) {
        pageNumber += 1;
        page.drawText(contactInfo, {
          x: borderX - 10,
          y: borderY - 14,
          font,
          size: 9,
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
        page.drawText('Página: ' + pageNumber, {
          x: width/2 + 190,
          y: borderY + 4,
          font,
          size: 12,
          color: rgb(0, 0, 0),
        });
      }

      currentPositionY -= 10;

      page.drawText(`Folio:`, {
        x: 50,
        y: currentPositionY,
        ...ProductosStyle,
      });

      page.drawText(`${jsonObject.id_venta}`, {
        x: 100,
        y: currentPositionY,
        ...commonStyle,
      });

      page.drawText(`Fecha: `, {
        x: 142,
        y: currentPositionY,
        ...ProductosStyle,
      });

      page.drawText(`${jsonObject.fecha_venta}`, {
        x: 200,
        y: currentPositionY,
        ...commonStyle,
      });

      page.drawText(`Total: `, {
        x: width / 3 + 95,
        y: currentPositionY,
        ...ProductosStyle,
      });

      page.drawText(`$${jsonObject.total_venta}`, {
        x: width / 3 + 140,
        y: currentPositionY,
        ...commonStyle,
      });

      page.drawText(`Vendedor:  `, {
        x: width / 2 + 105,
        y: currentPositionY,
        ...ProductosStyle,
      });

      page.drawText(`${jsonObject.vendedor.acronimo}`, {
        x: width / 2 + 180,
        y: currentPositionY,
        ...commonStyle,
      });

      currentPositionY -= 30;

      page.drawText(`Producto(s): `, {
        x: 50,
        y: currentPositionY,
        ...ProductosStyle,
      });

      page.drawText(`Precio: `, {
        x: 210,
        y: currentPositionY,
        ...ProductosStyle,
      });

      page.drawText(`Cantidad: `, {
        x: width / 3 + 80,
        y: currentPositionY,
        ...ProductosStyle,
      });

      page.drawText(`Subtotal: `, {
        x: width / 2 + 60,
        y: currentPositionY,
        ...ProductosStyle,
      });

      page.drawText(`Tipo: `, {
        x: width / 2 + 140,
        y: currentPositionY,
        ...ProductosStyle,
      });

      currentPositionY -= 10;

      jsonObject.detallesVenta.forEach((detalleVenta: any) => {
        currentPositionY -= 10;

        let productos = detalleVenta.id_producto[0];

        if (productos?.nombre) {
          if (productos.nombre.length > 30) {
            const truncatedText = truncateText(productos.nombre, 30);

            for (let i = 0; i < truncatedText.length; i++) {
              currentPositionY -= 5;
              if (i === 0) {
                page.drawText(`${truncatedText[i]}`, {
                  x: 50,
                  y: currentPositionY,
                  ...commonStyle,
                });
                currentPositionY -= 5;
              } else {
                page.drawText(`${truncatedText[i]}`, {
                  x: 50,
                  y: currentPositionY - 10,
                  ...commonStyle,
                });

                currentPositionY -= 5;
              }
            }
          } else {
            page.drawText(`${productos.nombre}`, {
              x: 50,
              y: currentPositionY,
              ...commonStyle,
            });
          }
        } else {
          page.drawText(`Producto eliminado`, {
            x: 50,
            y: currentPositionY,
            ...commonStyle,
          });
        }

        if (detalleVenta?.venta_granel == true) {
          page.drawText(`(Venta a granel)`, {
            x: width / 2 + 140,
            y: currentPositionY,
            ...TitulosStyle,
          });
        } else {
          page.drawText(`(Venta por unidad)`, {
            x: width / 2 + 140,
            y: currentPositionY,
            ...TitulosStyle,
          });
        }

        if (productos?.precio) {
          if (detalleVenta?.venta_granel == true) {
            page.drawText(`$${productos.precio_granel}`, {
              x: 210,
              y: currentPositionY,
              ...commonStyle,
            });
          } else {
            page.drawText(`$${productos.precio}`, {
              x: 210,
              y: currentPositionY,
              ...commonStyle,
            });
          }
        } else {
          page.drawText(`eliminado`, {
            x: 210,
            y: currentPositionY,
            ...commonStyle,
          });
        }

        if (detalleVenta?.cantidad_vendida) {
          page.drawText(`${detalleVenta.cantidad_vendida}`, {
            x: width / 3 + 80,
            y: currentPositionY,
            ...commonStyle,
          });
        } else {
          page.drawText(`eliminado`, {
            x: width / 3 + 80,
            y: currentPositionY,
            ...commonStyle,
          });
        }

        if (detalleVenta?.subtotal) {
          page.drawText(`$${detalleVenta.subtotal}`, {
            x: width / 2 + 60,
            y: currentPositionY,
            ...commonStyle,
          });
        } else {
          page.drawText(`eliminado`, {
            x: width / 2 + 70,
            y: currentPositionY,
            ...commonStyle,
          });
        }

        currentPositionY -= 10;

        //page.drawText(`Descripcion:`, {
        //  x: 93,
        //  y: currentPositionY,
        //  ...ProductosStyle,
        //});
        //
        //if (productos?.descripcion) {
        //  if (productos.descripcion.length > 77) {
        //    const truncatedText = truncateText(productos.descripcion, 77);
        //
        //    for (let i = 0; i < truncatedText.length; i++) {
        //      if (i === 0) {
        //        page.drawText(`${truncatedText[i]}`, {
        //          x: 170,
        //          y: currentPositionY,
        //          ...commonStyle,
        //        });
        //      } else {
        //        page.drawText(`${truncatedText[i]}`, {
        //          x: 170,
        //          y: currentPositionY - 20,
        //          ...commonStyle,
        //        });
        //
        //        currentPositionY -= 20;
        //      }
        //    }
        //  } else {
        //    page.drawText(`${productos.descripcion}`, {
        //      x: 170,
        //      y: currentPositionY,
        //      ...commonStyle,
        //    });
        //  }
        //} else {
        //  page.drawText(`eliminado`, {
        //    x: 170,
        //    y: currentPositionY,
        //    ...commonStyle,
        //  });
        //}
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
      x: borderX - 10,
      y: borderY - 14,
      font,
      size: 9,
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

export function truncateText(text: string, maxLength: number): string[] {
  const result: string[] = [];

  const words = text.split(' ');
  let truncatedText = '';

  for (const word of words) {
    if ((truncatedText + word).length <= maxLength) {
      truncatedText += word + ' ';
    } else {
      result.push(truncatedText.trim());
      truncatedText = word + ' ';
    }
  }

  if (truncatedText.trim() !== '') {
    result.push(truncatedText.trim());
  }

  return result;
}
