const UserModel = require('../models/user');
const SettingModel = require('../models/setting');
const encrypt = require('../helpers/encrypt');

(async function () {
  let admins = await UserModel.find({ role: "admin" });

  if (!admins.length) {
    let model = new UserModel({
      countryCode: '+380',
      phone: '964566810',
      role: 'admin',
      password: encrypt('11111111'),
      fullName: 'Коледж електронних приладів',
      email: 'tsapeipetro@gmail.com',
    });

    let doc = await model.save();

    let settingModel = new SettingModel({
      institution: doc._id
    });

    settingModel.save()
      .then(async settingDoc => {

        await UserModel.findByIdAndUpdate(doc._id, {
          $set: { setting: settingDoc._id }
        })
      })
      .catch(error => console.log(error))
  }

})();
