let path=require('path');
let url=require('url');
let qs =require('querystring')
let http=require('http');
let fs=require('fs');
// make server
let httmPath=path.join(__dirname,"/index.html")
let htmlAbout=path.join(__dirname,"/about.html")
let server=http.createServer(handleServer)
function handleServer(req,res){
if(req.method==='GET'&&req.url==="/"){
    res.setHeader('content-type','text/html')
 fs.readFile(httmPath,(err,content)=>{
     if(err) return console.log(err);
     res.write(content);
     res.end();
 })
}else if(req.method==="GET" &&req.url==="/about"){
    res.setHeader('content-type','text/html');
    fs.readFile(htmlAbout,(err,content)=>{
        if(err) return console.log(err);
        res.write(content);
        res.end();
    })
} else if(req.url.split(".").pop()==="css"){
    console.log(req.url ,'first')
    res.setHeader('Content-Type','text/css');
     fs.readFile('./stylesheet/' + req.url , (err,content)=>{
       if(err)return console.log(err)
       res.write(content)
       res.end();
     })
   }else if(req.url.split(".").pop()==="jpg"){
    console.log(req.url,'second')
    res.setHeader('Content-Type','image/jpg');
     fs.readFile('image/' + req.url , (err,content)=>{
       if(err)return console.log(err)
       res.write(content)
       res.end();
     })
   }
}
server.listen(3000,()=>{
    console.log('we are using local host 5000')
})
// question no four

let server2=http.createServer(handleForm)

function handleForm(req,res){
let store="";
req.on('data',(chunk)=>{
  store+=chunk
})
req.on('end',()=>{
  if(req.method==="GET"&&req.url==="/contect"){
    let contectPath=path.join(__dirname,"..","/contacts","/contect.html");
    res.setHeader('content-type','text/html');
    fs.readFile(contectPath,(err ,content)=>{
      if(err) return console.log(err)
      res.write(content);
      res.end();
    })
  }else if(req.method==="POST"&&req.url==="/form"){
    let paeseData=JSON.stringify(qs.parse(store))
    let username=qs.parse(store).username
  
    let userDir=path.join(__dirname,'..','/contacts/')
    console.log(userDir)
    fs.open(userDir+username+".json", "wx", (err, fd) => {
      if(err) return console.log(err);
      console.log(fd)
      fs.writeFile(fd, paeseData, (err) => {
        fs.close(fd, (err) => {
          res.write(`<h1>${qs.parse(store).username}</h1><h2>${qs.parse(store).name}</h2> <h2>${qs.parse(store).email}</h2><h2>${qs.parse(store).bio}</h2>
          <h2>${qs.parse(store).age}</h2>`)
          res.end(`${username} successfully created`);
        });
      });
    });
  }

})





}
server2.listen(4000,()=>{
  console.log('we are using local host 4000')
})