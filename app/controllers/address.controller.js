const { Address } = require('../../app/database/db.js');

const createAddress = async (req, res) => {

    const { data } = req.body;

    ///const point = { type: 'Point', coordinates: [-76.984722, 39.807222]}; GeoJson format: [longitud, latitud]

    try {
        const address = await Address.create(data);

        res.status(201).json({ status: 'OK', success: true, data: address });
    } catch (err) {
        res.status(400).json({ status: 'FAILED', success: false, error: err });
    }

}

const updateAddress = async (req, res) => {

    const { id } = req.params;
    const { data } = req.body

    console.log(id);

    const address = await Address.findByPk(id)
    if (!address) {
        return res.status(404).json({ status: 'FAILED', success: false, error: 'La direccion que intentaste modificar no existe' });
    }
    try {
        const updatedAddress = await Address.update(data, {
            where: {
                id: id
            }
        })

        res.status(201).json({status: 'OK', success: true, data: updatedAddress})
    } catch (err) {

        console.log(err);
        return res.status(400).json({ status: 'FAILED', success: false, error: err });
    }
}

module.exports = { createAddress, updateAddress };