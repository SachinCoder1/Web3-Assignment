const jwt = require("jsonwebtoken");
const Address = require("../modals/address");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const loginUser = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Please Enter the address" });
    }

    const user = await Address.findOne({ mainAddress: address });

    if (user) {
      return res.json({
        address: user.mainAddress,
        token: generateToken(user._id),
      });
    } else {
      const user = await Address.create({
        mainAddress: address,
      });
      return res.json({
        address: user.mainAddress,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const getAddress = async (req, res) => {
  try {
    const { address } = req.query;
    console.log(address);

    if (!address) {
      return res.status(400).json({ message: "Please Enter the address" });
    }

    const user = await Address.findOne({ mainAddress: address });

    if (user) {
      return res.status(200).json({
        address: user.mainAddress,
        otherAddresses: user.addresses,
      });
    } else {
      return res.status(400).json({ message: "Address Not Found" });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const addAddress = async (req, res) => {
  try {
    const { address, addressToAdd } = req.body;
    const user = await Address.findOne({ mainAddress: address });
    console.log(user.addresses);

    if (!user.addresses.includes(addressToAdd)) {
      await Address.findOneAndUpdate(
        {
          mainAddress: address,
        },
        {
          $push: { addresses: addressToAdd },
        },
        {
          new: true,
        }
      );
    } else {
      return res
        .status(201)
        .json({ message: "Address Already Added", address: addressToAdd });
    }
    return res
      .status(201)
      .json({ message: "Address Added Success", address: addressToAdd });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const removeAddress = async (req, res) => {
  try {
    const { address, addressToRemove } = req.query;
    console.log("remove", addressToRemove)
    await Address.findOneAndUpdate(
      {
        mainAddress: address,
      },
      {
        $pull: { addresses: addressToRemove },
      },
      { new: true }
    );
    return res
      .status(202)
      .json({ message: "Address Deleted Success", address: addressToRemove });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { loginUser, getAddress, addAddress, removeAddress };
