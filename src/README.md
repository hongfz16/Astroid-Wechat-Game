## 项目目录介绍
```
├──./audio                                 // 游戏音效存放目录
├──./js                                    // 源码目录
├──./pics                                  // 游戏图片资源目录
├──game.js                                 // 小游戏主入口文件
├──game.json                               // 小游戏配置文件
└──project.config.json                     // 项目配置文件
```

## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   ├── geometry.js                        // 实现点、圆、向量等基本几何类
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── OpenDataContext
│   ├── constant.js                        // 开放数据域游戏常数
│   ├── index.js                           // 开放数据域监听主域消息
│   └── leaderboard.js                     // 开放数据域中绘制排行榜类
├── WelcOver
│   ├── over.js                            // 游戏结束界面类
│   └── welcome.js                         // 欢迎界面类
├── astroid
│   └── astroid.js                         // 陨石类
├── bullet
│   └── bullet.js                          // 子弹类
├── constant
│   └── constant.js                        // 全局共享的游戏常数
├── enemy
│   └── enemy.js                           // 外星飞船类
├── gameinfo
│   └── gameinfo.js                        // 游戏信息显示类
├── leaderboard
│   └── leaderboard.js                     // 排行榜类
├── life
│   └── life.js                            // 生命信息类
├── list
│   ├── linkerlist.js                      // 双向链表类
│   └── listElement.js                     // 链表节点类
├── music
│   └── music.js                           // 播放音乐类
├── playing
│   ├── playing.js                         // 冒险模式界面类
│   └── survivalplaying.js                 // 生存模式界面类
├── player
│   └── player.js                          // 玩家类
└── main.js                                // 游戏入口主函数

```