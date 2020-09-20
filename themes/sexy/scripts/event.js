hexo.extend.helper.register("test", function () {
  return hexo.locals.get('posts').data.sort(function(a, b){
    return a.slug.localeCompare(b.slug)
  });
});
