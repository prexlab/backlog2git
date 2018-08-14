/**
 * StagingPRから、MasterPRを生成する
 */
chrome.extension.sendRequest({get : true}, function(response) {

    var funcs = {
        0: function(response){

            var git_base_url = document.location.href.match(/^(https:\/\/github.com\/.+?\/.+?)\//)[1];

            var branch = $('.commit-ref.head-ref').text();
            var title = $('.js-issue-title').text().replace(/ +/g, '').replace(/\[(staging|STG)\]/g, '[MASTER]');
            var desc = $('textarea.form-control').val();

            document.location.href = git_base_url + '/compare/master...' + branch;

            chrome.extension.sendRequest({set : {params: {title: title, desc:desc}, step : 1}});

        },
        1: function(response){

            $('.compare-pr-placeholder button').click();

            chrome.extension.sendRequest({set : {step : 2}});

        },
        2: function(response){

            $('.discussion-topic-header input').val(response.params.title);
            $('#pull_request_body').val(response.params.desc);

            chrome.extension.sendRequest({set : {step : 'end'}});
        }
    };


    funcs[response.step] ? funcs[response.step](response) :null;

});
