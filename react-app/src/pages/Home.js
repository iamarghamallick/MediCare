import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <div className="absolute inset-0 bg-[url('/public/images/medical-pattern.png')] opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                AI-Powered Disease Prediction
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-100">
                                Get instant health insights and find nearby medical help using advanced AI technology
                            </p>
                            <Link
                                to="/predict"
                                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                            >
                                Start Prediction
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <img
                                src="/images/ai-doctor.png"
                                alt="AI Healthcare"
                                className="w-full h-auto rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                        Our Services
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Disease Prediction Card */}
                        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-3xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Disease Prediction
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Advanced AI algorithms analyze your symptoms with high accuracy
                            </p>
                            <Link
                                to="/predict"
                                className="text-blue-600 font-semibold hover:text-blue-800 mb-6 block"
                            >
                                Predict Now →
                            </Link>
                            <img
                                src="/images/ai-analysis.png"
                                alt="AI Analysis"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>

                        {/* Find Doctors Card */}
                        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-3xl">👨‍⚕️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Find Doctors
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Locate nearby healthcare professionals instantly
                            </p>
                            <Link
                                to="/nearby-doctors"
                                className="text-blue-600 font-semibold hover:text-blue-800 mb-6 block"
                            >
                                Find Doctors →
                            </Link>
                            <img
                                src="/images/doctors.png"
                                alt="Doctors"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>

                        {/* Hospital Locator Card */}
                        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-3xl">📍</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Hospital Locator
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Discover medical facilities in your area and get directions
                            </p>
                            <Link
                                to="/nearby-doctors"
                                className="text-blue-600 font-semibold hover:text-blue-800 mb-6 block"
                            >
                                Locate Now →
                            </Link>
                            <img
                                src="/images/hospital.png"
                                alt="Hospital"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="relative">
                            {/* <div className="absolute top-0 left-1/2 -ml-1 w-2 h-full bg-blue-200 hidden md:block"></div> */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-6 z-10">
                                    1
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                                    Enter Symptoms
                                </h3>
                                <p className="text-gray-600 text-center">
                                    Input your symptoms into our AI system
                                </p>
                                <img
                                    src="/images/symptoms.png"
                                    alt="Enter Symptoms"
                                    className="w-full h-48 object-cover rounded-lg mt-6"
                                />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            {/* <div className="absolute top-0 left-1/2 -ml-1 w-2 h-full bg-blue-200 hidden md:block"></div> */}
                            <div className="relative flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-6 z-10">
                                    2
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                                    Get Prediction
                                </h3>
                                <p className="text-gray-600 text-center">
                                    Receive instant analysis and potential conditions
                                </p>
                                <img
                                    src="/images/prediction.png"
                                    alt="Get Prediction"
                                    className="w-full h-48 object-cover rounded-lg mt-6"
                                />
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                            <div className="relative flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-6 z-10">
                                    3
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                                    Find Healthcare
                                </h3>
                                <p className="text-gray-600 text-center">
                                    Connect with nearby medical professionals
                                </p>
                                <img
                                    src="/images/healthcare.png"
                                    alt="Find Healthcare"
                                    className="w-full h-48 object-cover rounded-lg mt-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                        Ready to Get Started?
                    </h2>
                    <Link
                        to="/predict"
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                    >
                        Start Your Health Check Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
