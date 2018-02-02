var Cell = function (initial) {
  var value = initial;

  var get = function () {
    return value;
  };

  var set = function (v) {
    value = v;
  };

  var clone = function () {
    return Cell(get());
  };

  return {
    get: get,
    set: set,
    clone: clone
  };
};

export default <any> Cell;