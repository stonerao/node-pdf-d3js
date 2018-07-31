module.exports = {
    index: __dirname,
    opp: {
        "meta": {
            "type": 3, // 类型1=>年 2=>月 3=>周 
            "num": 4, // 表示第几年或第几月或第几周, 比如4表示第4周
            "start": "20180723", // 开始日期
            "end": "20180729" // 结束日期

        },

        "attack": {
            "total": 8420, // 总数
            "medium": 1364, // 中级
            "normal": 7053, // 一般
            "high": 3, // 严重
            "current": [ // 本周(或月或年)数据
                {
                    "name": "20180723",
                    "value": 144
                },
                {
                    "name": "20180724",
                    "value": 333
                },
                {
                    "name": "20180725",
                    "value": 2
                },
                {
                    "name": "20180726",
                    "value": 0
                },
                {
                    "name": "20180727",
                    "value": 0
                },
                {
                    "name": "20180728",
                    "value": 0
                },
                {
                    "name": "20180729",
                    "value": 0
                }
            ],
            "last": [ // 上周(或月或年)数据
                {
                    "name": "20180716",
                    "value": 0
                },
                {
                    "name": "20180717",
                    "value": 0
                },
                {
                    "name": "20180718",
                    "value": 0
                },
                {
                    "name": "20180719",
                    "value": 22
                },
                {
                    "name": "20180720",
                    "value": 0
                },
                {
                    "name": "20180721",
                    "value": 11
                },
                {
                    "name": "20180722",
                    "value": 0
                }
            ],
            "top_src_area": [ // 安全事件攻击源排名
                {
                    "name": "局域网",
                    "count": 4401
                },
                {
                    "name": "美国",
                    "count": 972
                },
                {
                    "name": "中国",
                    "count": 601
                },
                {
                    "name": "俄罗斯",
                    "count": 466
                },
                {
                    "name": "巴西",
                    "count": 421
                },
                {
                    "name": "法国",
                    "count": 392
                },
                {
                    "name": "德国",
                    "count": 377
                },
                {
                    "name": "印度",
                    "count": 207
                },
                {
                    "name": "澳大利亚",
                    "count": 197
                },
                {
                    "name": "阿联酋",
                    "count": 194
                }
            ],

            "top_tar_ip": [ //被攻击最多的IP排名
                {
                    "name": "192.168.1.15",
                    "count": 3690
                },
                {
                    "name": "192.168.1.3",
                    "count": 1518
                },
                {
                    "name": "192.168.1.6",
                    "count": 1059
                },
                {
                    "name": "192.168.1.5",
                    "count": 729
                },
                {
                    "name": "192.168.1.4",
                    "count": 714
                }
            ]
        },
        "asset_alarm": { //资产报警
            "normal": 0, // 一般
            "total": 0, // 总数
            "high": 0, // 严重
            "medium": 0, // 较重
            "current": [ // 本周(或月或年)数据
                {
                    "name": "20180723",
                    "value": 0
                },
                {
                    "name": "20180724",
                    "value": 50
                },
                {
                    "name": "20180725",
                    "value": 0
                },
                {
                    "name": "20180726",
                    "value": 0
                },
                {
                    "name": "20180727",
                    "value": 23
                },
                {
                    "name": "20180728",
                    "value": 0
                },
                {
                    "name": "20180729",
                    "value": 0
                }
            ],
            "top_ip": [ //告警最多的IP排名
                {
                    "name": "192.168.1.15",
                    "count": 3690
                },
                {
                    "name": "192.168.1.3",
                    "count": 1518
                }
            ]
        },
        "index": { // 组合指数
            "current": [{
                    "name": "20180723",
                    "value": 0.1
                },
                {
                    "name": "20180724",
                    "value": 3.1
                },
                {
                    "name": "20180725",
                    "value": 2.1
                },
                {
                    "name": "20180726",
                    "value": 3.1
                },
                {
                    "name": "20180727",
                    "value": 1.2
                },
                {
                    "name": "20180728",
                    "value": 4.5
                },
                {
                    "name": "20180729",
                    "value": 0
                }
            ]
        }
    }
}