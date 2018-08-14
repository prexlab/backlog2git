/**
 * バックログ詳細ページに対応する、Git情報をとってきて表示する
 */
chrome.extension.sendRequest({get : true}, function(response) {

    var config = {
        repo: response.config.git.repo,
        branches: [response.config.git.target_branches.master, response.config.git.target_branches.staging],
        prefix: response.config.git.prefix
    };

    //backlogIDを取得
    var dev_id = response.this_tab.url.match(/DEV-([0-9]+)/)[1];
	//console.log(dev_id);

	var git_url = 'https://github.com/';
	var git_base_url = git_url + config.repo;
    //どこに表示するか？　#projectNavList, .comment-list, #issuecard
    var append_after = '.ticket__title-group.title-group.-ticket';

    console.log(response.step);

    $('#git-prs').remove();
    $(append_after).after('<div id="git-prs" ><h4>Assoc GitHub Branch <span id="git-assoc-branch"></span>. Start PR to: <span id="git-start-pr" ></span></h4><ul></ul></div>');

    //PR開始URLを作成
	$.get(git_base_url + '/branches/all?query=' + config.prefix + dev_id,
		function(data){

	    //まず該当のブランチがあるか検索する
		var branch = $(data).find('.branch-name.css-truncate-target:eq(0)').text();

		if(branch){

		    $('#git-assoc-branch').text('[' + branch + ']');

		    var target_branch;
		    for(var i in config.branches) {

		        target_branch = config.branches[i];

                $('#git-start-pr').append(
                    '<a href="%url%" target="_blank">%target_branch%</a>'
                        .replace('%url%', git_base_url + '/compare/'+ target_branch +'...' + branch)
                        .replace('%target_branch%', target_branch)
                );
            }

		}else{
            $('#git-assoc-branch').text('[No related branch]');
		}
	});


	//既存のPRを検索
    $.get(git_base_url + '/pulls?q=is%3Apr+' + config.prefix + dev_id,
        function(data){

            var issues = $(data).find('[id^=issue_]');

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

    chrome.extension.sendRequest({set : {step : 'end'}});
});
