const admin = require('../firebase');
const User = require('../models/User');
const Post = require('../models/Post');

exports.createUser = async (req, res) => {
  try {
    const { email, password, nombre, apellido } = req.body;

    if (!email || !password || !nombre || !apellido) {
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }

    // Crear usuario en Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Guardar usuario en MongoDB
    const newUser = new User({
      firebaseUID: userRecord.uid,
      email,
      nombre,
      apellido,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente en Firebase y MongoDB',
      idUsuarioMongo: savedUser._id,
      idUsuarioFirebase: userRecord.uid,
    });
  } catch (error) {
    console.error(error);
    // Manejo de errores
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }
    res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
  }
};


exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
    }

    const fetch = require('node-fetch');
    const apiKey = process.env.FIREBASE_API_KEY;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas', error: data.error.message });
    }

    // Buscar usuario en MongoDB por UID de Firebase
    const usuario = await User.findOne({ firebaseUID: data.localId });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado en MongoDB' });
    }

    // Traer sus posts
    const posts = await Post.find({ authorId: usuario.firebaseUID });

    res.status(200).json({
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      posts,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

exports.logOut = async (req, res) => {
  res.status(200).json({ mensaje: "Que tengas un excelente dia, byee" });
};
