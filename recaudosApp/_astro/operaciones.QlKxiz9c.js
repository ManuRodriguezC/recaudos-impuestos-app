import{j as e,c as P,B as Z,s as q,g as K,d as G}from"./setDatas.RzFitsu7.js";import{r as s}from"./index.NEDEFKed.js";function J(){return e.jsx("button",{children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"50px",height:"50px",viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{fill:"#fff","fill-rule":"evenodd","clip-rule":"evenodd",d:"M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"})})})}function Q({date:u}){const F=u,[d,R]=s.useState(""),[o,f]=s.useState(0),[y,C]=s.useState(""),[v,N]=s.useState(""),[k,b]=s.useState(""),[S,E]=s.useState(!1),[$,L]=s.useState(!1),[B,x]=s.useState(!1),[H,j]=s.useState(!1),[z,w]=s.useState(!1),[A,h]=s.useState(!1),[l,V]=s.useState(""),m=s.useCallback(a=>{if(a.key==="Enter"){if(window.removeEventListener("keydown",m),E(!1),h(!1),d!==""){const t=P();parseInt(d.substring(52,60))<parseInt(t)?L(!0):(C(d.substring(38,50)),N(d.substring(20,32)),b(d.substring(3,16)),x(!0))}return}if(a.key!=="Alt"&&a.key!=="("&&a.key!==")"){if((o===32||o===53)&&a.key==="0"){f(t=>t+1);return}if((o===33||o===54)&&a.key==="2"){f(t=>t+1);return}if((o===34||o===55)&&a.key==="9"){f(t=>t+1);return}else R(t=>t+a.key),f(t=>t+1)}},[d,o]);s.useEffect(()=>(S?window.addEventListener("keydown",m):(h(!1),window.removeEventListener("keydown",m)),()=>{window.removeEventListener("keydown",m)}),[S,o,m]);function D(){R(""),b(""),f(0),C(""),N(""),L(!1),x(!1)}function O(){h(!0),j(!1),w(!1),D(),E(a=>!a)}async function T(){D(),x(!1);const a=await q({convenio:k,valuePay:y,factura:v,fecha:F});a.success?(V(a.data),j(!0)):w(!0),setTimeout(()=>{window.location.reload()},3e3)}return e.jsxs("div",{className:"flex flex-col justify-center items-center bg-white py-5 px-10 rounded-2xl m-10",children:[e.jsxs("div",{onClick:O,className:`flex flex-col h-[250px] cursor-pointer justify-center mb-5 items-center border-2 rounded-lg border-gray-500 border-solid hover:scale-105 transition-all duration-300 ${S?"bg-blue-400/50":""}`,children:[e.jsx(Z,{}),e.jsx("h1",{className:"text-center pb-5",children:"Escanear codigo"})]}),$&&e.jsx("h4",{className:"text-5xl text-red-600 mb-5",children:"La fecha de pago expiro"}),H&&e.jsxs("span",{className:"text-2xl border-b-2 border-[#007eb8] text-[#007eb8] font-semibold",children:["Registro de Recaudo Exitoso - # ",l.toString().padStart(5,"0")]}),z&&e.jsx("span",{className:"text-2xl border-b-2 border-red-600 text-red-600 font-semibold",children:"Registro de Recaudo Fallido"}),A&&e.jsx("span",{className:"text-2xl font-mono font-semibold",children:"Por favor escanee el codigo"}),e.jsxs("div",{className:"flex flex-col items-center justify-center",children:[e.jsxs("h3",{children:[e.jsx("strong",{children:"Codigo:"})," ",d]}),e.jsxs("h3",{children:[e.jsx("strong",{children:"Monto:"})," ",y]}),e.jsxs("h3",{children:[e.jsx("strong",{children:"N. Factura:"})," ",v]}),e.jsxs("h3",{children:[e.jsx("strong",{children:"Convenio:"})," ",k]})]}),e.jsx("button",{className:`cursor-pointer text-2xl mt-4 px-4 py-2 rounded-md bg-[#007eb8] text-white border-2 hover:bg-[#2d2e83] transition duration-300 hover:scale-105 ${B?"":"hidden"}`,onClick:()=>T(),children:"Enviar"})]})}function _(){const[u,F]=s.useState(""),[d,R]=s.useState([]),[o,f]=s.useState([]),[y,C]=s.useState([]),[v,N]=s.useState([]),[k,b]=s.useState(!1),[S,E]=s.useState({}),[$,L]=s.useState(0),[B,x]=s.useState(!1),[H,j]=s.useState(!1),[z,w]=s.useState(!1),[A,h]=s.useState(!1),l=".";s.useEffect(()=>{async function t(){const n=await K();R(n.data)}t()},[]);const V=t=>{let n=t.target.value;x(!1),b(!1),j(!1),f([]),C([]),N([]),F(n)};function m(t,n){const c={};return t.forEach(i=>{c[i]=0,n.forEach(r=>{r.encabezadoLote==i&&(c[i]+=parseInt(r.registroDetalle.substring(50,64)))})}),c}function D(){const t=d.filter(n=>n.fecha==u);if(t.length>0){h(!1),b(!0),j(!0),x(!1),w(!0),f(t);const n=t.map(p=>p.encabezadoArchivo),c=[...new Set(n)];C(c);const i=t.map(p=>p.encabezadoLote),r=[...new Set(i)];N(r);const g=m(r,t);E(g),L(Object.values(g).reduce((p,U)=>p+U,0))}else x(!0),w(!0),h(!1)}async function O(t){if(confirm(`¿Estás seguro de que deseas eliminar este registro # ${t}?`))try{await G(t),location.reload()}catch(c){console.log(c)}}function T(){let t=[];t.push(`${y[0]}${l.padEnd(107,l)}`),v.map((g,p)=>{let U=p+1,I=1;t.push(`${g}${l.padEnd(143,l)}`),o.map((M,W)=>{M.encabezadoLote===g&&(I++,t.push(`${M.registroDetalle.slice(0,-7)}${I.toString().padStart(7,"0")}${l.padEnd(68,l)}`))}),t.push(`08${(I-1).toString().padStart(9,"0")}${S[g].toString().padStart(18,"0")}${U.toString().padStart(4,"0")}${l.padEnd(129,l)}`)}),t.push(`09${o.length.toString().padStart(9,"0")}${$.toString().padStart(18,"0")}${l.padEnd(133,l)}`);const n=t.join(`
`).replaceAll("."," "),c=new Blob([n],{type:"text/plain"}),i=URL.createObjectURL(c),r=document.createElement("a");r.href=i,r.download=`Recaudos ${u}`,r.click(),setTimeout(()=>{URL.revokeObjectURL(i)},0)}function a(){h(!0),j(!1),b(!1),x(!1),w(!1)}return e.jsxs("div",{className:"flex flex-col justify-center items-center mb-5",children:[e.jsxs("div",{className:"flex flex-col top-20 items-center w-[440px] justify-center bg-white px-10 py-2 rounded-xl ",children:[e.jsx("h3",{className:"font-bold text-2xl",children:"Seleccione una fecha"}),e.jsxs("div",{className:"flex flex-wrap gap-5 m-2",children:[e.jsx("input",{className:"border-2 border-zinc-400 rounded-md",type:"date",onChange:V}),e.jsx("button",{className:"text-white rounded-md hover:bg-[#007eb8c1] transition duration-300 hover:scale-105 bg-[#007eb8] px-3 py-1",onClick:()=>{D()},children:"Buscar"})]}),u&&e.jsx("div",{children:e.jsxs("h4",{className:"font-bold text-xl",children:["Fecha: ",u]})})]}),B&&e.jsxs("span",{className:"text-white text-2xl border-b-2 border-white m-10",children:["No se encontraton datos registrados para el ",u]}),k&&e.jsx("table",{className:"mt-10 mb-4 p-5 bg-white rounded-3xl shadow-gray-800 shadow-lg font-semibold",children:e.jsxs("tr",{className:"flex flex-col justify-center items-center p-5",children:[e.jsx("td",{children:y[0]}),v.map((t,n)=>{let c=n+1,i=1;return e.jsxs(e.Fragment,{children:[e.jsx("td",{children:t}),o.map((r,g)=>r.encabezadoLote===t?(i++,e.jsxs("td",{className:"my-1",children:[e.jsxs("span",{className:"mr-6",children:["Radicado # ",r.id]}),r.registroDetalle.slice(0,-7),i.toString().padStart(7,"0"),e.jsx("button",{className:"ml-6 text-red-600 border-red-600 rounded transition duration-200 ease-in-out ... hover:scale-110 hover:border-b-2",onClick:()=>O(r.id),children:"Eliminar"})]})):null),e.jsx("td",{className:"mb-8",children:`08${(i-1).toString().padStart(9,"0")}${S[t].toString().padStart(18,"0")}${c.toString().padStart(4,"0")}`})]})}),e.jsxs("td",{children:["09",o.length.toString().padStart(9,"0"),$.toString().padStart(18,"0")]})]})}),z&&e.jsx("button",{className:"text-white hover:scale-110",onClick:()=>a(),children:e.jsx(J,{})}),H&&e.jsx("button",{className:"px-4 mt-3 py-2 bg-[#007eb8] text-white rounded-lg hover:bg-[#007eb8c1] hover:scale-105 transition-all duration-200",onClick:()=>{T()},children:"Descargar datos"}),A&&e.jsx(Q,{date:u})]})}export{_ as default};