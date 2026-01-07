import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import SolutionsPage from './pages/SolutionsPage';
import SolutionDetailPage from './pages/SolutionDetailPage';
import ProfilePage from './pages/ProfilePage';
import AIAssistantPage from './pages/AIAssistantPage';
import ApplicationPage from './pages/ApplicationPage';
import FeedbackPage from './pages/FeedbackPage';
import FrameworkPage from './pages/FrameworkPage';
import FrameworkToolkitPage from './pages/FrameworkToolkitPage';
import FrameworkGlossaryPage from './pages/FrameworkGlossaryPage';
import FrameworkInteractiveToolsPage from './pages/FrameworkInteractiveToolsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import MyApplicationsPage from './pages/dashboard/MyApplicationsPage';
import MyBookmarksPage from './pages/dashboard/MyBookmarksPage';
import { ROUTES } from './constants';
import ImageGenerationPage from './pages/ImageGenerationPage';


const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.TOURS} element={<ToursPage />} />
              <Route path={ROUTES.TOUR_DETAIL} element={<TourDetailPage />} />
              <Route path={ROUTES.RESOURCES} element={<ResourcesPage />} />
              <Route path={ROUTES.RESOURCE_DETAIL} element={<ResourceDetailPage />} />
              <Route path={ROUTES.SOLUTIONS} element={<SolutionsPage />} />
              <Route path={ROUTES.SOLUTION_DETAIL} element={<SolutionDetailPage />} />
              <Route path={ROUTES.FRAMEWORK} element={<FrameworkPage />} />
              <Route path={ROUTES.FRAMEWORK_TOOLKIT} element={<FrameworkToolkitPage />} />
              <Route path={ROUTES.FRAMEWORK_GLOSSARY} element={<FrameworkGlossaryPage />} />
              <Route path={ROUTES.FRAMEWORK_INTERACTIVE_TOOLS} element={<FrameworkInteractiveToolsPage />} />
              <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
              <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
              <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

              {/* Protected Routes */}
              <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path={ROUTES.PROFILE} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path={ROUTES.AI_ASSISTANT} element={<ProtectedRoute><AIAssistantPage /></ProtectedRoute>} />
              <Route path={ROUTES.APPLY_TOUR} element={<ProtectedRoute><ApplicationPage /></ProtectedRoute>} />
              <Route path={ROUTES.FEEDBACK_TOUR} element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
              <Route path={ROUTES.MY_APPLICATIONS} element={<ProtectedRoute><MyApplicationsPage /></ProtectedRoute>} />
              <Route path={ROUTES.MY_BOOKMARKS} element={<ProtectedRoute><MyBookmarksPage /></ProtectedRoute>} />
              <Route path={ROUTES.GENERATE_IMAGE} element={<ProtectedRoute><ImageGenerationPage /></ProtectedRoute>} />
              
              {/* Catch-all Not Found Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;