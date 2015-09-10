/**
 *
 * @author 
 *
 */
class SharePanel extends egret.Sprite{
	public constructor() 
	{
        super();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        
        var g: egret.Graphics = this.graphics;
        g.clear();
        g.beginFill(0x000000,0.7);
        g.drawRect(0, 0, Globals.WIDTH, Globals.HEIGHT);
        g.endFill();
        
        var share: egret.Bitmap = new egret.Bitmap();
        share.texture = RES.getRes("share_tips_png");
        share.x = (this.width - share.texture.textureWidth) * 0.5 + 35;
        share.y = 20;
        this.addChild(share);
	}
	
    private onTap(event: egret.TouchEvent): void
    {
        this.visible = false;
    }
}
