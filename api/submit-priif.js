// Stores all pending requests on server - not just in browser
let memoryStore = global.pendingStore || [];
global.pendingStore = memoryStore;

export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS') return res.status(200).end();

  if(req.method==='POST'){
    let body = req.body;
    if(typeof body==='string'){ try{ body=JSON.parse(body)}catch(e){} }
    const item = {
      id: Date.now(),
      email: body.email,
      real_amount: body.real,
      demo_amount: body.demo,
      order_id: body.order_id,
      screenshot: body.screenshot, // base64
      status: 'pending',
      date: new Date().toISOString()
    };
    memoryStore.push(item);
    return res.status(200).json({success:true, id:item.id});
  }

  if(req.method==='GET'){
    return res.status(200).json(memoryStore);
  }
}
