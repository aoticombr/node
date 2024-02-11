export function Auth(req:any, res:any, next:any){
    if (!req.body.auth) {
      res.status(200).json({error: 'Missing Authorization Body'});      
    } else
    if ((!req.body.auth.USER)||(!req.body.auth.PASS)) {        
      res.status(200).json({error: 'Missing Credentials Body'});  
    } else {
      next();
    }
   // console.log(res);
}