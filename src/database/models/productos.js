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
        descripcion: DataTypes.STRING,
        precio : DataTypes.STRING,
        image : DataTypes.STRING,
       
    }
 
    const productos = sequelize.define(alias, cols);
    return productos;
}