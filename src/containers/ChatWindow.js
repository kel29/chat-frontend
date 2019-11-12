import React, { PureComponent } from 'react'
import MessageForm from './MessageForm'
import Message from '../components/Message'
import PrivacyHOC from '../HOC/PrivacyHOC'

class ChatWindow extends PureComponent {

  displayConversationMessages = () => {
    return this.props.currentConversation.messages.map((message) => {
      return <Message message={message}/>
    })
  }

  render () {
    return (
      <div className='col-9 chat-window'>
        {this.displayConversationMessages()}
        <MessageForm 
          currentConversation={this.props.currentConversation} 
          updateCurrentConversation={this.props.updateCurrentConversation} 
        />
      </div>
    )
  }
}

//export default PrivacyHOC(ChatWindow)
export default ChatWindow
