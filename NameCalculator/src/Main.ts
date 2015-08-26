class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    
    private txtName: egret.TextField;
    
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        //var sky:egret.Bitmap = this.createBitmapByName("bgImage");
        this.addChild(new SpriteBg());
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        //sky.width = stageW;
        //sky.height = stageH;

        var txtTip: egret.TextField = new egret.TextField();
        txtTip.text = "请输入你的名字：";
        txtTip.x = 10;
        txtTip.y = stageH * 0.5 + 50;
        txtTip.textColor = 0xffffff;
        txtTip.textAlign = "left";
        txtTip.size = 20;
        this.addChild(txtTip);
        
        this.txtName = new egret.TextField();
        this.txtName.type = egret.TextFieldType.INPUT;
        this.txtName.border = true;
        this.txtName.borderColor = 0xfff000;
        this.txtName.x = stageW * 0.5 - 50;
        this.txtName.y = stageH * 0.5 + 50;
        this.txtName.width = 100;
        this.txtName.height = 30;
        this.addChild(this.txtName);
        
        var test: egret.TextField = new egret.TextField();
        test.border = true;
        test.borderColor = 0xfffff0;
        test.x = stageW * 0.5 + 100;
        test.y = stageH * 0.5 + 50;
        test.touchEnabled = true;
        test.text = "开始测试";
        test.width = 100;
        test.height = 30;
        test.textAlign = egret.HorizontalAlign.CENTER;
        test.verticalAlign = egret.VerticalAlign.MIDDLE;
        test.size = 20;
        test.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTest, this);
        this.addChild(test);
    }

    private result: ResultPanel;
    
    private onTest(evt: egret.TouchEvent): void
    {
        if(this.txtName.text == '' || this.txtName.text == null) return;
        console.log("test text clicked!");
        if(this.result == null)
        {
            this.result = new ResultPanel();
            this.addChild(this.result);
        }
        var r:number = this.executeAlgorithm(this.txtName.text);
        this.result.setResult(r);
        this.result.visible = true;
        this.txtName.text = "";
    }
    
    private executeAlgorithm(text: string): number
    {
        var charLen: number = text.length;
        var uu: number = 0;
        for(var i: number = 0;i < charLen;i++)
        {
            var unicode:number = text.charCodeAt(i);
            console.log("unicode:" + unicode);
            uu += unicode;
        }
        //名字算法基础
        return 1;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser:egret.HtmlTextParser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield:egret.TextField = self.textfield;
        var count:number = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


