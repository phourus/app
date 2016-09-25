import config from "./config"
import fs from 'fs'
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import Router, { match } from 'react-router'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'
import webpackConfig from './webpack.config.js'

import api from './api/rest'
// import routes from './src/routes'
// import server from './src/react/server'

const phourus = express()


process.on('uncaughtException', function (err) {
  console.log("---UNCAUGHT EXCEPTION---")
  console.error(err)
})

phourus.use(express.static(__dirname))
phourus.use('/rest', api)

console.log('ENVIRONMENT', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  console.log('Hot Module Replacement enabled')
  const compiler = webpack(webpackConfig)
  phourus.use(webpackMiddleware(compiler), {
    publicPath: webpackConfig.output.publicPath
  })
  phourus.use(webpackHot(compiler))
}
phourus.get('*', renderIndex)

function renderIndex (req, res) {
  res.sendfile(__dirname + '/index.html')
}
// phourus.get('*', renderServer)
//
// function renderServer (req, res) {
//   match({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
//     if (error) {
//       //res.status(500).send(error.message)
//     } else if (redirectLocation) {
//       //res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//     } else if (renderProps) {
//       const el = React.createElement(server, renderProps)
//       res.status(200).send(ReactDOM.renderToString(el))
//     } else {
//       //res.status(404).send('Not found')
//     }
//   })
// }

phourus.listen(config.get('port'), () => {
    console.log('server started')
})
