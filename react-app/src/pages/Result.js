import React from 'react';
import { usePrediction } from "../context/PredictionContext";
import MedicalInfoSection from '../components/MedicalInfoSection';

const Result = () => {
    const { predictionData } = usePrediction();

    if (!predictionData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
                    <div className="mb-4 text-gray-400">
                        <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 14h.01M12 16h.01M12 18h.01M12 20h.01M12 22h.01"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No prediction data found</h2>
                    <p className="text-gray-600">Please complete a prediction first.</p>
                </div>
            </div>
        );
    }

    const { prediction, graph_image, symptoms_chart, symptoms_reported } = predictionData;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Disease Prediction Result</h2>
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Based on {symptoms_reported.length} reported symptoms
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {/* Symptoms Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Reported Symptoms
                        </h3>
                        <div className="space-y-2">
                            {symptoms_reported.map((symptom, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <span className="text-blue-500 mr-2">•</span>
                                    {symptom}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Predictions Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Primary Prediction */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <svg className="h-6 w-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Primary Prediction
                            </h3>
                            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                                <div className="text-2xl font-bold text-gray-900 mb-4">
                                    {prediction.primary_prediction.disease}
                                </div>
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div className="text-sm font-semibold text-green-600">
                                            Confidence Score
                                        </div>
                                        <div className="text-sm font-bold text-green-600">
                                            {(prediction.primary_prediction.confidence * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-3 bg-green-100 rounded-full">
                                        <div
                                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                                            style={{ width: `${prediction.primary_prediction.confidence * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Alternative Predictions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                Alternative Predictions
                            </h4>
                            <div className="space-y-4">
                                {prediction.alternative_predictions.map((alt, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-xl p-4">
                                        <div className="text-lg font-semibold text-gray-900 mb-2">
                                            {alt.disease}
                                        </div>
                                        <div className="relative pt-1">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div className="text-sm text-gray-600">
                                                    Confidence Score
                                                </div>
                                                <div className="text-sm font-bold text-gray-600">
                                                    {(alt.confidence * 100).toFixed(2)}%
                                                </div>
                                            </div>
                                            <div className="overflow-hidden h-2 bg-gray-200 rounded-full">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${alt.confidence * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Medical Information Section */}
                <div className="mb-12">
                    <MedicalInfoSection disease={prediction.primary_prediction.disease} />
                </div>

                {/* Visualization Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Prediction Analysis
                        </h3>
                        <div className="rounded-xl overflow-hidden">
                            <img
                                src={`data:image/png;base64,${graph_image}`}
                                alt="Prediction Graph"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Symptoms Analysis
                        </h3>
                        <div className="rounded-xl overflow-hidden">
                            <img
                                src={`data:image/png;base64,${symptoms_chart}`}
                                alt="Symptoms Chart"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
