const SettingModel = require('../models/setting');

exports.post = async function (req, res) {
  try {
    const model = new SettingModel(req.body);

    const doc = await model.save();

    if (!doc || doc.length === 0) {
      return res.status(500).send(doc);
    }

    res.status(201).json({
      message: "Setting created",
      lesson_info: doc
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.put = async function (req, res) {
  try {
    const result = await SettingModel.findByIdAndUpdate(req.setting, req.body, { new: true });

    res.json(result);

  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.get = async function (req, res) {
  try {
    const result = await SettingModel.findById(req.setting);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};