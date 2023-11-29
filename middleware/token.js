
import jwt from 'jsonwebtoken';
import {SECRET}  from "../constantes/consts";

export function bearer(req, res, next) {   
   if (!req.headers.authorization) {
      return res.status(401).end();
   }
  
   let BEARER = req.headers.authorization;            //console.log(Aut);
   let TOKEN_BEARER = BEARER.split(" ")[1];           //console.log(base64_token);
  
   jwt.verify(TOKEN_BEARER,SECRET.KEY, (err, decoded) => {
     req.usuario = decoded
     if (err) {       
           return res.status(401).send(err);       
     }   
          
     next();
   })
}
export function authorization(req, res, next) {
   console.log(req.headers); 
   if (!req.headers.authorization) {
      return res.status(401).end();
   }  
   next();   
}  
