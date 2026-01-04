import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { ChatBot } from './components/ChatBot';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Questionnaire } from './pages/Questionnaire';
import { Preview } from './pages/Preview';
import { PetitionTypes } from './pages/PetitionTypes';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/petition-types"
                                element={
                                    <ProtectedRoute>
                                        <PetitionTypes />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/petition/:type"
                                element={
                                    <ProtectedRoute>
                                        <Questionnaire />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/petition/:id/preview"
                                element={
                                    <ProtectedRoute>
                                        <Preview />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <ChatBot />
                    <Toaster position="top-right" />
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
