import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../lib/Constants";
import ScrollToBottom from "react-scroll-to-bottom";
import { TextField, Button, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatView = () => {
  const { jobId, jobTitle } = useParams();
  const decodedJobId = decodeURIComponent(jobId);
  const decodedJobTitle = decodeURIComponent(jobTitle);
  const { getAccessTokenSilently } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (!newMessage) return;
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/chat/${decodedJobId}/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_id: jobId,
          question: newMessage,
        }),
      });
      const responseData = await response.json();
      setMessages([
        ...messages,
        { text: newMessage, sender: 'You' },
        { text: responseData.answer, sender: 'System' }
      ]);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ paddingTop: 70 }}
    >
      <Paper style={{ width: '80%', maxHeight: '80vh', overflow: 'auto' }}>
        <ScrollToBottom className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'You' ? 'right' : 'left' }}>
              <Paper style={{ display: 'inline-block', margin: '10px', padding: '10px' }}>
                {msg.text}
              </Paper>
            </div>
          ))}
        </ScrollToBottom>
        <div style={{ display: 'flex', padding: '10px' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                sendMessage();
                event.preventDefault();
              }
            }}
          />
          <Button onClick={sendMessage} color="primary">
            <SendIcon />
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ChatView;
