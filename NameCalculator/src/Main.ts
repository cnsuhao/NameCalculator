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
    
    public result: ResultPanel;
    public share: SharePanel;
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

        /*var txtTip: egret.TextField = new egret.TextField();
        txtTip.text = "请输入你的名字：";
        txtTip.x = 10;
        txtTip.y = stageH * 0.5 + 50;
        txtTip.textColor = 0xffffff;
        txtTip.textAlign = "left";
        txtTip.size = 20;
        this.addChild(txtTip);*/
        
        var inputBg:egret.Bitmap = new egret.Bitmap();
        inputBg.x = 135;
        inputBg.y = 515;
        inputBg.texture = RES.getRes("input_box_png");
        this.addChild(inputBg);
        
        this.txtName = new egret.TextField();
        this.txtName.type = egret.TextFieldType.INPUT;
        //this.txtName.border = true;
        this.txtName.borderColor = 0xfff000;
        this.txtName.x = 135;
        this.txtName.y = 515;
        this.txtName.width = 220;
        this.txtName.height = 50;
        this.addChild(this.txtName);
        
        var test: egret.Bitmap = new egret.Bitmap();
        test.x = 188;
        test.y = 600;
        test.texture = RES.getRes("start_test_png");
        test.touchEnabled = true;
        test.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTest, this);
        this.addChild(test);
        
        this.result = new ResultPanel();
        this.addChild(this.result);
        this.result.visible = false;
        
        this.share = new SharePanel();
        this.share.visible = false;
        this.addChild(this.share);
    }

    private onTest(evt: egret.TouchEvent): void
    {
        if(this.txtName.text == '' || this.txtName.text == null) return;
        console.log("test text clicked!");
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
        return uu % 6 + 2;
    }

}


