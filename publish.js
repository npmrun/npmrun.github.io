var fs = require('fs');
var path = require('path');
if(process.argv.length<=2){
    console.log("请输入publish或者unpublish");
    return
}
if(process.argv.length<=3){
    console.log("请输入目录");
    return
}
let isPublish = process.argv[2];

if(isPublish == "publish"){
    var param = path.resolve('articles/unpublish',process.argv[3]);
    // 目录发布
    fs.stat(param, function (err, stats) {
        if (err) throw err;
        if(stats.isDirectory()){
            let destPath =param.replace("articles\\unpublish","articles");
            let dir = destPath.slice(0,destPath.lastIndexOf("\\"))
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            fs.renameSync(param,destPath);
        }
    })
    
    // md发布
    fs.stat(param+".md", function (err, stats) {
        if (err) throw err;
        if(!stats.isDirectory()){
            let destPath =(param+".md").replace("articles\\unpublish","articles");
            let dir = destPath.slice(0,destPath.lastIndexOf("\\"))
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            fs.renameSync(param+".md",destPath);
    
        }
    })
}
if(isPublish == "unpublish"){
    var param = path.resolve('articles/',process.argv[3]);
    // 目录不发布
    fs.stat(param, function (err, stats) {
        if (err) throw err;
        if(stats.isDirectory()){
            let destPath =param.replace("articles","articles\\unpublish");
            let dir = destPath.slice(0,destPath.lastIndexOf("\\"))
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            fs.renameSync(param,destPath);
        }
    })
    
    // md不发布
    fs.stat(param+".md", function (err, stats) {
        if (err) throw err;
        if(!stats.isDirectory()){
            let destPath =(param+".md").replace("articles","articles\\unpublish");
            let dir = destPath.slice(0,destPath.lastIndexOf("\\"))
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            fs.renameSync(param+".md",destPath);
    
        }
    })
    
}
