
import https from 'https';

export function https_generico(body:any,options:any) {
  
    return new Promise((resolve,reject) => {
        const req = https.request(options, res => {
            const chunks = <any>[];        
            res.on('data', data => chunks.push(data))
            res.on('end', () => {
         
                let resBody = <any>Buffer.concat(chunks);
         
                switch(res.headers['content-type']) {
                    case 
                    'application/json':
                        resBody = JSON.parse(resBody);
               
                        break;
                    case
                    'application/json;charset=UTF-8':
                        resBody = JSON.parse(resBody);
                 
                        break;    
                }
                resolve(resBody)
            })
        })
        req.on('error',reject);
       
        if(body) {         
            req.write(body);
        }       
        req.end();
    })
}


