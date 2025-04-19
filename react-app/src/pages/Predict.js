import React, { useState, useEffect } from 'react';
import { symptoms } from '../data/symptoms';
import { useNavigate } from 'react-router-dom';
import { usePrediction } from '../context/PredictionContext';

const HOST_URL = "https://medicare-4ae8.onrender.com";

const Predict = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [customSymptom, setCustomSymptom] = useState('');
    const [filteredSymptoms, setFilteredSymptoms] = useState(symptoms);
    const [customSymptoms, setCustomSymptoms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setPredictionData } = usePrediction();
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = symptoms.filter(symptom =>
            symptom.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSymptoms(filtered);
    }, [searchTerm]);

    const toggleSymptom = (symptom) => {
        setSelectedSymptoms(prev => {
            if (prev.includes(symptom)) {
                return prev.filter(s => s !== symptom);
            } else {
                return [...prev, symptom];
            }
        });
    };

    const addCustomSymptom = (e) => {
        e.preventDefault();
        if (customSymptom.trim()) {
            setCustomSymptoms(prev => [...prev, customSymptom.trim()]);
            setCustomSymptom("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        selectedSymptoms.forEach(symptom => {
            formData.append("symptoms", symptom);
        });
        formData.append("custom_symptoms", customSymptoms.join(","));

        try {
            const response = await fetch(`${HOST_URL}/predict`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            setPredictionData(data);
            navigate("/result");
        } catch (error) {
            console.error("Prediction error:", error);
            alert("Something went wrong with prediction.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Disease Prediction
                </h1>
                <p className="text-xl text-gray-600">
                    Select your symptoms or add custom ones for AI-powered analysis
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="space-y-6 mb-8">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search symptoms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                        />
                    </div>

                    <form onSubmit={addCustomSymptom} className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Add a custom symptom..."
                            value={customSymptom}
                            onChange={(e) => setCustomSymptom(e.target.value)}
                            className="flex-1 py-4 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                        />
                        <button
                            type="submit"
                            className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Add
                        </button>
                    </form>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Selected Symptoms ({selectedSymptoms.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedSymptoms.map(symptom => (
                            <div
                                key={symptom}
                                className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm"
                            >
                                {symptom}
                                <button
                                    onClick={() => toggleSymptom(symptom)}
                                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        {customSymptoms.map(symptom => (
                            <div
                                key={symptom}
                                className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-4 py-2 text-sm"
                            >
                                {symptom}
                                <button
                                    onClick={() => setCustomSymptoms(prev => prev.filter(s => s !== symptom))}
                                    className="ml-2 text-green-600 hover:text-green-800 focus:outline-none"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {filteredSymptoms.map(symptom => (
                            <button
                                key={symptom}
                                onClick={() => toggleSymptom(symptom)}
                                className={`p-3 text-left rounded-lg transition-all duration-200 ${selectedSymptoms.includes(symptom)
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {symptom}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={handleSubmit}
                        disabled={selectedSymptoms.length === 0 || isLoading}
                        className={`
                            w-full md:w-auto px-8 py-4 text-lg font-semibold text-white rounded-xl
                            ${selectedSymptoms.length === 0 || isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1'
                            }
                            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        `}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </div>
                        ) : (
                            'Get Prediction'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Predict;
