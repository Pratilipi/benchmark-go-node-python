var config = {};

config.devo = {};
config.gamma = {};
config.prod = {};
config.local = {};

//When stage is devo
config.devo.SERVICE_PORT = '8080';

//When stage is gamma
config.gamma.SERVICE_PORT = '8080'; 

//When stage is prod
config.prod.SERVICE_PORT = '8080'; 

//When stage is localhost
config.local.SERVICE_PORT = '8080'; 

module.exports = config;
