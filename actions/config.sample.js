chrome.extension.sendRequest({
    set: {
        config: {
            git: {
                repo: 'your-account/your-repo', //紐づくgitリポジトリ
                target_branches: {master:'master', staging:'staging'}, //PRを投げたいブランチ
                prefix: 'b', //gitのブランチには、backlogの数字の頭に何をつけるルールか？（例： fix/b1234_fix_test なら b ）
            },
            backlog: {
                base_url: 'https://your-inc.backlog.jp', //backlogのURL
            },
            slack: {
                report_url: 'https://your-inc.slack.com/messages/ABCDEFG/', //進捗を報告したいslackチャンネル
                report_who: '@yamada' //報告したい人のslackアカウント（複数可）
            }
        }
    }
});