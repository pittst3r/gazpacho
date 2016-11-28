global._queue = global._queue || [];

export default {
  pusher(type, ...prependArgs) {
    return (...typeArgs) => {
      let allArgs = prependArgs.concat(typeArgs);

      this.push(new type(...allArgs));
    };
  },

  push(object) {
    global._queue.push(object);
  },

  shift() {
    return global._queue.shift();
  },

  count() {
    return global._queue.length;
  },
};
