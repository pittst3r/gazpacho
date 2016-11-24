global._queue = global._queue || [];

export default {
  pusher(type) {
    return (...typeArgs) => {
      this.push(new type(...typeArgs));
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
