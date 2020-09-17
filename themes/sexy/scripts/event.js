// const axios = require('axios');
const cmark = require('cmark-gfm')

// hexo.extend.generator.register('test', function(locals){
//   // Object
//   return {
//     path: 'foo',
//     data: 'foo'
//   };
// });

// https://github.com/sindresorhus/github-markdown-css
// https://github.com/BinaryMuse/node-cmark-gfm#readme
hexo.extend.helper.register('github_markdown', function(data,isLink){
  if (isLink!="link") {
    const html = cmark.renderHtmlSync(data, {
      githubPreLang: true,
      smart: true,
      footnotes:true,
      fullInfoString: true,
      hardbreaks:true,
      extensions:{
        tasklist: true,
        table: true,
      }
    })
    return html
  }
  return data;
});


// hexo.extend.helper.register('github_markdown', function(data){
//   return new Promise((resolve) => {
//     axios({
//       method: 'post',
//       url: 'https://api.github.com/markdown',
//       data: {
//         "text": data,
//         "mode": "markdown"
//       }
//     }).then(res=>{
//       console.log(res.data);
//       resolve(res.data)
//     }).catch(err => {
//       throw new Error(err)
//     })
//   });
// });
