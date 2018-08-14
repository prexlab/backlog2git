
chrome.extension.sendRequest({get : true}, function(response) {

    var no = document.location.href.match(/staging\.\.\..+\/b([0-9]+)_.+$/)[1];
    var url = response.config.backlog.base_url + '/view/DEV-' + no;

    console.log(url);

    $.get(url + '/edit', function(data){

        //DOM解析が全然うまくいかないので、まるっととる！
        var code = data.match(/var issue = .+;\n/);
        eval(code[0]);
        console.log(issue);

        comment = '## 概要\n' +
            issue.description.replace(/# /g, '### ')+
            '\n' +
            '\n' +
            '## 技術的変更点概要\n' +
            '\n' +
            '\n' +
            '## 重点的にレビューしてもらいたい箇所\n' +
            '\n' +
            '\n' +
            '## Related ticket\n' +
            url;

        $('.discussion-topic-header input').val('[STG][b'+ no + ']' + issue.summary);
        $('#pull_request_body').val(comment);
    });

    chrome.extension.sendRequest({set : {step : 'end'}});

});
