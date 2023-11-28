const debug = <Boolean>true;

export function DegubLog(dado:any){
    if (Boolean(debug) === true)
     console.log(dado)
  }
export function degublog(dado:any){
    DegubLog(dado);
} 
