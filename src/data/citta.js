import comuni from './comuni.json';

const cit=[...new Set(Array.from(comuni, (x) => x.nome))];
const cittaItaliane=Array.from(cit,(x)=>{return{label:x}})

export {cittaItaliane};