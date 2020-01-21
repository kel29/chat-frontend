import React, { PureComponent } from 'react'
import { API_ROOT, HEADERS } from '../services/constants'

class NewConversationForm extends PureComponent {
  state = {
    topic: ''
  }

  handleTyping = (e) => {
    this.setState({
      topic: e.target.value
    })
  }

  createNewConversation = (e) => {
    e.preventDefault()

    const config = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        topic: this.state.topic
      })
    }

    fetch(`${API_ROOT}conversations`, config)
    .then(res => res.json())
    .then(newTopic => {
      if (newTopic.id) {
        this.props.addNewConversation(newTopic)
      }
    this.setState({ topic: '' })
    })
  }

  render () {
    return (
      <div className=''>
        <form onSubmit={e => this.createNewConversation(e)}>
          <div className='form-group'>
            <input
              onChange={this.handleTyping}
              value={this.state.topic}
              type='text'
              placeholder='Start new conversation'
              required
              className='form-control-sm'
            />
          </div>
          <button type='submit' className='btn btn-outline-primary btn-sm btn-block p-2'>Create</button>
        </form>
      </div>
    )
  }
}

export default NewConversationForm
