var Game = Game || {};

Game.pathIndex = {
  left : 0,
  up : 1,
  down: 2,
  right: 3,
  count: 4,
  complementaryIndex: function complementaryIndex(ix) {
    return ix===Game.pathIndex.left ? Game.pathIndex.right :
      ix===Game.pathIndex.right ? Game.pathIndex.left :
      ix===Game.pathIndex.up ? Game.pathIndex.down :
      ix===Game.pathIndex.down ? Game.pathIndex.up :
      undefined;
  }
};