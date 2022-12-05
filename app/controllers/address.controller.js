const { Address } = require('../../app/database/db.js');

const createAddress = async (req, res) => {

    const { data } = req.body;

    ///const point = { type: 'Point', coordinates: [-76.984722, 39.807222]}; GeoJson format: [longitud, latitud]

    try {

        console.log(data);
        const address = await Address.create(data);

        console.log(address)

        res.status(201).json({ status: 'OK', success: true, data: address });
    } catch (err) {
        res.status(400).json({ status: 'FAILED', success: false, error: err });
    }

}

const updateAddress = async (req, res) => {

    const { id } = req.params;
    const { data } = req.body

    let updatedAddress = await Address.findByPk(id)
    if (!updatedAddress) {
        res.status(404).json({ status: 'FAILED', success: false, error: 'La direccion que intentaste modificar no existe' });
    }

    try {
        updateAddress = await Address.update(...data);
    } catch (error) {
        res.status(400).json({ status: 'FAILED', success: false, error: err });
    }
}

module.exports = { createAddress, updateAddress };