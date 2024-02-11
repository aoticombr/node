import { degublog } from "./log";
import { Pool, types } from "pg";
import {DB_PG}  from "../constantes/consts";
import {NextFunction} from 'express';



const typeHandlers = {
  parse: function (value:any) {
    return parseFloat(value);
  },
  // Opcionalmente, voc� pode definir a fun��o de formata��o tamb�m
  format: function (value:any) {
    return String(value);
  },
};
types.setTypeParser(1700, typeHandlers.parse);



export function getConvertQry(filt:[]){
    let qr = '';
    for (const index in filt) {  
 
      let json  = <any>filt[index];
      let campo = json.campo;
      let tipo  = json.tipo;
      let valor = json.valor;
       if (valor){
           if (tipo   == '=')   { qr += ` and upper(${campo}) =    upper('${valor}') `;}//com upper e aspas
      else if (tipo   == '==')  { qr += ` and       ${campo}  =           '${valor}'`;} //com aspas
      else if (tipo   == '===')  { qr += ` and       ${campo}  =           ${valor}`;}  //sem nada
      else if (tipo   == '=%')  { qr += ` and upper(${campo}) like upper('${valor}%')`;}
      else if (tipo   == '%=')  { qr += ` and upper(${campo}) like upper('%${valor}')`;}
      else if (tipo   == '%=%') { qr += ` and upper(${campo}) like upper('%${valor}%') `;}
      else if (tipo   == '>=') { qr += ` and ${campo} >= '${valor}' `;}
      else if (tipo   == '<=') { qr += ` and ${campo} <='${valor}' `;}
      else if (tipo   == 'in') { qr += ` and ${campo} in ('${valor.join(', ')}') `;}
      else
        qr += ` and upper(${campo}) like upper('${valor}%') `;
      }
    }  
    return qr;
}  
export function getFiltros(req:any){
  if (req.body.filtros == null) {
    return '';
  } else {
    return getConvertQry(req.body.filtros);
}  

}
export function getLimit(req:any){
  if (req.body.limit == null) {
    return 50;
  } else {
    return req.body.limit;
  }  

}
export async function StartTransaction(client:any){
  try {
    degublog('BEGIN')
    await   client.query('BEGIN');    
    return true; 
  } catch (error) {
    throw error;
  }   
}

export async function RollBackTransaction(erro:any,client:any) {
  try {
    degublog('ROLLBACK')
    degublog(erro)
    await client.query('ROLLBACK');
    return true;  
  } catch (error) {
    throw error;
  }  
}
export async function CommitTransaction(client:any){
  try {
    degublog('COMMIT')
    await client.query('COMMIT');
    return true;  
  } catch (error) {
    throw error;
  }
  
}
export async function Connect(//ppool:any
  ){
  try {
    const ppool = new Pool(<any>DB_PG);
    
    degublog('-------------------connect--------begin-----0----'); 
    const conn = await ppool.connect() ;
    degublog('-------------------connect--------begin-----1----');  
    await ExecCommand(`SET TIMEZONE TO 'America/Sao_Paulo'`, conn);
    degublog('-------------------connect--------begin-----3----'); 
    await Query(conn, 'SHOW TIMEZONE;',  false); 
    degublog('-------------------connect--------begin-----4----'); 
    return conn;  
  } catch (error) {
    degublog('-------------------connect--------erro---------'); 
    degublog(error); 
    throw error;
  }
   
}
export async function ExecCommand(sql:any, client:any){
  try {
    degublog('-------------------ExecCommand--------begin---------'); 
    degublog(sql); 
    await client.query(sql); 
    degublog('-------------------ExecCommand--------end---------');    
    return true; 
    
  } catch (error) {
    throw error;
  }
  
}
export async function Query(conn:any, sql:any,  close:boolean = true){
  
  try {
    degublog('-------------------Query--------begin----0-----'); 
    const results = await conn.query(sql);
    degublog('-------------------Query--------begin----1-----'); 
    if (close === true ){
      degublog('-------------------Query--------begin----end 1-----');
      await conn.end();
      degublog('-------------------Query--------begin----end 2-----');  
    }   
    degublog('-------------------Query--------end---------'); 
    return results.rows; 
  } catch (ex) { 
    throw ex;
  } 
       
}
export async function Post_Query(
  select: string,filt:any, plimit:number = 50, res:any, next:NextFunction) {

  const conn = await Connect(); 
  try {
    let where = ' where 1=1 ';     
    let limit = '';
    if (plimit > 0) 
      limit = ' limit '+plimit.toString();
    let sql   = select + where +filt + limit;      
    const results = await Query(conn,sql, true ); 
    return res.send(results);
  } catch (error) {
    next(error);
  } 
     
     
}
export async function Simple_Query(sql: any, close:boolean = true) {
  degublog('------Simple_Query------begin-'); 
  const conn    = await <any>Connect();
  try {    
    degublog(sql);     
    const result  = await Query(conn,sql, close);
    degublog('------Simple_Query-----end--'); 
    return result; 
  } catch (error) {
    conn.end();
    throw error;
  }
   
}
export async function Simple_Insert_Query(sql: string) {
  const  conn = <any>await Connect(//pool
    );degublog('Connect'); 
  try {
    degublog('-----------Simple_Insert_Query-----begin-----');
    
    await StartTransaction(conn);//degublog('StartTransaction'); 
    await ExecCommand(sql,conn);//degublog('ExecCommand',sql); 
    await CommitTransaction(conn);//degublog('CommitTransaction close'); 
    //await 
    degublog('-----------Simple_Insert_Query-----end-----');
    
  } catch (error) {
    conn.end();
    throw error;
  } finally {
    
    conn.end();
    return true;
  }
  
}  
export async function Insert_Query(sql: string,req:any, res:any, next:NextFunction ) {
  const conn = <any>await Connect(//pool
    );
  try {
    degublog('----------Insert_Query-----begin------'+req.url); 
    
        await StartTransaction(conn);degublog('StartTransaction'); 
        await ExecCommand(sql,conn);  degublog('ExecCommand');      
        await CommitTransaction(conn);degublog('CommitTransaction close'); 
       // await 
        degublog('----------Insert_Query-----end------'); 
        
  } catch (error) {
    next(error)
  } finally {
    conn.end(); degublog('end'); 
    return res.status(201).json({code:'', message:  'record inserted' }); 
  } 
        
   
} 
export async function Update_Query(//pool:any, 
  sql: string,req:any, res:any, next:NextFunction  ) {
  const conn = <any> await Connect(//pool
    ); degublog('Connect'); 
  try {
    degublog('----------Update_Query------begin-----'+req.url);
    
        await StartTransaction(conn) ;  degublog('StartTransaction');  
        await ExecCommand(sql,conn);degublog('ExecCommand'); 
        await CommitTransaction(conn) ; degublog('CommitTransaction close');    
       // await conn.end(); degublog('end');  
        degublog('----------Update_Query------end-----');
        
  } catch (error) {
    next(error)
  } finally {
    conn.end(); degublog('end'); 
    return res.status(201).json({code:'',  message:  'record update' });
  }            
        
   
}
export function ApplyStatus(itens:any = {}, status:string) {
    let y = 0;
   
    for (y = 0; y < itens.length; y++) {         
          itens[y]["row_status"] = status; 
    }
}
export async function setQueryJson(sql:string,property:string, cabs:any[]) {
  console.log('export async function setQueryJson(....'); 
    let x = 0;
    let cab = [];
    for (x = 0; x < cabs.length; x++) {
      console.log('export async function setQueryJson(....'+x); 
      cab = cabs[x];
      const query = {
        text: sql,
        values: [cab["id"]],
        rowMode: 'field',
      }
      cab[property] = [];     
      
      const itens = await Simple_Query(query);        
      
      ApplyStatus(itens, 'old');
      
         
      cab[property] = itens; //inserir itens no cabe?alho
     
    };  

}


export async function setProperty(modulo:string,sql:string, json:any){    
      await setQueryJson(sql, 'rows_'+modulo, json);
    //}
    console.log('json....');
    console.log(json);

}
