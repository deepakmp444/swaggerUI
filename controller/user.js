import { db, ObjectId } from "../db/dbConfig.js";
const collection = db.collection("user");

const getAllUser = async (req, res) => {
  try {
    const data = await collection.find().limit(10).toArray();
    return res.status(200).json({ message: "done", status: true, data });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    const data = await collection.insertOne({
      name,
      mobile,
      email,
      password,
    });
    return res.status(200).json({ message: "done", status: true, data });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);
  try {
    if (ObjectId.isValid(id)) {
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true, id });
    } else {
      throw Error("Params Errors");
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (ObjectId.isValid(id)) {
      const data = await collection.findOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true, data });
    } else {
      throw Error("Params Errors");
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, mobile, email, password } = req.body;
  try {
    if (ObjectId.isValid(id)) {
      const data = await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: name,
            password: password,
            mobile: mobile,
            email: email,
          },
        }
      );
      return res.status(200).json({ success: true, data });
    } else {
      throw Error("Params Errors");
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { getAllUser, createUser, deleteUser, updateUser, getUser };
