module.exports = (sequelize,DataTypes) => {
    let alias = 'Usuarios';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        nombre: DataTypes.STRING,
        correo: DataTypes.STRING,
        edad : DataTypes.STRING,
        password : DataTypes.STRING,
        token: DataTypes.STRING,
       
    }

    const productoCreate = sequelize.define(alias, cols);
    productoCreate.associate = function(models){
        productoCreate.hasMany(models.productos, {
            as : 'productos'
        })
    }
   
    
    return productoCreate;
}