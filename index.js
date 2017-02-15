/**
 * Created by shengzhenshuai on 17/2/16.
 */




(function(window){

    var shengs = function(p,b){
        this.p=p;
        this.b=b;
        var proto = shengs.prototype;

        proto.getByClass=function(){
            var parent = document.getElementById(this.p);
            var boxs = new Array();
            var allTag = parent.getElementsByTagName('*');
            for(var i=0;i<allTag.length;i++){
                if(allTag[i].className==this.b){
                    boxs.push(allTag[i]);
                }
            }
            //console.log(boxs)
            return boxs;
        }
        proto.getMinhIndex = function(arr,minh){
            for(var i in arr){
                if(arr[i]==minh){
                    return i;
                }
            }
        }

        proto.checkoutload = function(){

            var oboxs=this.getByClass();
            var lastboxh = oboxs[oboxs.length-1].offsetTop+Math.floor(oboxs[oboxs.length-1].offsetHeight/2);
            var scrolltop = document.body.scrollTop||document.documentElement.scrollTop;
            var height = document.body.clientHeight||document.documentElement.clientHeight;

            return scrolltop+height>lastboxh ? true:false;
        }

        proto.init = function(){

            var oparent = document.getElementById(this.p);
            var oboxs=this.getByClass();
            /*计算列表的列数*/
            var boxw = oboxs[0].offsetWidth;
            var wW = document.body.clientWidth||document.documentElement.clientWidth;
            var cls = Math.floor(wW/boxw);
            oparent.style.cssText='width:'+boxw*cls+'px;'+'margin:0 auto';
            var hArr = [];
            for(var i=0;i<oboxs.length;i++){
                if(i<cls){
                    var oboxh=oboxs[i].offsetHeight;
                    hArr.push(oboxh);
                }else{
                    var minh = Math.min.apply(null,hArr);
                    var index= this.getMinhIndex(hArr,minh);
                    oboxs[i].style.position='absolute';
                    oboxs[i].style.top=hArr[index]+'px';
                    oboxs[i].style.left=boxw*index+'px';
                    hArr[index]+=oboxs[i].offsetHeight;

                }
            }

        }
        proto.onscroll=function(json){
            if(this.checkoutload()){
                for(var i=0;i<json.data.length;i++) {
                    var box = document.createElement('div');
                    box.className = 'box';
                    var pic = document.createElement('div');
                    pic.className = 'pic';
                    box.appendChild(pic);
                    var img = document.createElement('img');
                    img.src = 'images/' + json.data[i].src;
                    pic.appendChild(img);
                    document.getElementById(this.p).appendChild(box);
                }
                this.init(this.p,this.b);
            }
        }


    }
    window.onload=function(){
        var sheng = new shengs('main','box');//实例化插件
        sheng.init();//调用初始化
        /*测试数据*/
        var json ={data:[{'src':'0.jpeg'},{'src':'1.jpeg'},{'src':'2.jpeg'},{'src':'3.jpeg'},{'src':'4.jpeg'},{'src':'1.jpeg'}]}
        window.onscroll=function(){
            sheng.onscroll(json);//滚动触发时执行
        }
    }

})(window)

