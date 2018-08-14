/**
 * バックログ一覧に最後のコメントを表示する
 */
chrome.extension.sendRequest({get : true}, function(response) {

    $('.myCommentBox').remove();

    json = $('script:contains(initialIssues)').text().match(/"id":([0-9]+),"projectId":([0-9]+),"issueKey":"DEV-([0-9]+)"/g);

    console.log(json);

    ids = [];
    for(var i in json){

        var id = json[i].match(/"id":([0-9]+),"projectId":([0-9]+),"issueKey":"DEV-([0-9]+)"/);


        var url  = response.config.backlog.base_url + '/GetInitialComments.action?issueId=' + id[1] + '&limit=20&fromId=&min=3&includeOrigin=true';

        $.get(url,
            function(data){

            data = eval(data);
            console.log(data);
            for(i in data.comments){
                if(data.comments[i].content){
                    //console.log([data.issueKey, data.comments[i].content]);
                    summary = $('td:contains('+ data.issueKey +')').next('td.cell-summary');
                    summary.find('.myCommentBox').remove(); //2重登録防止
                    summary.append(
                        '<div class="myCommentBox">' + data.comments[i].name + ' ' + data.comments[i].createdOn + data.comments[i].content + '</div>'
                    );
                    break;
                }
            }
        });

    }



    //window.abc();

    //injectScript("console.log(window.Backlog.resource['initialIssues'])");

    /*
    var issues = $('.cell-key.js-issue-key');

    issues.each(function(){

        var id = $(this).text().replace(/\s+/g, '');

        $(this).addClass(id);

        $.get('https://lsd-inc.backlog.jp/view/' + id,
            function(data){

                console.log(
                    $(data).find('.ticket__key-number').text()
                    + $(data).find('.comment-list').html()
                );


            });
    });
    */

    /*
    //既存のPRを検索
    $.get(git_base_url + '/pulls?q=is%3Apr+' + config.prefix + dev_id,
        function(data){

            var issues = $(data).find('.cell-key.js-issue-key');

            if(issues.length){

                issues.each(function(){

                    var ret = {
                        status: $(this).find('.tooltipped').attr('aria-label'),
                        link: $(this).find('a.h4').attr('href'),
                        title: $(this).find('a.h4').text()
                    };
                    console.log(ret);

                    $('#git-prs ul').append('<li> %STATUS%<a href="%LINK%" target="_blank">%TITLE%</a></li>'
                        .replace('%STATUS%', ret.status.split(' ')[0])
                        .replace('%LINK%', git_url + ret.link)
                        .replace('%TITLE%', ret.title)
                    );

                });

            }else{
                $('#git-prs ul').append('<li>no PRs..</li>');
            }
        });
        */

    chrome.extension.sendRequest({set : {step : 'end'}});
});
