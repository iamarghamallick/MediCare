import React, { useEffect, useState } from 'react';

const HOST_URL = "https://medicare-4ae8.onrender.com";

const MedicalInfoSection = ({ disease }) => {
    const [data, setData] = useState({
        description: "Loading...",
        symptoms: [],
        treatment: [],
        medicines: [],
        rarity: "",
        criticality: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(`${HOST_URL}/generate_description`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ disease })
                });
                const json = await res.json();
                setData({
                    description: json.description,
                    symptoms: json.symptoms?.split(",").map(s => s.trim()) || [],
                    treatment: json.treatment?.split(",").map(s => s.trim()) || [],
                    medicines: json.medicines?.split(",").map(s => s.trim()) || [],
                    rarity: json.rarity,
                    criticality: json.criticality
                });
            } catch (err) {
                console.error(err);
                setError("Failed to fetch disease details.");
            } finally {
                setIsLoading(false);
            }
        };

        if (disease) fetchData();
    }, [disease]);

    const getRarityColor = (rarity) => {
        const colors = {
            common: "bg-green-100 text-green-800",
            uncommon: "bg-yellow-100 text-yellow-800",
            rare: "bg-red-100 text-red-800"
        };
        return colors[rarity] || "bg-gray-100 text-gray-800";
    };

    const getCriticalityColor = (criticality) => {
        const colors = {
            low: "bg-green-100 text-green-800",
            moderate: "bg-yellow-100 text-yellow-800",
            high: "bg-red-100 text-red-800",
            severe: "bg-purple-100 text-purple-800"
        };
        return colors[criticality] || "bg-gray-100 text-gray-800";
    };

    if (isLoading) {
        return (
            <div className="animate-pulse bg-white rounded-2xl shadow-lg p-8">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-red-800">
                <div className="flex items-center mb-4">
                    <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-6">
                <h3 className="text-2xl font-bold text-white">
                    Details of {disease}
                </h3>
            </div>

            {/* Content */}
            <div className="p-8">
                {/* Description */}
                <div className="mb-8">
                    <p className="text-gray-700 leading-relaxed">
                        {data.description}
                    </p>
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Symptoms */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Common Symptoms
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {data.symptoms.map((symptom, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-white rounded-full text-sm text-blue-600 border border-blue-200"
                                >
                                    {symptom.replace('_', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Treatment */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Treatment Options
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {data.treatment.map((treatment, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-white rounded-full text-sm text-green-600 border border-green-200"
                                >
                                    {treatment.replace(/[_()]/g, ' ')}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Medicines */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="h-5 w-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            Recommended Medicines
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {data.medicines.map((medicine, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-white rounded-full text-sm text-red-600 border border-red-200"
                                >
                                    {medicine.replace('_', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="h-5 w-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Disease Status
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Rarity</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(data.rarity)}`}>
                                    {data.rarity}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Criticality</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCriticalityColor(data.criticality)}`}>
                                    {data.criticality}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalInfoSection;
