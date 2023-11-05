export enum Mensajes_Inventario {
  Producto_Eliminado_Success = 'Producto eliminado con éxito',
  Producto_Eliminado_Error = 'Error al eliminar el producto',

  Producto_Actualizado_Success = 'Producto actualizado con éxito',
  Producto_Actualizado_Error = 'Error al actualizar el producto',

  Producto_Agregar_Existente = 'El producto ya existe',
  Producto_Agregar_Succes = 'Producto agregado con éxito',
  Producto_Agregar_Error = 'Error al agregar el producto',

  Cargando_Productos = 'Cargando productos...',
  Cargando_Productos_Error = 'Error al cargar los productos',
  Cargando_Productos_Vacio = 'No hay productos registrados',
}

export enum Mensajes_Productos_Modificar {

  Producto_Cargando_ID = 'Cargando producto por ID...',
  Producto_Cargando_ID_Error = 'Error al cargar el producto por ID',
  Producto_Cargando_ID_Vacio = 'Por favor ingrese un ID válido',

  Producto_Modificar_Success = 'Producto modificado con éxito',
  Producto_Modificar_Error = 'Error al modificar el producto',
  Producto_Modificar_Cargando = 'Modificando producto...',

  Producto_Eliminar_Success = 'Producto eliminado con éxito',
  Producto_Eliminar_Error = 'Error al eliminar el producto',
  Producto_Eliminar_Cargando = 'Eliminando producto...',
}

export enum Mensajes_Ventas {

  Venta_Productos_Success = 'Venta de productos realizada con éxito',
  Venta_Productos_Error = 'Error al realizar la venta de productos',
  Venta_Producto_Cargando = 'Realizando venta de producto...',

  Producto_Agregado_Success = 'Producto agregado con éxito',
  Producto_Agregado_Error = 'Error al agregar el producto',

  Busqueda_ID_Producto_Error = 'Error al buscar el producto por ID',
  Busqueda_ID_Producto_Success = 'Producto encontrado',
  Busqueda_ID_Producto_No_Exist = 'No existe el producto',
  Busqueda_ID_Producto_Vacio = 'Por favor ingrese un ID válido',
  Busqueda_ID_Producto_Cargando = 'Buscando producto en el inventario por ID...',

  Monto_Pago_Vacio = 'Por favor ingrese un monto válido',
  Monto_Pago_Error = 'Error al ingresar el monto',
  Monto_Pago_Menor = 'El monto ingresado es menor al total a pagar',

}

export enum Mensajes_Login {
  Login_Success = 'Login exitoso',
  Login_Error = 'Error al iniciar sesión',
  Login_Cargando = 'Iniciando sesión...',
}
