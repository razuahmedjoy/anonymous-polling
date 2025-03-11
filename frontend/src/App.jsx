import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CreatePoll from './pages/CreatePoll'
import PollPage from './pages/PollPage'
import ResultsPage from './pages/ResultPage'


function App() {

  return (
    <Layout>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/polls/:id" element={<PollPage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
