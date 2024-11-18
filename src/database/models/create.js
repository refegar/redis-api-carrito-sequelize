module.exports = (sequelize,DataTypes) => {
    let alias = 'productos';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        nombre: DataTypes.STRING,
        categoria: DataTypes.STRING,
        precio : DataTypes.STRING,
        image : DataTypes.STRING
       
    }

    const productoCreate = sequelize.define(alias, cols);
    productoCreate.associate = function(models){
        productoCreate.hasMany(models.productos, {
            as : 'productos'
        })
    }
   
    
    return productoCreate;
}