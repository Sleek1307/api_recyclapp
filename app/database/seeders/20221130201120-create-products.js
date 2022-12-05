'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let categories = [
      {name: 'Vidrio', description: 'Es vidrio, no hay mucho que decir'}, 
      {name: 'Papel', description: 'Documentos de oficina, periodico o revista'},
      {name: 'Carton', description: 'Carton o cajas de embalaje'},
      {name: 'Hojalata', description: 'Latas de conserva'}
    ]

    await queryInterface.bulkInsert('categories', categories, {});

    let products = [
      {name: 'Revistas', description: '',category_id: 2},
      {name: 'Periodico', description: '', category_id: 2},
      {name: 'Libros', description: '', category_id: 2},
    ]

    await queryInterface.bulkInsert('products', products, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
