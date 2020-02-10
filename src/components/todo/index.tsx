import React from "react"
import PropTypes from "prop-types"
import userbase, { UserResult } from "userbase-js"
import Layout from "../layout"

class Todo extends React.Component<{ user: UserResult }, { user: UserResult}> {
  render() {
    return (
      <Layout user={this.props.user}>
        <h1>{this.props.user?.username}</h1>
      </Layout>
    )
  }
}

export default Todo