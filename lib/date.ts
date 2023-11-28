export function DtaToTextBr(pdata:any) {
  let vdata = new Date(pdata);
  var mm = vdata.getMonth()+1 ;
  var dd = vdata.getDate();
  var yy = vdata.getFullYear();  

  if (!pdata) 
    return '';  
  
  return dd.toString().padStart(2, '0')+'/'+mm.toString().padStart(2, '0')+'/'+yy; 

}

export function DtaToTextEng(pdata:any) {
     let vdata = new Date(pdata);
     var mm = vdata.getMonth()+1 ;
     var dd = vdata.getDate();
     var yy = vdata.getFullYear();
   
    if (!pdata) 
     return '';  
   
     return yy+'-'+mm.toString().padStart(2, '0')+'-'+dd.toString().padStart(2, '0'); 
}

export function DtaToTextBr2(pdata:any) {
    let vdata = new Date(pdata);
    return vdata.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
}
