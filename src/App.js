import React from 'react';
import './App.css';
import data from './assets/dataSet';
import { Card, Title, Content, Footer, useSelection } from './components/Card'

function App() {
  const { selectableItems,
    selectedItems,
    updateSelectedStatus } = useSelection({ initialItems: data })
  return (
    <div className="App">
      <header>
        <h3>Total Selected: {selectedItems.length}</h3>
      </header>
      <section className="cardGrid">
        {selectableItems.map(({ id, selected }) => (
          <Card key={id} id={id} selected={selected} updateSelectedStatus={updateSelectedStatus}>
            <Title>Card {id}</Title>
            <Content>Here is some content for card number {id}</Content>
            <Footer>Card selected: {selected.toString()}</Footer>
          </Card>
        ))}
      </section>
    </div>
  );
}

export default App;
