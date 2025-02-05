import express from 'express'
import { Server as WSServer } from 'ws'
import { WebSocket } from 'ws'
import * as fs from 'fs'

const app = express()
const port = 3000

app.use(express.static('www'))

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const wss = new WSServer({ server, path: '/coms' })

const connections: {
  player1: WebSocket | null,
  player2: WebSocket | null
} = {
  player1: null,
  player2: null,
}

// Declare the mouseMovements array globally
type MouseMovement = {
  player: 'player1' | 'player2',
  x: number,
  y: number,
  timestamp: string
}

// Initialize the mouseMovements array
let mouseMovements: MouseMovement[] = []

type Stage = {
  name: 'instructions' | 'game',
}

type Player = {
  x: number,
  y: number,
  status: 'ready' | 'notReady',
  timestamp: Date,
}

type State = {
  stage: Stage,
  player1: Player,
  player2: Player,
  timestamp: Date,
}

const now = new Date()

const state: State = {
  stage: { name: 'game' },
  player1: { x: 2, y: 2, status: 'ready', timestamp: now },
  player2: { x: 7, y: 7, status: 'ready', timestamp: now },
  timestamp: now,
}

function applyToState(player: 'player1' | 'player2', values: Player) {
  if (player === 'player1') {
    state.player1 = values
    if (connections.player2) connections.player2.send(JSON.stringify(state))
  } else if (player === 'player2') {
    state.player2 = values
    if (connections.player1) connections.player1.send(JSON.stringify(state))
  }
}

function send(player: 'player1' | 'player2') {
  if (player === 'player2' && connections.player2) {
    const stateToSend = Object.assign({}, state)
    const temp = state.player1
    stateToSend.player1 = state.player2
    stateToSend.player2 = temp
    connections.player2.send(JSON.stringify(stateToSend))
  } else if (connections.player1) {
    connections.player1.send(JSON.stringify(state))
  }
}

wss.on('connection', function(ws) {
  if (connections.player1 === null) {
    connections.player1 = ws
    connections.player1.send(JSON.stringify(state))
  } else if (connections.player2 === null) {
    connections.player2 = ws
    connections.player2.send(JSON.stringify(state))
  } else {
    console.error('No available player slots')
  }

  ws.on('message', function message(m) {
    const data = JSON.parse(m.toString('utf-8')) as Player
    if (connections.player1 === ws) {
      applyToState('player1', data)
      send('player2')
    } else if (connections.player2 === ws) {
      applyToState('player2', data)
      send('player1')
    }

    // Capture mouse movement data
    if (data.x !== undefined && data.y !== undefined) {
      const player = connections.player1 === ws ? 'player1' : 'player2'
      mouseMovements.push({
        player: player,
        x: data.x,
        y: data.y,
        timestamp: new Date().toISOString(),
      })
    }
  })

  ws.on('close', () => {
    if (connections.player1 === ws) connections.player1 = null
    else if (connections.player2 === ws) connections.player2 = null
  })

  ws.on('error', console.error)

  // Send the state
  ws.send(JSON.stringify(state))
})

// Function to save the data to a file when the experiment finishes
function saveExperimentData() {
  const timestamp = new Date().toISOString().replace(/[^\w\s]/gi, '_')
  const filename = `experiment_${timestamp}.json`
  fs.writeFileSync(filename, JSON.stringify(mouseMovements, null, 2))
  console.log(`Experiment data saved to ${filename}`)
}

// Simulate ending the experiment after a set time (e.g., 600,000 ms or 10 minutes)
setTimeout(saveExperimentData, 600000) // You can adjust the timeout duration as per your needs
