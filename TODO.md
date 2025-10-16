# TODO: Correct All Files in ChatBot-Webapp

## Bugs and Fixes
- [x] Fix circular import in `client/src/components/chatroom.jsx` (remove self-import)
- [x] Fix case mismatch in `server/routes/chatbotRoutes.js` (require path)
- [x] Register chatbot routes in `server/server.js`
- [x] Merge duplicate CSS rules in `client/src/App.css`
- [x] Fix "main" entry in `server/package.json`
- [x] Fix time formatting in chat messages (add padding)

## Integration
- [x] Integrate chatbot into client chat: If room is 'bot', send messages to chatbot API and display replies

## Cleanup
- [ ] Review unused components (`ChatWindow.jsx`, `InputBox.jsx`, `Message.jsx`) - possibly remove if not needed

## Testing
- [ ] Run server and client, test chat and bot integration
