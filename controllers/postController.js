const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({ mensaje: 'Faltan datos del post' });
    }

    const newPost = new Post({ title, content, authorId });
    const savedPost = await newPost.save();

    res.status(201).json({
      mensaje: 'Post creado exitosamente',
      postId: savedPost._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el post', error: error.message });
  }
};

exports.listPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // buscar todos los posts
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los posts', error: error.message });
  }
};

exports.editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({ mensaje: 'Faltan datos para actualizar' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content, authorId },
      { new: true } // Para que devuelva el post actualizado
    );

    if (!updatedPost) {
      return res.status(404).json({ mensaje: 'Post no encontrado' });
    }

    res.status(200).json({ mensaje: 'Post actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el post', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ mensaje: 'Post no encontrado' });
    }

    res.status(200).json({ mensaje: 'Post eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el post', error: error.message });
  }
};


