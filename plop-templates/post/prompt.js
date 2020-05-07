//const fs = require("fs")
module.exports = {
  description: '生成一个页面',
  prompts: [{
    type: 'input',
    name: 'name',
    message: '请提供页面的名称',
    validate: (v) => {
      if (!v || v.trim === '') {
        return `name is required`
      } else {
        return true
      }
    }
  }, {
    type: 'input',
    name: 'path',
    message: '路径(可不填)(前后请勿填写/)(例如：hexo/child):'
  }, {
    type: 'confirm',
    name: 'comment',
    default:true,
    message: '是否允许评论（默认：是）:'
  }, {
    type: 'confirm',
    name: 'top',
    default:false,
    message: '是否置顶（默认：否）:'
  }, {
    type: 'confirm',
    name: 'publish',
    default:true,
    message: '是否发布（默认：是）:'
  }],
  actions: (data) => {
    // const name = '{{name}}';
    const name = data.name
    const fpath = data.path
    var actions = []
    let date  = new Date()
    let rootPath = 'articles/'
	let publish = data.publish?'':'unpublish/'
	let category = '';
    if (fpath) {
	  category = fpath.split("/")[0];
      rootPath = rootPath + publish + fpath + '/'
    }
    let year = date.getFullYear()
    let month = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1)
    let day = date.getDate()<10?('0'+date.getDate()):date.getDate()
    let hour = date.getHours()<10?('0'+date.getHours()):date.getHours()
    let minute = date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes()
    let second = date.getSeconds()<10?('0'+date.getSeconds()):date.getSeconds()
    actions.push({
      type: 'add',
      path: rootPath + `${name}.md`,
      templateFile: 'plop-templates/post/index.hbs',
      data: {
        name: name,
		category: category,
        time: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
        comment: data.comment,
		top: data.top
      }
    })
	//fs.mkdir(rootPath +`${name}`, (err) => {
	//  if (err) throw err;
	//});
    return actions
  }
}
