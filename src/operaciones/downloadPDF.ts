import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ValueObject {
    value: number;
    count: number;
}

interface values {
    count: number,
    value: string,
    date: string,
    values: Values
}

interface Values {
    [key: string]: ValueObject;
}

function changeValue(value: string) {
    const numValue = parseInt(value,  10);
    const pesosFormat = numValue.toLocaleString('es-CL');
    return pesosFormat;
}

export default function downloadPDF({count, value, date, values}: values) {
    let curDate = new Date(date)

    let impuestosValue = values["0577099980097520001"] ? values["0577099980097520001"]["value"].toString().slice(0, -2) : "0"
    let impuestosCount = values["0577099980097520001"] ? values["0577099980097520001"]["count"] : "0"
    let rentaValue = values["0577099984352850001"] ? values["0577099984352850001"]["value"].toString().slice(0, -2) : "0"
    let rentaCount = values["0577099984352850001"] ? values["0577099984352850001"]["count"] : "0"


    let nextDay = new Date(date);
    nextDay.setDate(curDate.getDate() +  1);

    if (nextDay.getDay() === 5) {
        nextDay.setDate(curDate.getDate() + 3)
    }
    if (nextDay.getDay() === 6) {
        nextDay.setDate(curDate.getDate() + 2)
    }

    let formattedNextDay = nextDay.toISOString().split('T')[0];
    const doc = new jsPDF();

    doc.addImage("/recaudosapp/tunja.png", "PNG", 10, 10, 25, 25)

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
          ['NOMBRE', 'COOVITEL', 'CODIGO', '66']
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
            ['CORREO ELECTRONICO', 'calidadyservicio@coovitel.coop']
        ],
        styles: {
            halign: "center",
            valign: "middle",
            lineWidth:  0.6,
            textColor: "#000000"
        },
        columnStyles: {
            0: {textColor: "#000000", cellWidth: 89.2}
        },
        startY: 92,
        theme: "grid"
    })

    autoTable(doc, {
        body: [
            ['NUMERO DE CUENTA BANCARIA', '0037000003823 (Interna****3570)']
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
            ['', '', 'FECHA DE RECAUDO', `${date}`],
            ['NUMERO DE FORMULARIOS', `${count}`, 'FECHA DE ENTREGA', `${formattedNextDay}`]
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
            ['PREDIAL', `${changeValue(String(impuestosCount))}`, `$ ${changeValue(String(impuestosValue))}`],
            ['ICA', '0', '$ 0'],
            ['RENTAS VARIAS', `${changeValue(String(rentaCount))}`, `$ ${changeValue(String(rentaValue))}`],
            ['RetelCA', '0', '$ 0']
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
            ['Total Docum.', `${count}`, 'Total Recaudado', `$ ${changeValue(value.toString().slice(0, -2))}`]
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
            ['NOMBRE DE FUNCIONARIO AUTORIZADO', 'IRMA ROCIO CABANZO'],
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

    doc.save(`recaudos ${date}.pdf`);
}