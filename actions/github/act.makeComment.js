/**
 * 貼り付け用のコメントを生成する
 */
chrome.extension.sendRequest({get : true}, function(response) {

    //Slackリンク先
    slack_url = response.config.slack.report_url;

    //backログリンク先
    dev_id = $('.commit-ref.head-ref').text().match(/b([0-9]+)_/)[1];
    backlog_url = response.config.backlog.base_url + '/view/DEV-' + dev_id;


    base = $('.commit-ref:eq(0)').text();
    state = $('.State:eq(0)').text().replace(/\s+/g, '');

    var dom =
        "<div id='my-insert-box'><a href='%BACKLOG_URL%' target='_blank'>%BACKLOG_URL%</a><br>" +
        "<textarea >%BASE% %STATE% \n" +
        "%THIS_URL% </textarea>" +

        "<a href='%SLACK_URL%' target='_blank'>%SLACK_URL%</a> <br>" +
        "<textarea >%WHO% %BASE% PRです。査収ください \n" +
        "%THIS_URL% </textarea></div>";

    console.log(dom);

    dom = dom.replace(/%BACKLOG_URL%/g, backlog_url)
        .replace(/%BASE%/g, base)
        .replace(/%WHO%/g, response.config.slack.report_who)
        .replace(/%SLACK_URL%/g, slack_url)
        .replace(/%STATE%/g, state)
        .replace(/%THIS_URL%/g, document.location.href);


    $('#my-insert-box').remove();
    $('.tabnav.tabnav-pr').after(dom);


    $('#my-insert-box textarea').click(function(){
        $(this).select();
    });

    chrome.extension.sendRequest({set : {step : 'end'}});

});
