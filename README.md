# **瀑布流布局**

`    window.onload=function(){
        var sheng = new shengs('main','box');//实例化插件
        sheng.init();//调用初始化
        /*测试数据*/
        var json ={data:[{'src':'0.jpeg'},{'src':'1.jpeg'},{'src':'2.jpeg'},{'src':'3.jpeg'},{'src':'4.jpeg'},{'src':'1.jpeg'}]}
        window.onscroll=function(){
            sheng.onscroll(json);//滚动触发时执行
        }
    }`