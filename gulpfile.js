const {
    src,
    dest,
    series,
    parallel
} = require('gulp');
const replace = require('gulp-replace');
const del = require('del');
function replaceMD() {
    // , `!${sourceDir}/**/${ignoreDir}/*`
    return src([`./articles/**/*.md`,`!./articles/unpublish/**/*.md`])
        .pipe(replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.png\\)", 'gi'),function(match){
            let pp = this.file.relative.replace(/\\/gi,"/").replace(".md","");
            return match.replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.png\\)", 'gi'), `![$1](/static/${pp}$2/images/$3.png)`) 
        }))
        .pipe(replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.webp\\)", 'gi'),function(match){
            let pp = this.file.relative.replace(/\\/gi,"/").replace(".md","");
            return match.replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.webp\\)", 'gi'), `![$1](/static/${pp}$2/images/$3.webp)`) 
        }))
		.pipe(replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.gif\\)", 'gi'),function(match){
            let pp = this.file.relative.replace(/\\/gi,"/").replace(".md","");
            return match.replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.gif\\)", 'gi'), `![$1](/static/${pp}$2/images/$3.gif)`) 
        }))
		.pipe(replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.jpg\\)", 'gi'),function(match){
            let pp = this.file.relative.replace(/\\/gi,"/").replace(".md","");
            return match.replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.jpg\\)", 'gi'), `![$1](/static/${pp}$2/images/$3.jpg)`) 
        }))
		.pipe(replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.jpeg\\)", 'gi'),function(match){
            let pp = this.file.relative.replace(/\\/gi,"/").replace(".md","");
            return match.replace(new RegExp("\\!\\[(.*?)\\]\\(\/(.*?)images/(.*?)\\.jpeg\\)", 'gi'), `![$1](/static/${pp}$2/images/$3.jpeg)`) 
        }))
        .pipe(replace(new RegExp("\\[(.*?)\\]\\(\/(.*?)files/(.*?)\\.zip\\)", 'gi'),function(match){
            let pp = this.file.relative.replace(/\\/gi,"/").replace(".md","");
            return match.replace(new RegExp("\\[(.*?)\\]\\(\/(.*?)files/(.*?)\\.zip\\)", 'gi'), `[$1](/static/${pp}$2/files/$3.zip)`) 
        }))
        .pipe(dest(`./source/_posts`))
}
function movepng() {
    return src([`./articles/**/*.{png,jpg,webp}`,`!./articles/unpublish/**/*.{png,jpg,webp}`])
        .pipe(dest(`./source/static`))
}
function movezip() {
    return src([`./articles/**/*.{zip,rar}`,`!./articles/unpublish/**/*.{zip,rar}`])
        .pipe(dest(`./source/static`))
}

function cleanDist() {
    return del([
        './source/_posts/**/*',
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        './source/static/**/*',
        // 我们不希望删掉这个文件，所以我们取反这个匹配模式
        '!./source/static/avatar.jpg'
      ], function(){

      });
}

exports.default = parallel(replaceMD,movepng,movezip)
exports.clean = cleanDist