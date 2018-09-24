const express = require("express");
const route = express.Router();
// const {check, validationResult} = require('express-validator/check');
const { User, Shorts, track } = require("../models");

// const passport = require('../passport')
var ip = require("ip");

// Redirect URL

route.get("/:yoi", async (req, res) => {
  const test = req.params.yoi;
  const myIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress

const myhost = req.headers.host
  console.log('ioijoijoi',myIp)
  try {
    const show = await Shorts.findOne({
      where: { short_url: test }
    });
    console.log(show.url);

    track.create({
      uuid: show.id,
      short_url_id: show.id,
      ip_adress: myIp,
      referrer_url: myhost
    });
    res.redirect(show.url);
  } catch (error) {
    res.json(error)
    // ;tracks.createdAt
  }
});

module.exports = route;
