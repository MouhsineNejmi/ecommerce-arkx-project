const {
  uploadImageToS3,
  getImageLink,
  deleteImage,
} = require('../utils/aws.utils');
const User = require('../models/user.model');

exports.getMyProfileData = (req, res, next) => {
  try {
    const user = res.locals.user;
    console.log(user);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res) => {
  const sort = req.query.sort || 'desc';
  const page = req.query.page >= 1 ? req.query.page : 1;
  const resultsPerPage = 10;

  try {
    const users = await User.find()
      .sort({ username: sort.toLowerCase() })
      .skip((page - 1) * resultsPerPage)
      .limit(page * resultsPerPage);

    return res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found.',
      });
    }

    return res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

exports.searchUser = async (req, res) => {
  const query = req.query.query;
  const sort = req.query.sort || 'desc';
  const page = req.query.page >= 1 ? req.query.page : 1;
  const resultsPerPage = 10;

  try {
    const user = await User.findOne({
      username: { $regex: new RegExp(query, 'i') },
    })
      .sort({ username: sort.toLowerCase() })
      .skip((page - 1) * resultsPerPage)
      .limit(page * resultsPerPage);

    return res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username, email, password, role } = req.body;
  const { file } = req;

  try {
    const key = await uploadImageToS3(file);

    const updatedFields = {
      image_name: key,
      first_name,
      last_name,
      username,
      email,
      password,
      role,
      last_update: Date.now(),
    };

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: 'User with this username already exist try another username.',
      });
    }

    const user = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    user.profile_image = await getImageLink(key);

    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    }

    return res
      .status(200)
      .json({ status: 200, message: 'User updated successfully.' });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

exports.deleteUserAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    user.image_name && (await deleteImage(user.image_name));

    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    return res
      .status(200)
      .json({ satus: 200, message: 'User deleted successfully' });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error?.message });
  }
};
