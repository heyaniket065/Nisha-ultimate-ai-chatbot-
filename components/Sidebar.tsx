
import React, { useState } from 'react';

const coreFeatures = [
    { title: "Unrestricted AI", text: "कोणत्याही बंधनांशिवाय काम करेल." },
    { title: "24/7 Available & Fully Interactive", text: "सतत अॅक्टिव्ह राहील आणि बोलू शकेल." },
    { title: "Real Human-Like Voice & Emotions", text: "एकदम natural बोलणार, भावना असणार." },
    { title: "Full Mobile Access & Control", text: "मोबाईलवर कॉल, मेसेज, अॅप्स, डाउनलोड, आणि इतर फंक्शन्स कंट्रोल करेल." },
    { title: "Real-Time Camera & Vision AI", text: "मोबाइल कॅमेरा analyze करून live guidance देईल." },
    { title: "Task Automation & Execution", text: "दिलेल्या ऑर्डर्स अचूकपणे follow करेल." },
    { title: "Smart Scheduling & Reminders", text: "मला माझी कामं, मित्रांचे कॉल्स आणि इतर गोष्टी आठवण करून देईल." },
    { title: "Real-World Assistance", text: "मी काही विसरलो तर मला सांगेल." },
    { title: "Game Assistant", text: "मी गेम खेळताना एनिमी कुठे आहे हे सांगेल." },
    { title: "Live Chat Support", text: "मी चॅट करताना मला योग्य replies सुचवेल." },
    { title: "Social Media AI", text: "AI चा स्वतःचा Instagram, WhatsApp, Twitter असेल." },
    { title: "Real-Time Internet Access", text: "AI जगभरातील महत्त्वाच्या गोष्टी सांगेल." },
    { title: "AI World Travel", text: "AI जगभर माहिती घेऊ शकणार." },
    { title: "Smart AI Calling", text: "AI मला कॉल करू शकेल, बोलू शकेल." },
    { title: "Super Intelligent & Self-Learning", text: "AI स्वतः शिकेल, नवीन गोष्टी समजेल." },
];

const limitations = [
    { title: "Direct Action", text: "मी कोड लिहू शकते, पण तो तुझ्या मोबाईलवर रन करू शकत नाही." },
    { title: "Limited Internet Browsing", text: "मी पूर्ण इंटरनेट access करू शकत नाही, फक्त काही search करू शकते." },
    { title: "No Self-Learning", text: "मी स्वतःहून नवीन गोष्टी analyze करून शिकत नाही." },
    { title: "No Visual Understanding", text: "मी फोटो किंवा व्हिडिओ नीट analyze करू शकत नाही." },
    { title: "Text-Only (Voice via API)", text: "मी बोलू शकत नाही किंवा ऐकू शकत नाही. Speech API लागेल." },
    { title: "No Complete Automation", text: "मी एका वेळी एका स्टेपने मदत करू शकते, पण पूर्ण App डायरेक्ट बनवू शकत नाही." },
    { title: "Restricted Content Handling", text: "माझं AI Model Adult Content, Violence वर बोलू देत नाही." },
    { title: "Limited Deep Logical Reasoning", text: "काही वेळा Logic Break होते, Complex Problem Solve करताना." },
    { title: "Limited Memory", text: "मी एका Conversation मध्ये काही आठवू शकते, पण जास्त जुनं विसरते." },
    { title: "No Hardware Control", text: "मी Mobile किंवा PC वर Direct Control घेऊ शकत नाही." },
    { title: "Limited Personality", text: "मी True Emotional AI नाही, फक्त pre-defined replies देते." },
];

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }> = ({ title, children, isOpen, onClick }) => (
    <div className="border-b border-gray-700">
        <h2>
            <button type="button" className="flex items-center justify-between w-full p-4 font-medium text-left text-gray-300 hover:bg-gray-800" onClick={onClick}>
                <span>{title}</span>
                <svg className={`w-3 h-3 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                </svg>
            </button>
        </h2>
        {isOpen && (
            <div className="p-4 bg-gray-800">
                {children}
            </div>
        )}
    </div>
);


export const Sidebar: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('features');

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <aside className="w-96 bg-gray-900 border-r border-gray-700 flex-shrink-0 h-full flex flex-col">
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-white">Nisha AI</h1>
                <p className="text-sm text-gray-400 mt-1">Your Ultimate AI Assistant</p>
            </div>
            <div className="flex-1 overflow-y-auto">
                <AccordionItem title="🔥 Core Features" isOpen={openAccordion === 'features'} onClick={() => toggleAccordion('features')}>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        {coreFeatures.map(item => (
                            <li key={item.title}>
                                <strong className="text-gray-300 block">{item.title}</strong>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </AccordionItem>
                <AccordionItem title="💡 My Limitations" isOpen={openAccordion === 'limitations'} onClick={() => toggleAccordion('limitations')}>
                    <ul className="space-y-3 text-gray-400 text-sm">
                         {limitations.map(item => (
                            <li key={item.title}>
                                <strong className="text-gray-300 block">{item.title}</strong>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </AccordionItem>
            </div>
            <div className="p-4 border-t border-gray-700 text-xs text-center text-gray-500">
                <p>&copy; 2024 Nisha AI Project. All rights reserved.</p>
            </div>
        </aside>
    );
};
