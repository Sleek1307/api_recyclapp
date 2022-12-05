const { Service, Product, User } = require('../database/db.js');

const createService = async (req, res) => {
  const { service, products } = req.body;

  try {
    const newService = await Service.create(service);

    products.map(async (product) => {
      const producto = await Product.findByPk(product.id)
      newService.addProduct(producto);
    })

    res.status(201).send({ status: 'OK', data: service });
  } catch (error) {

    if (error.parent.errno === 1452) {
      if (error.fields[0] === "origin_id") {
        res.status(404).send({ status: 'FAILED', error: 'El usuario que desea hacer el servicio no fue encontrado' });
      }
    }
    res.status(400).send({ status: 'FAILED', error: error });
  }
};

const getOneService = async (req, res) => {

  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      res.status(404).json({ status: 'NOT FOUND', succes: false, error: 'El servicio solicitado no existe' });
    }

    res.status(200).json({ status: 'OK', data: service });
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err })
  }

};

const getAllServices = async (req, res) => {
  try {
    const service = await Service.findAll();

    res.status(200).json({ status: 'OK', success: true, data: service })
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err })
  }
};

const getServiceByDate = async (req, res) => {

  const { date } = req.body

  try {
    const service = await Service.findAll({
      where: {
        created_at: date,
      }
    });

    res.status(200).json({ status: 'OK', success: true, data: service })
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err })
  }
};

const getServiceByOrigin = async (req, res) => {
  const { origin } = req.body

  try {
    const service = await Service.findAll({
      where: {
        origin_id: origin,
      }
    });

    res.status(200).json({ status: 'OK', success: true, data: service })
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err })
  }
};

const getServicesByRecolector = async (req, res) => {
  const { recolector } = req.body;

  try {
    const service = await Service.findAll({
      where: {
        recolector_id: recolector,
      }
    })

    res.status(200).json({ status: 'OK', success: true, data: service });
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const { recolectorId } = data;

  let recolector;
  if (recolectorId) {
    recolector = await User.findByPk(id);
    if (!recolector) {
      return res.status(404).status({ status: 'OK', success: false, error: 'El recolector que ingresaste no existe' })
    }
  }

  try {
    const updatedService = await Service.update({
      ...data
    }, {
      where: {
        id: id
      }
    });
    return res.status(200).json({ status: 'OK', success: true, data: updatedService });
  } catch (err) {
    return es.status(400).json({ status: 'FAILED', success: false, error: err });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Service.destroy();

    res.status(200).json({ status: 'OK', success: true, data: 'Servicio eliminado con exito' });
  } catch (err) {
    res.status(400).json({ status: 'FAILED', success: false, error: err });
  }
};

module.exports = { createService, getOneService, getAllServices, getServiceByDate, getServiceByOrigin, getServicesByRecolector, updateService, deleteService };