chrome.extension.sendRequest({get: true}, function (response) {

    var actionProvider = [
        {exp: 'github.com/.+/pull/', flag: function(){
            //return true;
            return $('.base-ref').text().replace(/\s+/g, '') == 'staging'
                && $('.State:eq(0)').text().replace(/\s+/g, '') == 'Merged';

            }, file: 'actions/github/act.copyMaster.js'},
        {exp: 'github.com/.+/compare/staging',  file: 'actions/github/act.copyStaging.js'},
        {exp: 'github.com/.+/pull/',  file: 'actions/github/act.makeComment.js'},
        {exp: '.backlog.jp/view/DEV-', file: 'actions/backlog/act.js'},
        {exp: '.backlog.jp/find/DEV', file: 'actions/backlog/act.list.js'},
    ];

    if(response.import){

        chrome.extension.sendRequest({import: response.import});

    }else{

        for (var i in actionProvider) {
            if (document.location.href.match(new RegExp(actionProvider[i].exp))
            && (actionProvider[i].flag ? actionProvider[i].flag() : true)) {

                console.log('import: ' + actionProvider[i].file);
                chrome.extension.sendRequest({import: actionProvider[i].file});
                return;
            }
        }

        console.log('no task!');
        chrome.extension.sendRequest({set : {step : 'end'}});
    }

});

