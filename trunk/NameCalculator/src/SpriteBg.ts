/**
 *
 * @author 
 *
 */
class SpriteBg extends egret.Sprite{
	public constructor() 
	{
        super();
        
        var g: egret.Graphics = this.graphics;
        g.clear();
        g.lineStyle(1,0xff0000);
        g.beginFill(0x000000,1);
        g.drawRect(0, 0, 480, 800);
        g.endFill();
        
        var bmp: egret.Bitmap = new egret.Bitmap();
        bmp.texture = RES.getRes("1");
        bmp.x = (this.width - bmp.width) * 0.5;
        this.addChild(bmp);
	}
}
