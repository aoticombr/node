import  {EmptyNull1}      from './str';

export function getDescJson(list:any, value:any) {
    return list.find((f:any) => {return f.id === value}).label;
}

export function getTotal(list:any, field:string) {
    let total = 0;
    let x = 0; 
    for (x = 0; x < list.length; x++) {
        total += Number(list[x][field]);  
    }
    return total;
}

export function setValueJson(list:any, row:any, modo:string) {

    if ((modo === 'edit') ||  (modo === 'delete')) {
        let a = 0;
        for (a = 0; a < list.length; a++) { 
          if (list[a]['id'] === row['id']) {
            list[a] = row;
          }
        }
    } else {
        list.push(row);
    }
}

function ValueInArray(value:any, array_values:any) {
  const res = array_values.includes(value);
  return res;   
}

export function convertJsonQuery(row:any, tabela:any,arry_insert:any, array_update:any, array_text = <any>[],  array_bool = <any>[]) {

    let sql = '';let x = 0; 

    if (row.row_status === 'new') {
        sql += 'insert into '+tabela+'(';
        for (x = 0; x < arry_insert.length; x++) {
          if (x !== 0){
              sql += ',';
          }
          sql += arry_insert[x];  
        }
        sql += ') values (';
        for (x = 0; x < arry_insert.length; x++) {
            if (x !== 0){
                sql += ',';
            }
            if (ValueInArray(arry_insert[x], array_text)) {
                sql +=  ' $$'+row[arry_insert[x]]+'$$ ';
            }
            else if (ValueInArray(arry_insert[x], array_bool)) {
              
                if ((row[arry_insert[x]] === 'true') || (row[arry_insert[x]] === true)){
                    sql +=  'true';
                } else {
                    sql +=  'false';
                }                
            } else 
              sql += EmptyNull1(row[arry_insert[x]]);
        }               
                      
        sql += ')';
    } else if (row.row_status === 'old') {
        sql += 'update '+tabela+' SET '; 
        for (x = 0; x < array_update.length; x++) {
            if (x !== 0){
                sql += ',';
            }
            if (ValueInArray(array_update[x], array_text)) {
                sql += array_update[x]+' = '+' $$'+row[array_update[x]] +'$$ '
            }else if (ValueInArray(array_update[x], array_bool)) {
                console.log(array_update[x],row[array_update[x]]);
                if ((row[array_update[x]] === 'true') || (row[array_update[x]] === true)){
                    sql += array_update[x]+' = '+ 'true';
                } else {
                    sql += array_update[x]+' = '+  'false';
                }                
            } else 
              sql += array_update[x]+' = '+EmptyNull1(row[array_update[x]]) 
        }  
        sql += ' where id ='+EmptyNull1(row['id']);           
    } else if (row.row_status === 'del') {
        sql = 'delete from '+tabela+' where id ='+EmptyNull1(row['id']);
    }
    
    return sql;
}

