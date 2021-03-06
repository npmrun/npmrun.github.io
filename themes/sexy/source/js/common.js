ready(function () {
  var line = document.getElementById("line");
  var page = document.getElementById("page");
  var toTop = document.getElementById("toTop");
  document.addEventListener("scroll", function () {
    var rate =
      document.documentElement.scrollTop /
      (page.offsetHeight - document.documentElement.offsetHeight);
    line.style.width = rate * 100 + "%";
    if (rate > 0.2) {
      toTop.innerText = ~~(rate * 100);
      toTop.style.display = "block";
    } else {
      toTop.style.display = "none";
    }
  });

  toTop.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
    toTop.style.display = "none";
  });
  searchFunc('/search.xml',"local-search-input","input__content")
  function searchFunc(path, search_id, content_id) {
    "use strict";
    $.ajax({
      url: path,
      dataType: "xml",
      success: function (xmlResponse) {
        // get the contents from search data
        var datas = $("entry", xmlResponse)
          .map(function () {
            return {
              title: $("title", this).text(),
              content: $("content", this).text(),
              url: $("url", this).text(),
            };
          })
          .get();

        var $input = document.getElementById(search_id);
        if (!$input) return;
        var $resultContent = document.getElementById(content_id);
        if ($("#local-search-input").length > 0) {
          $input.addEventListener("input", function () {
            var str = '<ul class="article-list">';
            var keywords = this.value
              .trim()
              .toLowerCase()
              .split(/[\s\-]+/);
            $resultContent.innerHTML = "";
            if (this.value.trim().length <= 0) {
              return;
            }
            // perform local searching
            datas.forEach(function (data) {
              var isMatch = true;
              var content_index = [];
              if (!data.title || data.title.trim() === "") {
                data.title = "Untitled";
              }
              var data_title = data.title.trim().toLowerCase();
              var data_content = data.content
                .trim()
                .replace(/<[^>]+>/g, "")
                .toLowerCase();
              var data_url = data.url;
              var index_title = -1;
              var index_content = -1;
              var first_occur = -1;
              // only match artiles with not empty contents
              if (data_content !== "") {
                keywords.forEach(function (keyword, i) {
                  index_title = data_title.indexOf(keyword);
                  index_content = data_content.indexOf(keyword);

                  if (index_title < 0 && index_content < 0) {
                    isMatch = false;
                  } else {
                    if (index_content < 0) {
                      index_content = 0;
                    }
                    if (i == 0) {
                      first_occur = index_content;
                    }
                    // content_index.push({index_content:index_content, keyword_len:keyword_len});
                  }
                });
              } else {
                isMatch = false;
              }
              // show search results
              if (isMatch) {
                str +=
                  "<li style='padding: 20px 30px;' class='article-list__item' ><a href='" +
                  data_url +
                  "'>" +`<h2 style="white-space:nowrap;" class='article-list__title'>${data_title}</h2>`
                  "</a>";
                var content = data.content.trim().replace(/<[^>]+>/g, "");
                if (first_occur >= 0) {
                  // cut out 100 characters
                  var start = first_occur - 20;
                  var end = first_occur + 80;

                  if (start < 0) {
                    start = 0;
                  }

                  if (start == 0) {
                    end = 100;
                  }

                  if (end > content.length) {
                    end = content.length;
                  }

                  var match_content = content.substring(start, end);

                  // highlight all keywords
                  keywords.forEach(function (keyword) {
                    var regS = new RegExp(keyword, "gi");
                    match_content = match_content.replace(
                      regS,
                      '<em class="search-keyword">' + keyword + "</em>"
                    );
                  });

                  str += '<p class="search-result">' + match_content + "...</p>";
                }
                str += "</li>";
              }
            });
            str += "</ul>";
            $resultContent.innerHTML = str;
          });
        }
      },
    });
  };
});
