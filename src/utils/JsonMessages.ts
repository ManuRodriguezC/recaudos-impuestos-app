interface JsonMessage {
  codeIAC: string,
  expirationDate: string,
  agreementCode: string,
  reference1: string,
  invoiceAmount: string,
}
export function setValuePay(value: string) {
  // Asegurar que trabajamos con string
  let strValue = String(value);

  // Quitar ceros a la izquierda
  strValue = strValue.replace(/^0+/, "");

  // Si queda vacío, asignar "0"
  if (strValue === "") {
    strValue = "0";
  }

  // Convertir a número y formatear con dos decimales
  return Number(strValue).toFixed(2).toString();
}

function formatDateToString(): string {
	const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

function formatTimeToString(): string {
	const today = new Date();
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  return `${hours}${minutes}${seconds}`;
}

export function checkMessage(date: string, convenio: string, valuePay: string, factura: string) {
  return {
		"checkReference": { 
			"rq": {
				"channelId": "00",
				"bankId": "66",
				"codeIAC": convenio,
				"expirationDate": date,
				"scheduleType": "0",
				"agreementCode": "0037000003823",
				"reference1": factura,
				"reference2": "", 
				"terminalId": "0",
				"currencyCode": "COP", 
				"invoiceAmount": setValuePay(valuePay), 
				"payValue": setValuePay(valuePay), 
				"genericTag1": "", 
				"genericTag2": "", 
				"genericTag3": ""
				}
			}
		}
}

export function notifyReferences(date: string, convenio: string,  valuePay: string, factura: string, numCheque: string, valueCash: string = "0.00", valueCheck: string = "0.00", valueOther: string = "0.00" ) {
	return {
		"notifyReference": {
			"rq": {
				"channelId": "00",
				"bankId": "66",
				"authorizationCode": "1234",
				"codeIAC": convenio,
				"authorizationDate": formatDateToString(),
				"expirationDate": date,
				"paymentMethod": "01",
				"authorizationTime": formatTimeToString(),
				"scheduleType": "0",
				"checkNumber": numCheque,
				"officeCode": "123",
				"agreementCode": "0037000003823",
				"reference1": factura,
				"reference2": "",
				"terminalId": "0",
				"typeExchange": "0",
				"currencyCode": "COP",
				"payCheckAmount": setValuePay(valueCheck),
				"cashAmount": setValuePay(valueCash),
				"invoiceAmount": setValuePay(valuePay),
				"otherPayAmount": setValuePay(valueOther),
				"payValue": setValuePay(valuePay),
				"genericTag1": "Informacion 1",
				"genericTag2": "Informacion 2",
				"genericTag3": "Informacion 3" ,
			}
		}
	}
}

export function mediosDePago() {
	const medios = {
		"01": "Efectivo",
		"02": "Cheque",
		"03": "Mixto",
		"04": "Tarjeta Crédito",
		"05": "Debito a cuenta",
		"06": "Otro Medio",
	}
	return medios;
}
