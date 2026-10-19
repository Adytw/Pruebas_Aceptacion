# language: es
Característica: Carrito de compras
  Para saber cuánto voy a pagar
  Como cliente
  Quiero agregar productos y ver el total correcto en mi carrito

  Escenario: Ver el total al agregar dos cuadernos
    Dado que abro la tienda y el carrito está vacío
    Cuando agrego 2 unidades de "cuaderno"
    Entonces veo 2 artículos y un total de "$20.00"