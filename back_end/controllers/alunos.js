const Aluno = require("../models/alunos.js");

exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.AlunoModel.find();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneAluno = async (req, res) => {
  try {
    res.status(201).json(await Aluno.AlunoModel.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createAluno = async (req, res) => {
  try {
    res.status(201).json(await Aluno.AlunoModel.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { foto } = req.body;
    const alunoExistente = await Aluno.AlunoModel.findById(id);

    if (!alunoExistente) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    const alunoAtualizado = await Aluno.AlunoModel.findByIdAndUpdate(
      id,
      { foto: foto },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Foto atualizada com sucesso", aluno: alunoAtualizado });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAluno = async (req, res) => {
  try {
    res
      .status(201)
      .json(await Aluno.AlunoModel.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
