/**
 *
 * @author
 *
 */
var SpriteBg = (function (_super) {
    __extends(SpriteBg, _super);
    function SpriteBg() {
        _super.call(this);
        var g = this.graphics;
        g.clear();
        g.lineStyle(1, 0xff0000);
        g.beginFill(0x000000, 1);
        g.drawRect(0, 0, 480, 800);
        g.endFill();
    }
    var __egretProto__ = SpriteBg.prototype;
    return SpriteBg;
})(egret.Sprite);
SpriteBg.prototype.__class__ = "SpriteBg";
//# sourceMappingURL=SpriteBg.js.map