#!/usr/bin/env node

const Custom = require('./custom/custom');

const custom = new Custom();
custom.create().catch(createErr => {
  console.log(createErr);
});
