const shortid = require('short-id')
const IPFS = require("ipfs-api")
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

// I wrote 2 routes for saving & getting file address into blockchain 
function routes(app, dbe, lms, accounts){
    let db= dbe.collection('file-users')
    let file = dbe.collection('file-store')

    app.post('/upload', async (req,res)=>{
        let buffer = req.body.buffer
        let name = req.body.name
        let title = req.body.title
        let id = shortid.generate() + shortid.generate()
        if(buffer && title){
            //save the file to IPFS
            let ipfsHash = await ipfs.add(buffer || Buffer.alloc(8))
            let hash = ipfsHash[0].hash

            // save the address of the file in the blockchain 
            lms.sendIPFS(id, hash, {from: accounts[0]})
            .then((_hash, _address)=>{
                file.insertOne({id,hash, title,name})
                res.json({"status":"success", id})
            })
            .catch(err=>{
                res.status(500).json({"status":"Failed", "reason":"Upload error occured"})
            })
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })
    app.get('/access/:id', async (req,res)=>{
        let id = req.params.id
        if(req.params.id && req.params.email){
            db.findOne({email:req.body.email},(err,doc)=>{
                if(doc){
                    // I'm getting hash from blockchain
                    lms.getHash(id, {from: accounts[0]})
                    .then(async(hash)=>{
                        console.log(hash)
                        // I'm getting file from IPFS by hash
                        let data = await ipfs.files.get(hash)
                        console.log(data)
                        res.json({"status":"success", data: data.content})
                    })
                }else{
                    res.status(400).json({"status":"Failed", "reason":"wrong input"}) 
                }
            })
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })
}

module.exports = routes