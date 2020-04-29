import React, { Component } from "react"
import socketIOClient from "socket.io-client"
import { format } from "date-fns"

const BASE_URL = "http://localhost:4001"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sensor: [],
    }
  }

  componentDidMount() {
    const socket = socketIOClient(BASE_URL)
    socket.on("reading", data => this.setState({ sensor: data }))
    socket.emit("subscribeToServer", 1000)
  }

  render() {
    const { sensor } = this.state

    return (
      <div className="container mx-auto p-4 m-4 border-solid border-2 border-gray-600 bg-gray-200">
        <h1 className="text-4xl text-gray-800 py-2 text-center">
          React Socket.IO Example
        </h1>
        <table className="table-fixed mt-2 py-4 border-gray-500">
          <thead>
            <tr className="bg-gray-500">
              <th className="w-1/4 px-4 py-2 border-gray-600">Time</th>
              <th className="w-1/4 px-4 py-2 border-gray-600">Temperature</th>
              <th className="w-1/4 px-4 py-2 border-gray-600">Humidity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 border-gray-600">
                {sensor[0] && format(sensor[0], "hh:mm:ss a")}
              </td>
              <td className="border px-4 py-2 border-gray-600">{sensor[1]}</td>
              <td className="border px-4 py-2 border-gray-600">{sensor[2]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
