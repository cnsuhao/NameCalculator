/**
 *
 * @author
 *
 */
var ResultPanel = (function (_super) {
    __extends(ResultPanel, _super);
    function ResultPanel() {
        _super.call(this);
        var g = this.graphics;
        g.clear();
        //g.lineStyle(1,0xff0000);
        g.beginFill(0x000000, 1);
        g.drawRect(0, 0, 480, 800);
        g.endFill();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }
    var __egretProto__ = ResultPanel.prototype;
    __egretProto__.onTouch = function (evt) {
        this.visible = false;
    };
    __egretProto__.setResult = function (result) {
        var texture = RES.getRes(result);
        if (this.icon == null) {
            this.icon = new egret.Bitmap();
            this.icon.anchorX = this.icon.anchorY = 0.5;
            this.addChild(this.icon);
            this.icon.x = 480 / 2;
            this.icon.y = 800 / 2 - 60;
            this.icon.scaleX = 0.55;
            this.icon.scaleY = 0.55;
        }
        this.icon.texture = texture;
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    __egretProto__.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return ResultPanel;
})(egret.Sprite);
ResultPanel.prototype.__class__ = "ResultPanel";
//# sourceMappingURL=ResultPanel.js.map