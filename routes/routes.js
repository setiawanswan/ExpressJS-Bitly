const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator/check");
const { User, Shorts, track } = require("../models");

const chance = require('chance').Chance()
const passport = require("../passport");
const sequelize = require('sequelize')
// var ip = require('ip');

//Guest
route.post("/guest",async (req,res) => {
  const {title, short_url,url} = req.body

  const data = await Shorts.create({
    title : chance.string({length: 8, pool: 'abcdefghijklmnopqrstufwxyz12345678910'}),
    short_url : chance.string({length: 8, pool: 'abcdefghijklmnopqrstufwxyz12345678910'}),
    url
  })
  res.json(data)
})

//Id
route.get("/short/:id", passport.authenticate("jwt"), async (req,res) => {
  const id = req.params.id

  try {
    const getdata = await Shorts.findOne({
      where: { id: id }
    });
    res.json(getdata);
  } catch (error) {
    res.json(error);
  }
})

//New endpoint
route.get("/new", passport.authenticate("jwt"), async (req,res) => {
  
  const {id} = req.user 
  const puttrack = await Shorts.findAll({
    include:track,
    where : {user_id: id} 
  });

  console.log('total click ' + puttrack.length)
  res.json(puttrack);
});

//Grouping
route.get("/group/:date" , passport.authenticate("jwt"), async(req,res) => {
  const {id} = req.user
  const cari = req.params.date
  

  console.log(cari)
  try {
    const group = await Shorts.findOne({
      include: [{
        model:track,
        where: sequelize.where(sequelize.fn('date',sequelize.col('tracks.createdAt')),'=',cari)
      }],where: {
        user_id: 38
      }
    })

    console.log(group)
  res.json(group)
  } catch (error) {
  res.json(error)
}
})


  



route.get("/history" , passport.authenticate("jwt"), async(req,res) => {
  // const ids = req.params
  const {id} = req.user
try {
  const data = await Shorts.findOne({
    include: track ,
    where: {user_id:id}
  })
  console.log(data)
  res.json(data.tracks)
} catch (error) {
  console.log(error)
}

  
  
})

//Track endpoint
route.get("/track", async (req, res) => {
  const gettrack = await track.findAll({ include: Shorts });
  res.json(gettrack);
});

// Short endpoint
route.get("/short",passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const getshort = await Shorts.findAll({
      // include:Shorts
    });
    // console.log(data)
    res.json(getshort);
  }
);

route.get("/short", passport.authenticate("jwt"), async (req, res) => {
  const { id } = req.user;
  // console.log(req.user)
  try {
    const data = await Shorts.findAll({
      include: [User],
      where: { user_id: id }
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

route.post("/postshort", passport.authenticate("jwt"), async (req, res) => {
  const { title, short_url, url, user_id } = req.body;
  const { id } = req.user;
  console.log(req.body);

  const data = await Shorts.create({
    title,
    short_url,
    url,
    user_id: id
  });
  console.log(data);
  res.json(data);
});

route.post("/goodshort", passport.authenticate("jwt"), async (req, res) => {
  const {short_url } = req.body;
  const { id } = req.user;
  console.log(req.body);

  const data = await Shorts.create({
    short_url,
    user_id: id
  });
  console.log(data);
  res.json(data);
});

route.put("/putshort/:id",passport.authenticate("jwt"),
  async (req, res) => {
    const id = req.params.id;
    const {title, short_url, url} = req.body;

    //   console.log(id);

    try {
      const upgrade = await Shorts.update(
        {
          title,
          short_url,
          url
          // updatedAt: Date.now()
        },
        {
          where: { id:id }
        }
      );
      res.json({ upgrade });
    } catch (error) {
      res.json(error);
    }
  }
);

route.delete("/delshort/:id", passport.authenticate("jwt"), async (req, res) => {
  const id = req.params.id;

  // console.log(id);

  try {
    const del = await Shorts.destroy({ where: { id:id } });
    res.json({ del });
  } catch (error) {
    res.json(error);
  }
});

// User endpoint
route.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;

    try {
      const getdata = await User.findOne({
        where: { id }
      });
      res.json(getdata);
    } catch (error) {
      res.json(error);
    }
  }
);

route.get("/user", passport.authenticate("jwt"), async (req, res) => {
  const data = await User.findAll();
  // {// include:Shorts}

  console.log(req.user.id);
  res.json(data);
});

//CRUD in Sequelize
route.post(
  "/user",
  [
    check("email").isEmail(),
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("can't be empty"),
    check("lastName")
      .not()
      .isEmpty()
      .withMessage("kosong")
  ],
  async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const data = {
      firstName,
      lastName,
      email,
      password
    };
    try {
      const save = await User.create(data);
      res.json({
        status: true,
        data: {
          id: save.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          created_at: save.createdAt
        }
      });
    } catch (error) {
      res.json(error);
    }
  }
);

route.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const del = await User.destroy({ where: { id: id } });
    res.json({ del });
  } catch (error) {
    res.json(error);
  }
});
route.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  console.log(id);

  const data = {
    firstName,
    lastName,
    email,
    password
  };

  try {
    const upgrade = await User.update(
      {
        firstName,
        lastName,
        email,
        password,
        updatedAt: Date.now()
      },
      {
        where: { id: id }
      }
    );
    res.json({ upgrade });
  } catch (error) {
    res.json(error);
  }
});

module.exports = route;
