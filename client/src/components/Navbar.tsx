import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Scale, LogOut, User, Home, FileText, Menu, X, Bell } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/lib/auth';
import { Button } from './ui/button';

import { NewsSection } from './NewsSection';

export function Navbar() {
    const { t } = useTranslation();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNews, setShowNews] = useState(false);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-2 rounded-lg">
                                <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-none">NyayaSetu</h1>
                                <p className="text-[10px] sm:text-xs text-gray-600 hidden sm:block">{t('tagline')}</p>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-6">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium">
                                        <Home className="w-4 h-4" />
                                        <span>{t('nav.home')}</span>
                                    </Link>
                                    <button onClick={() => setShowNews(true)} className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium">
                                        <Bell className="w-4 h-4" />
                                        <span>{t('news.title') || 'Updates'}</span>
                                    </button>
                                    <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium">
                                        <FileText className="w-4 h-4" />
                                        <span>{t('nav.dashboard')}</span>
                                    </Link>
                                    <div className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                                        <User className="w-4 h-4" />
                                        <span className="text-sm font-medium">{user?.name === 'Google User' ? t('auth.googleUser') : user?.name}</span>
                                    </div>
                                    <Button variant="ghost" onClick={handleLogout} size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        {t('nav.logout')}
                                    </Button>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to="/login">
                                        <Button variant="ghost">{t('auth.login')}</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button>{t('auth.signup')}</Button>
                                    </Link>
                                </div>
                            )}
                            <div className="border-l pl-4 border-gray-200">
                                <LanguageSelector />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden items-center gap-4">
                            <LanguageSelector />
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
                        <div className="px-4 py-3 space-y-3">
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                                        <div className="bg-primary-100 p-2 rounded-full text-primary-600">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{user?.name === 'Google User' ? t('auth.googleUser') : user?.name}</p>
                                            <p className="text-xs text-gray-500">{t('auth.loggedInStatus')}</p>
                                        </div>
                                    </div>

                                    <Link
                                        to="/"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                                    >
                                        <Home className="w-5 h-5" />
                                        <span className="font-medium">{t('nav.home')}</span>
                                    </Link>
                                    <button
                                        onClick={() => { setShowNews(true); setIsMenuOpen(false); }}
                                        className="flex w-full items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                                    >
                                        <Bell className="w-5 h-5" />
                                        <span>{t('news.title') || 'Updates'}</span>
                                    </button>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                                    >
                                        <FileText className="w-5 h-5" />
                                        <span className="font-medium">{t('nav.dashboard')}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span className="font-medium">{t('nav.logout')}</span>
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center">{t('auth.login')}</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full justify-center">{t('auth.signup')}</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            <NewsSection isOpen={showNews} onClose={() => setShowNews(false)} />
        </>
    );
}
