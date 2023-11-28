export function QuotedStr1(pStr: string):string{    
    return "'"+pStr+"'";
}

export function QuotedStr2(pStr: string):string{
    return '"'+pStr+'"';
}

export function EmptyNull(value:any) { 
    if (!value) 
      return 'null';  
    
    return value;
}

export function EmptyNull1(value:any) {
 
    if ((typeof(value) == "number") && ((value == null) || (value==undefined))) 
      return 'null';  
    if ((typeof(value) != "number") && !value) 
      return 'null';   
    
    return QuotedStr1(value);
}
