const { mailer, mailercontact,mailerCompra } = require("./mailer-controller");

const register = async (req, res, next) => {
  const { Correo, Nombre } = req.body;
  await mailer(
      Correo,
      `Registro Usuario`,
      `<div style="font-family: 'Mulish', sans-serif; font-size: 16px; color:black;">
      <div style="padding-left:10px;">
      <p><span><strong>Datos de registro</strong></span>
      <br>
      <span><strong>E-mail:</strong> ${Correo}</span>
      <br>
      <span><strong>Nombre:</strong> ${Nombre}</span></p>
      </div>
        <div style="background-color: #f7f7f7; padding:10px; border-radius: 20px; color:black;">
          <h4>Un cordial Saludo </h4>
          <p>Nuestro equipo le agradece por registrarse en nuestro sitio recuerde que para
           nosotros es muy importante su opiniones sobre nuestro sitio Shabu - sushi </p>    
        </div>
        <h4>Cualquier solicitud estaremos pendientes mucha gracias</h4>
      </div>`,
      "user_creation",
      Correo,
  );

  return res.status(200).json("ok");
};

const comprasConfirm = async (req, res, next) => {
  const { correo, usuario, productos, totalCompra } = req.body; // `productos` es un array de objetos
  let detallesProductos = '';

  // Recorre cada producto para construir la lista de detalles
  productos.forEach((producto) => {
      detallesProductos += `
        <div style="margin-bottom: 10px;">
          <p><strong>Producto:</strong> ${producto.nombre}</p>
          <p><strong>Categoría:</strong> ${producto.categoria}</p>
          <p><strong>Precio Unitario:</strong> $${producto.precio}</p>
          <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
          <p><strong>Envío:</strong> $${producto.envio}</p>
          <p><strong>Subtotal:</strong> $${producto.precioTotal}</p>
          <hr/>
        </div>
      `;
  });

  // Envía un solo correo con todos los productos y el total
  await mailerCompra(
      correo,
      `Compra exitosa`,
      `<div style="font-family: 'Mulish', sans-serif; font-size: 16px; color:black;">
        <div style="padding-left:10px;">
            <h4>Saludos cordiales</h4>
            <div style="background-color: #f0f0f0; padding: 20px; border-radius: 10px; color: black;">
                <h3>Detalles de la Compra</h3>
                <p><strong>Usuario:</strong> ${usuario}</p>
                ${detallesProductos} <!-- Inserta aquí los detalles de cada producto -->
                <p><strong>Precio Total de la Compra:</strong> $${totalCompra}</p>
            </div>
            <p>Esperamos que disfrutes tu compra y recuerda que cualquier solicitud o pregunta, estaremos atentos para ayudarte.</p>
            <p>El equipo de Shabu - Sushi</p>   
            <h4>Cualquier solicitud estaremos pendientes, muchas gracias</h4>
        </div>`,
      "user_creation",
      correo,
  );

  return res.status(200).send("Compra Exitosa");
};


const contacto = async (req, res, next) => {
  const { Correo, Nombre, url } = req.body;
  await mailer(
      Correo,
      "Recuperar Contraseña",
      `<div style="font-family: 'Mulish', sans-serif; font-size: 16px; color:black;">
      <div style="padding-left:10px;">
        <p><span>Su cuenta fue verificada por nosotros y sus datos son:</span></p>
        <p><span><strong>E-mail:</strong> ${Correo}</span>
      <br>
      <span><strong>Nombre:</strong> ${Nombre}</span></p>
      </div>
        <div style="background-color: #f7f7f7; padding:10px; border-radius: 20px; color:black;">
          <h4>Un cordial saludo</h4>
          <p>Nuestro equipo le ha generado un enlace para que pueda recuperar su contraseña.
          Por favor, haga clic en el siguiente link y completar los datos: <a href="${url}">¡Click Aquí!</a></p>
          <h3>Estaremos atentos mucha gracias</h3>
        </div>
      </div>`,
      Correo,
      "user_creation"
  );

  return res.status(200).json("ok");
 };

module.exports = {
    register,
    contacto,
    comprasConfirm
};
