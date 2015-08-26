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
        
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
	}
	
    private onTouch(evt: egret.TouchEvent): void
    {
        this.visible = false;
    }
	
    public setResult(result: number): void
    {
        var texture:egret.Texture = RES.getRes(this.getInfoByResult(result));
        if(this.icon == null) {
            this.icon = new egret.Bitmap();
            this.icon.anchorX = this.icon.anchorY = 0.5;
            this.addChild(this.icon);
            this.icon.x = 480 / 2;
            this.icon.y = 800 / 2 - 60;
            this.icon.scaleX = 0.55;
            this.icon.scaleY = 0.55;
        }
        this.icon.texture = texture;
    }
    
    private getInfoByResult(result:number): string
    {
        var r: string = "";
        switch(result)
        {
            case 1:
            {
                r = "egretIcon";
                break;
            }
            case 2:
            {
                r = "egretIcon";
                break;
            }
            case 3:
            {
                r = "egretIcon";
                break;
            }
            case 4:
            {
                r = "egretIcon";
                break;
            }
            default:
            {
                r = "";
                break;
            }
        }
        return r;
    }
}
