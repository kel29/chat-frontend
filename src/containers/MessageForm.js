import React, { PureComponent } from 'react'
import { API_ROOT, HEADERS } from '../services/constants'

class MessageForm extends PureComponent {
  state = {
    content: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const user = JSON.parse(window.localStorage.getItem('currentUser'))

    const config = {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        content: this.state.content,
        conversation_id: this.props.currentConversation.id,
        user_id: user.id,
        is_read: false
      })
    }

    fetch(`${API_ROOT}messages`, config)
    .then(res => res.json())
    .then(newMessage => {
      this.props.updateCurrentConversation(newMessage)
      this.resetState()
    })
  }
  
  handleTyping = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  resetState = () => {
    this.setState({
      content: ''
    })
  }

  render () {
    return (
      <form className="row message-form form-inline card-footer" onSubmit={this.handleSubmit}>
        <input 
          className="form-control"
          value={this.state.content} 
          placeholder='enter a message' 
          id='message-input' 
          type='text' 
          onChange={this.handleTyping} />
        <button type='submit' className='btn btn-outline-secondary form-submit-btn'>Send</button>
      </form>
    )
  }
}

export default MessageForm
