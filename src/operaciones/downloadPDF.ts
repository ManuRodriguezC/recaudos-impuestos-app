import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function downloadPDF() {
    const doc = new jsPDF();

    doc.addImage("tunja.png", "JPEG", 10, 10, 25, 25)

    doc.setFontSize(18)
    doc.text("PLANILLA GENERAL DE", 68, 30)
    doc.text("CONTROL RECAUDO DIARIO", 60, 37)
    doc.text("DE IMPUESTOS MUNICIPALES", 58, 44)
    
    doc.setFontSize(10)
    autoTable(doc, {
        body: [
            ['ENTIDAD RECAUDADORA']
        ],
        styles: {
            halign: "center",
            valign: "middle",
            lineWidth:  0.6,
        },
        columnStyles: {
            0: {minCellHeight: 10, textColor: "#000000"}
        },
        startY: 60,
        theme: "grid"
    })

    autoTable(doc, {
        body: [
          ['NOMBRE', 'COOVITEL', 'CODIGO', '37']
        ],
        styles: {
          fontSize:  10,
          cellPadding:  1,
          overflow: 'linebreak',
          lineWidth:  0.6,
          textColor: "#000000"
        },
        columnStyles: {
            0: { cellWidth: 35, textColor: "#000000" },
            1: { cellWidth: 54.2, halign: "center" },
            2: { cellWidth: 35, textColor: "#000000" },
            3: { halign: "center"}

          },
        startY: 70,
        theme: "grid",
    })

    autoTable(doc, {
        body: [
          ['OFICINA, AGENCIA O SUCURSAL']
        ],
        styles: {
            halign: "center",
            valign: "middle",
            lineWidth:  0.6,
            textColor: "#000000"
        },
        columnStyles: {
            0: {minCellHeight: 10, textColor: "#000000"}
        },
        startY: 76,
        theme: "grid",
    })

    autoTable(doc, {
        body: [
          ['NOMBRE', 'COOVITEL TUNJA', 'CODIGO', '37']
        ],
        styles: {
          fontSize:  10,
          cellPadding:  1,
          overflow: 'linebreak',
          lineWidth:  0.6,
          textColor: "#000000"
        },
        columnStyles: {
            0: { cellWidth: 35, textColor: "#000000" },
            1: { cellWidth: 54.2, halign: "center" },
            2: { cellWidth: 35, textColor: "#000000" },
            3: { halign: "center"}
          },
        startY: 86,
        theme: "grid",
    })

    autoTable(doc, {
        body: [
            ['CORREO ELECTRONICO', 'tunjacoovitel@coovitel.coop']
        ],
        styles: {
            halign: "center",
            valign: "middle",
            lineWidth:  0.6,
            textColor: "#000000"
        },
        columnStyles: {
            0: {textColor: "#000000"}
        },
        startY: 92,
        theme: "grid"
    })

    autoTable(doc, {
        body: [
            ['NUMERO DE CUENTA BANCARIA', '**************']
        ],
        columnStyles: {
            0: {minCellHeight: 10, textColor: "#000000", cellWidth: 89.2, valign: "middle"},
            1: {minCellHeight: 10, halign: "center", valign: "middle"}
        },
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        startY: 98,
        theme: "grid"
    })

    autoTable(doc, {
        body: [
            ['DD/MM/AAAA']
        ],
        columnStyles: {
            0: {textColor: "#000000", halign: "right"}
        },
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        startY: 108,
        theme: "grid"
    })

    autoTable(doc, {
        body: [
            ['', '', 'FECHA DE RECAUDO', '15/02/2024'],
            ['NUMERO DE FORMULARIOS', '12', 'FECHA DE ENTREGA', '16/02/2024']
        ],
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        columnStyles: {
            0: {cellWidth: 55, textColor: "#000000", halign: "center", valign: "middle"},
            1: {cellWidth: 34.2, textColor: "#000000", halign: "center", valign: "middle"},
            2: {cellWidth: 50, textColor: "#000000", halign: "center", valign: "middle"},
            3: {textColor: "#000000", halign: "center", valign: "middle"}
        },
        startY: 115.5,
        theme: "grid"
    })

    autoTable(doc, {
        body: [
            ['']
        ],
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        theme: "grid",
        startY: 130
    })

    autoTable(doc, {
        body: [
            ['RELACIÓN DE PAQUETES ENTREGADOS']
        ],
        columnStyles: {
            0: {textColor: "#000000"}
        },
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        theme: "grid",
        startY: 135
    })

    autoTable(doc, {
        body: [
            ['']
        ],
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        theme: "grid",
        startY: 142
    })

    autoTable(doc, {
        body: [
            ['PAQUETE', 'Cant. De Documentos', ''],
        ],
        columnStyles: {
            0: {halign: "center", textColor: "#000000", cellWidth: 34.2},
            1: {halign: "center", textColor: "#000000", cellWidth: 55},
            2: {halign: "center", textColor: "#000000", valign: "middle"}
        },
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        theme: "grid",
        startY: 147
    })

    autoTable(doc, {
        body: [
            ['PREDIAL', '12', '$1.112.112'],
            ['ICA', '0', '$0'],
            ['RENTAS VARIAS', '0', '$0'],
            ['RetelCA', '0', '$0']
        ],
        columnStyles: {
            0: {halign: "center", textColor: "#000000", valign: "middle", cellWidth: 34.2, minCellHeight: 12},
            1: {halign: "center", textColor: "#000000", valign: "middle", cellWidth: 55, minCellHeight: 12},
            2: {halign: "center", textColor: "#000000", valign: "middle", minCellHeight: 12},
            3: {halign: "center", textColor: "#000000", valign: "middle", minCellHeight: 12}
        },
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        theme: "grid",
        startY: 154
    })

    autoTable(doc, {
        body: [
            ['Total Docum.', '12', 'Total Recaudado', '$1.112.112']
        ],
        columnStyles: {
            0: {halign: "center", textColor: "#000000", valign: "middle", cellWidth: 34.2, minCellHeight: 12},
            1: {halign: "center", textColor: "#000000", valign: "middle", cellWidth: 55, minCellHeight: 12},
            2: {halign: "center", textColor: "#000000", valign: "middle", cellWidth: 34.2, minCellHeight: 12},
            3: {halign: "center", textColor: "#000000", valign: "middle", minCellHeight: 12},
            
        },
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        theme: "grid",
        startY: 202
    })

    autoTable(doc, {
        body: [
            ['OBSERVACIÓN:']
        ],
        columnStyles: {
            0: {minCellHeight: 18, textColor: "#000000"}
        },
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        startY: 214,
        theme: "grid"
    })

    doc.setFontSize(16)

    autoTable(doc, {
        body: [
            ['NOMBRE DE FUNCIONARIO AUTORIZADO', '*************'],
            ['FIRMA FUNCIONARIO AUTORIZADO', '']
        ],
        columnStyles: {
            0: {cellWidth: 89.2, textColor: "#000000", minCellHeight: 10, valign: "middle"},
            1: {textColor: "#000000", valign: "middle", halign: "center", minCellHeight: 10}
        },
        styles: {
            lineWidth:  0.6,
            textColor: "#000000"
        },
        theme: "grid",
        startY: 232
    })

    doc.setFontSize(8)
    doc.text("(*)ADJUNTO A ESTA PLANILLA DEBE SER ENTREGADO EL MOVIMIENTO DIARIO DE CUENTA", 40, 260)

    doc.save('mi_archivo.pdf');
}