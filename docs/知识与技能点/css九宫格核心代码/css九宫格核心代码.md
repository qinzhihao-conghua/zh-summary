---
title: css九宫格核心代码
---

九宫格主要是为了处理异形UI的问题，一般不建议所有页面布局都采用异性UI，一般是大屏才会用到

```css
<style>
        .sg-card {
            // 公共变量定义----------------------------------------
            $card-bg: "~@/assets/common/sg-card/"; //异形背景图片路径前缀
            $card-bg-color: #020f2e; //中间背景纯色
            $l_w: 46px; //左侧边界宽度
            $r_w: 88px; //右侧边界宽度
            $t_h: 72px; //顶部边界高度
            $b_h: 46px; //底部边界高度
            // ----------------------------------------

            display: inline-block; //这个根据实际情况来（非必选）

            min-width: calc(#{$l_w} + #{$r_w}); //最小宽度等于左右两端边界宽度之和
            min-height: calc(#{$t_h} + #{$b_h}); //最小高度等于上下两端边界高度之和

            background-color: $card-bg-color; //背景色

            background-repeat: no-repeat; //一定要用不平铺的属性

            // 核心代码----------------------------------------
            background-image: // 顶部左、中、右
            url(#{$card-bg}lt.png),
            url(#{$card-bg}mt.png),
            url(#{$card-bg}rt.png),
            // 中间层左、 右
            url(#{$card-bg}lm.png),
            url(#{$card-bg}rm.png),
            // 底部左、中、右
            url(#{$card-bg}lb.png),
            url(#{$card-bg}mb.png),
            url(#{$card-bg}rb.png);

            background-position:
                // 顶部左、中、右
                left top, $l_w top, right top,
                // 中间层左、 右
                left $t_h, right $t_h,
                // 底部左、中、右
                left bottom, $l_w bottom, right bottom;

            background-size: // 顶部左、中、右
            $l_w $t_h,
            calc(100% - #{$l_w} - #{$r_w}) $t_h,
            $r_w $t_h,
            // 中间层左、 右
            $l_w calc(100% - #{$t_h} - #{$b_h}),
            $r_w calc(100% - #{$t_h} - #{$b_h}),
            // 底部左、中、右
            $l_w $b_h,
            calc(100% - #{$l_w} - #{$r_w}) $b_h,
            $r_w $b_h;
            // ----------------------------------------
        }
</style>
```

