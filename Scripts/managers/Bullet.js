"use strict";
var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Bullet() {
            this._buildBulletPool();
        }
        // PRIVATE METHODS
        Bullet.prototype._buildBulletPool = function () {
            // initialize bullet number
            this._bulletNumber = 100;
            // create an empty container
            this._bulletPool = new Array();
            for (var count = 0; count < this._bulletNumber; count++) {
                var bullet = new objects.Bullet();
                this._bulletPool.push(bullet);
            }
        };
        // PUBLIC METHODS
        Bullet.prototype.AddBulletsToScene = function (scene) {
            this._bulletPool.forEach(function (bullet) {
                scene.addChild(bullet);
            });
        };
        Bullet.prototype.GetBullet = function () {
            // remove the bullet from the front of the pool
            var bullet = this._bulletPool.shift();
            bullet.isActive = true;
            // push the bullet to the back of the pool
            this._bulletPool.push(bullet);
            // return a reference to the active bullet
            return bullet;
        };
        Bullet.prototype.Update = function () {
            this._bulletPool.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=Bullet.js.map