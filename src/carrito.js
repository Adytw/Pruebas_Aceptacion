class Carrito {
  constructor() {
    this.productos = [];
  }

  agregar(nombre, cantidad, precio) {
    this.productos.push({ nombre, cantidad, precio });
  }

  obtenerTotal() {
    return this.productos.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Carrito };
} else {
  globalThis.Carrito = Carrito;
}
