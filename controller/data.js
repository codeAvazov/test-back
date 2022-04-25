const DataModel = require("../model/data.js");

class DataController {
  static async getAll(req, res) {
    try {
      const data = await DataModel.find({});
      return res.json({ data });
    } catch (error) {
      return res.status(500).json({ msg: "Server error !" });
    }
  }
  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const data = await DataModel.findById(id);
      if (!data)
        return res.status(400).json({ msg: "This todo haven`t in db" });

      return res.json({ data });
    } catch (error) {
      return res.status(500).json({ msg: "Server error !" });
    }
  }

  static async toggleComplete(req, res) {
    try {
      const { id } = req.params;
      const todo = await DataModel.findById(id);
      if (!todo)
        return res.status(400).json({ msg: "This todo haven`t in db" });

      await DataModel.findByIdAndUpdate(id, {
        isCompleted: !todo.isCompleted,
      });

      return res.json({ msg: "Complete updated !" });
    } catch (error) {
      return res.status(500).json({ msg: "Server error !" });
    }
  }

  static async add(req, res) {
    try {
      console.log(req.body);

      const { name, ...body } = req.body;

      if (!name)
        return res.status(400).json({ msg: "Please enter the name !" });

      await DataModel.create({
        name,
        ...body,
      });

      return res.status(201).json({ msg: "Todo success added !" });
    } catch (error) {
      return res.status(500).json({ msg: "Server error !" });
    }
  }

  static async update(req, res) {
    try {
      const { id, ...body } = req.body;
      await DataModel.findByIdAndUpdate(
        id,
        {
          ...body,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({ msg: "Todo success updated !" });
    } catch (error) {
      return res.status(500).json({ msg: "Server error !" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await DataModel.findByIdAndRemove(id);

      return res.status(200).json({ msg: "Todo success deleted !" });
    } catch (error) {
      return res.status(500).json({ msg: "Server error !" });
    }
  }
}

module.exports = DataController;
