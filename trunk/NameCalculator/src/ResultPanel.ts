/**
 *
 * @author 
 *
 */
class ResultPanel extends egret.Sprite{
    private icon: egret.Bitmap;
    
	public constructor() {
        super();
        
        var g: egret.Graphics = this.graphics;
        g.clear();
        //g.lineStyle(1,0xff0000);
        g.beginFill(0x000000,1);
        g.drawRect(0, 0, 480, 800);
        g.endFill();
        
        if(this.icon == null) {
            this.icon = new egret.Bitmap();
            this.icon.anchorX = this.icon.anchorY = 0;
            this.addChild(this.icon);
        }
        
        /*var again: egret.Bitmap = new egret.Bitmap();
        again.x = 40;
        again.y = 690;
        again.texture = RES.getRes("again_png");
        again.touchEnabled = true;
        again.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch, this);
        this.addChild(again);*/
        
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch, this);
        
        var share: egret.Bitmap = new egret.Bitmap();
        share.texture = RES.getRes("share_png");
        share.x = (this.width - share.texture.textureWidth) * 0.5;
        share.y = 690;
        share.touchEnabled = true;
        share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShare, this);
        this.addChild(share);
	}
	
    private onTouch(evt: egret.TouchEvent): void
    {
        this.visible = false;
    }
    
    private onShare(evt: egret.TouchEvent): void
    {
        var main: Main = <Main>this.parent;
        main.share.visible = true;
    }
	
    public setResult(result: number): void
    {
        var texture:egret.Texture = RES.getRes(this.getInfoByResult(result));
        if(this.icon == null) {
            this.icon = new egret.Bitmap();
            this.icon.anchorX = this.icon.anchorY = 0;
            this.addChild(this.icon);
            /*this.icon.x = 480 / 2;
            this.icon.y = 800 / 2 - 60;
            this.icon.scaleX = 0.55;
            this.icon.scaleY = 0.55;*/
        }
        this.icon.texture = texture;
        this.x = (this.width - this.icon.width) * 0.5;
    }
    
    private getInfoByResult(result:number): string
    {
        var r: string = "";
        switch(result)
        {
            case 1:
            {
                r = "2";
                break;
            }
            case 2:
            {
                r = "3";
                break;
            }
            case 3:
            {
                r = "4";
                break;
            }
            case 4:
            {
                r = "5";
                break;
            }
            case 5:
            {
                r = "6";
                break;
            }
            case 6:
            {
                r = "7";
                break;
            }
            default:
            {
                r = "2";
                break;
            }
        }
        return r;
    }
}
