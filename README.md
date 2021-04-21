# Mini Page Builder

The repository for Almabase's Frontend challenge
Created with `React (create-react-app)` and `typescript`.

### How to Run the code

1. Clone the repository
2. Install the packages with &nbsp; `npm i`
3. Start the server with &nbsp; `npm start`
4. The demo of the app is hosted on [here](https://frontend-challenge-almabase.netlify.app/)

### Documentation

1. `<Draggable />` component is the blueprint for all the blocks that will be created
2. It contains information like
   <br />

```typescript
interface IDraggableProps {
  type: string;
  text: string;
  X: number;
  Y: number;
  fontSize: number;
  fontWeight: number;
  saved: boolean;
  id: string;
}
```

3. Everytime a sidebar block (button/label/input) is dragged into main view, a new Draggable `block` is created.

4. This `block` is then added to `blocks` and on every state change of `blocks`, it get stored into the localstorage

5. Drag n Drop functionality has been implemented using `react-draggable` library, the UI component is built with `antd`
