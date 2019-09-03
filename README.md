# react-native-refresh
原生集成的下拉刷新。

# 原理
此库iOS基于MJRefresh，安卓基于SmartRefreshLayout，均是原生中使用非常广泛的下拉刷新库。
此库只提供基础的Base部分，但是Demo中提供了两种此库的用法，一个是默认的文字形式，一个是结合lottie实现的下拉刷新动画。
基于此库可以实现你想实现的任意刷新效果，后面会慢慢孵化出基于此库而开发的各种效果的下拉刷新。这也是为何此库只有基础部分的原因。

# 注意！！！
- 支持0.59，使用Android X的开发者在项目根目录执行 `npx jetify`。
- 近期会再出一个版本，支持RN0.57 - 0.58。
- 0.57以下，因为RN iOS平台的ScrollView添加RefreshControl的方式还未改变，不支持自定义，需要改动ScrollView源码才能实现，故不会适配。
- 如果使用上遇到问题或者疑惑，请提交issue，比较着急的话请加我QQ：593908937。

例子待完善
