import React from "react"
import PropTypes from "prop-types"
import userbase, { UserResult } from "userbase-js"
import Layout from "../layout"

class Todo extends React.Component<{ user: UserResult }, { user: UserResult}> {
  render() {
    return (
      <Layout user={this.props.user}>
        <h1 className="m-0 mb-3 text-4xl">Welcome, {this.props.user.username}!</h1>
        <h2 className="m-0 text-2xl">Your TODOs</h2>
      </Layout>
    )
  }
}

export default Todo