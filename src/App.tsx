import { Routes, Route, BrowserRouter } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'
import SurveyLayout from './components/layout/SurveyLayout'

import SurveyPage from './pages/SurveyPage'
import LoginPage from './pages/AuthPage'
import SurveyAddPage from './pages/SurveyAddPage'
import SurveyEditPage from './pages/SurveyEditPage'
import SurveyDetailPage from './pages/SurveyDetailPage'
import ResponseSurveyPage from './pages/ResponseSurveyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/task-survey" element={<SurveyLayout />}>
          <Route
            index
            path="/task-survey/:surveySlug"
            element={<ResponseSurveyPage />}
          />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<SurveyPage />} />
          <Route path="survey/:surveyId" element={<SurveyDetailPage />} />
          <Route path="survey/add" element={<SurveyAddPage />} />
          <Route path="survey/edit/:surveyId" element={<SurveyEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
