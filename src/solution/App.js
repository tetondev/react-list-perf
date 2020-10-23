import React, { memo } from 'react';
import './App.css';
import data from './assets/dataSet';
import { Card, Title, Content, Footer, useSelection } from './components/Card'

const MemoizedCard = memo(function MemoizedCard({ id, selected, updateSelectedStatus }) {
  return (<Card key={id} id={id} selected={selected} updateSelectedStatus={updateSelectedStatus}>
    <Title>Card {id}</Title>
    <Content>Here is some content for card number {id}</Content>
    <Footer>Card selected: {selected.toString()}</Footer>
  </Card>)
})

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
          <MemoizedCard key={id} id={id} selected={selected} updateSelectedStatus={updateSelectedStatus} />
        ))}
      </section>
    </div>
  );
}

export default App;
