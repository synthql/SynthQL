import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { QueryTree } from './components/QueryTree';
import { findSolutionConfig } from './queries';
import { AnyQuery } from './types';
import { Flex } from './components/Flex';


function App() {
  const query: AnyQuery = findSolutionConfig("some id");

  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      <QueryTree title='Find solution configuration' query={query} />
    </Flex>
  )
}

export default App
