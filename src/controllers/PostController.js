const Post = require("../models/Post");
const jimp = require("jimp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");
    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split(".")[0];
    const fileName = `${name}.jpg`;

    let jimpImg = await jimp.read(req.file.path);
    jimpImg
      .resize(500, 500)
      .quality(70)
      .write(path.resolve(req.file.destination, "resized", fileName));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    req.io.emit("post", post);

    res.json({ post });
  },

  async delete(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      post.remove();
      res.json({ msg: "Tudo ok" });
    } catch (err) {
      res
        .status(404)
        .send("Ocorreu um erro ao tentar remover o post " + req.params.id);
    }
  },
  async deleteAll(req, res) {
    try {
      Post.find({}, (err, posts) => {
        if (err)
          res.status(404).send("Ocorreu um erro ao tentar obter os posts");

        posts.map(post => {
          post.remove();
        });
      });

      res.json({ msg: "Tudo ok" });
    } catch (err) {
      res.status(404).send("Ocorreu um erro ao tentar remover os posts");
    }
  }
};
