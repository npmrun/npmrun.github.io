hexo.extend.helper.register("sortPosts", function () {
  return hexo.locals.get('posts').data.sort(function(a, b){
    return a.slug.localeCompare(b.slug)
  });
});
hexo.extend.helper.register("filterPosts", function () {
  let posts = hexo.locals.get('posts').data;
  let allTag = posts.map(v=>v.slug.split("/").slice(0,-1).join("/"))
  allTag = allTag.filter(function(item, index, arr) {
    return allTag.indexOf(item) == index;
  });
  return allTag
});