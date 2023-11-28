import {cpfcnpjregexp,cpfregexp,cnpjregexp,
  cepregexp,emailregexp} from '../constantes/consts';


  
export function Auth(req:any, res:any, next:any){
    if (!req.body.auth) {
      res.status(200).json({error: 'Missing Authorization Body'});      
    } else
    if ((!req.body.auth.USER)||(!req.body.auth.PASS)) {        
      res.status(200).json({error: 'Missing Credentials Body'});  
    } else
    if ((req.body.auth.USER !== "AOTI") || (req.body.auth.PASS !== "123")) {
      res.status(200).json({error: 'Invalid Authentication Credentials'}); 
    } else {
      next();
    }
   // console.log(res);
}

export function Valid_TB0003_SENHA(req:any, res:any, next:any){
  let cliente = req.body.insert;
  if ((!cliente.senha == null) || (cliente.senha === null) || (cliente.senha === '')) {	
    res.status(200).json({error: 'Senha Vazia'});
  } else
  if ((cliente.senha.length <= 5) ) {	
       res.status(200).json({error: 'Senha Inv�lida deve possuir mais de 5 digitos'});
  } else {
    next();
  }
  //console.log(res);
}

export function Valid_TB0003(req:any, res:any, next:any){
  console.clear();
 // console.log('export function Valid_TB0003...');
 // console.log(req.body);
  let cliente = <any>[];
  
  if ((!req.body.insert) && (!req.body.update)) {
  ////console.log('req.url..........');
  ////console.log(req.url);
 // //console.log('Missing valid Body...');
 // //console.log(req.body)
    return res.status(200).json({error: 'Missing valid Body...'}); 
  } else {
    if (req.body.update) {
      cliente = req.body.update;
    }  else {
      cliente = req.body.insert; 
    }  
    //console.log(cliente);
    if ((!cliente.cpf_cnpj) ||  (cliente.cpf_cnpj === null)) {
      return res.status(200).json({error: 'CPF/CNPJ Vazio('+cliente.cpf_cnpj+')'});
    } else
    if (!cpfregexp.test(cliente.cpf_cnpj) && !cnpjregexp.test(cliente.cpf_cnpj)) {  
      return res.status(200).json({error: 'CPF/CNPJ em formato invalido'});
    } else 
    if ((!cliente.email) || (cliente.email === null )|| (cliente.email === '' )) { 
      return res.status(200).json({error: 'Email Vazio'});
    }  else
    if (!emailregexp.test(cliente.email)) {
      return res.status(200).json({error: 'Email Inv�lido'});
    } else 
    if ((!cliente.nome) ||  (cliente.nome === null)|| (cliente.nome === '')) {	
      return res.status(200).json({error: 'Nome Vazio'});
    }  else    
    if ((cliente.nome.length < 5)) {	
      return res.status(200).json({error: 'Nome deve conter mais do que 5 caracteres'});
    } else
    if ((!cliente.logr) ||  (cliente.logr === null)||  (cliente.logr === '')) {	
      return res.status(200).json({error: 'Logradouro Vazio'});
    } else 
    if ((!cliente.nro) || (cliente.nro === null)|| (cliente.nro === '')) {	
      return res.status(200).json({error: 'Nro Vazio'});
    } else 
    if ((!cliente.bairro == null) || (cliente.bairro === null)|| (cliente.bairro === '')) {	
      return res.status(200).json({error: 'Bairro Vazio'});
    }  else    
    if ((!cliente.cidade == null) || (cliente.cidade === null)|| (cliente.cidade === '')) {	
      return res.status(200).json({error: 'Cidade Vazio'});
    } else 
    if ((!cliente.uf == null) || (cliente.uf === null) ||  (cliente.uf === '')) {	
      return res.status(200).json({error: 'UF Vazio'});
    } else 
    if ((cliente.uf.length < 2)) {	 
      return res.status(200).json({error: 'UF Inv�lido'});
    }  else
    if ((!cliente.cep == null) ||  (cliente.cep === null) || (cliente.cep === '')) {	
      return res.status(200).json({error: 'CEP Vazio'});
    }  else    
    if ((cliente.ddd1 == null) || (cliente.ddd1 === null)|| (cliente.ddd1 === '')) {	
      return res.status(200).json({error: 'DDD Vazio'});
    } else 
    if ((cliente.ddd1.length < 2)) {	
      return res.status(200).json({error: 'DDD Inv�lido'});
    }  else
    if ((cliente.tel1 == null) || (cliente.tel1 === null)|| (cliente.tel1 === '')) {	
      return res.status(200).json({error: 'Telefone Vazio'});
    } else
    if ((cliente.tel1.length < 8)) {	
      return res.status(200).json({error: 'Telefone Inv�lido'});
    } else {
      next();
    }

    
  } 
 // console.log(res);
}


/*export function AutValid(req:any, res:any){
    if (req.body.valid == null) {
      return {erro:400, error: 'Missing valid Body' };
    } 
    else { 
         return {error:200,  error: ''};
    }
}*/
export function AutEmail(req:any, res:any, next:any){ 
 
    if (req.body.valid == null) {   
      res.status(200).json({error: 'Missing valid Body'});
    } else 
    if ((req.body.valid.email == null) ||
         (req.body.valid.email === null)||
         (req.body.valid.email === '')) {	
         res.status(200).json({error: 'Email Vazio'});
      } else
    if (!emailregexp.test(req.body.valid.email)) {	     
         res.status(200).json({error: 'Email Inv�lido'});
    } else {
      
        next();
    }	
      
           
}






