import{j as e,g as H}from"./registersRecaudos.MibmRSbY.js";import{r}from"./index.NEDEFKed.js";function A(){const[u,m]=r.useState(""),[S,j]=r.useState([]),[f,h]=r.useState([]),[b,p]=r.useState([]),[v,g]=r.useState([]),[w,x]=r.useState(!1),[E,y]=r.useState({}),[F,D]=r.useState(0),[N,d]=r.useState(!1),a=".";r.useEffect(()=>{async function t(){const s=await H();j(s.data)}t()},[]);const L=t=>{let s=t.target.value;d(!1),x(!1),h([]),p([]),g([]),m(s)};function R(t,s){const i={};return t.forEach(n=>{i[n]=0,s.forEach(l=>{l.encabezadoLote==n&&(i[n]+=parseInt(l.registroDetalle.substring(50,66)))})}),i}function z(){const t=S.filter(s=>s.fecha==u);if(t.length>0){x(!0),d(!1),h(t);const s=t.map(c=>c.encabezadoArchivo),i=[...new Set(s)];p(i);const n=t.map(c=>c.encabezadoLote),l=[...new Set(n)];g(l);const o=R(l,t);y(o),D(Object.values(o).reduce((c,$)=>c+$,0))}else d(!0)}return e.jsxs("div",{className:"flex flex-col justify-center items-center",children:[e.jsxs("div",{className:"flex flex-col items-center w-[440px] justify-center bg-white px-10 py-2 rounded-xl",children:[e.jsx("h3",{className:"font-bold",children:"Seleccione una fecha"}),e.jsxs("div",{className:"flex flex-wrap gap-5 m-2",children:[e.jsx("input",{className:"border-2 border-zinc-400 rounded-md",type:"date",onChange:L}),e.jsx("button",{className:"text-white rounded-md hover:bg-[#2d2e83] transition duration-300 hover:scale-105 bg-[#007eb8] px-3 py-1",onClick:()=>{z()},children:"Buscar"})]}),e.jsx("div",{children:e.jsxs("h4",{children:["Fecha: ",u]})})]}),N&&e.jsx("span",{children:"No se encontraton datos registrados"}),w&&e.jsx("div",{className:"m-5 p-5 bg-white rounded-lg shadow-gray-800 shadow-lg",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[b[0],a.padEnd(107,a)]}),v.map((t,s)=>{let i=s+1,n=1;return e.jsxs(e.Fragment,{children:[e.jsxs("li",{children:[t,a.padEnd(143,a)]},`lote-${s}`),f.map((l,o)=>l.encabezadoLote===t?(n++,e.jsxs("li",{children:[l.registroDetalle.slice(0,-7),n.toString().padStart(7,"0"),a.padEnd(68,a)]},`detalle-${o}`)):null),e.jsx("li",{children:`08${(n-1).toString().padStart(9,"0")}${E[t].toString().padStart(18,"0")}${i.toString().padStart(4,"0")}${a.padEnd(129,a)}`})]})}),e.jsxs("li",{children:["09",f.length.toString().padStart(9,"0"),F.toString().padStart(18,"0"),a.padEnd(133,a)]})]})})]})}export{A as default};
