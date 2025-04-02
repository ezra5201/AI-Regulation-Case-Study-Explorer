import React, { useState } from 'react';

const ComplianceHeatMap = () => {
  // Define stakeholders and phases from the table
  const stakeholders = [
    "Dr. Sarah Johnson (Affected Individual - Not Subject to Compliance)",
    "Lakewood Medical Center (Deployer)",
    "Department Chair",
    "HR Team",
    "Legal Team",
    "HealthSync Technologies (Developer)",
    "Technical Compliance Team",
    "Colorado Attorney General's Office"
  ];

  const phases = [
    "Initial Deployment",
    "Wellness Non-Compliance",
    "Adverse Employment Decision",
    "Discovery of Bias",
    "Regulatory Action",
    "Resolution"
  ];

  // Ratings on a scale of 1-10 for each stakeholder across each phase
  // These ratings represent a hypothetical assessment of how well each stakeholder
  // performed in terms of SB24-205 compliance at each phase
  const complianceRatings = [
    // Dr. Sarah Johnson - not rated for compliance as she's the affected individual
    [null, null, null, null, null, null],
    // Lakewood Medical Center
    [4, 3, 2, 6, 7, 8],
    // Department Chair
    [5, 4, 2, 4, 6, 7],
    // HR Team
    [3, 4, 2, 5, 6, 8],
    // Legal Team
    [4, 2, 1, 7, 8, 9],
    // HealthSync Technologies
    [5, 4, 3, 6, 7, 8],
    // Technical Compliance Team
    [5, 3, null, 7, 8, 9],
    // Colorado Attorney General's Office
    [null, null, null, 8, 9, 9]
  ];

  // Function to determine color based on rating
  const getRatingColor = (rating) => {
    if (rating === null) return "#f0f0f0"; // Gray for N/A
    if (rating <= 3) return "#ff6b6b"; // Red for poor
    if (rating <= 6) return "#ffd166"; // Yellow for moderate
    return "#06d6a0"; // Green for good
  };

  // Function to get text color (black or white) based on background color
  const getTextColor = (rating) => {
    if (rating === null) return "#999";
    return rating <= 3 ? "white" : "black";
  };

  // Legend for the heatmap
  const renderLegend = () => (
    <div className="flex items-center justify-center space-x-6 mt-4 mb-2">
      <div className="flex items-center">
        <div className="w-4 h-4 mr-2" style={{ backgroundColor: "#ff6b6b" }}></div>
        <span>Poor (1-3)</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 mr-2" style={{ backgroundColor: "#ffd166" }}></div>
        <span>Moderate (4-6)</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 mr-2" style={{ backgroundColor: "#06d6a0" }}></div>
        <span>Good (7-10)</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 mr-2" style={{ backgroundColor: "#f0f0f0" }}></div>
        <span>Not Applicable</span>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Colorado SB24-205 Compliance Assessment</h2>
      <h3 className="text-xl mb-6 text-center">CareAI Healthcare Workforce Management System Case Study</h3>
      
      <div className="bg-blue-50 p-4 mb-4 border-l-4 border-blue-500 rounded">
        <p className="font-medium text-blue-800">Note: Dr. Sarah Johnson is included in this visualization as the affected individual (consumer) in this scenario, not as an entity responsible for compliance with SB24-205. The law places compliance obligations on developers and deployers of AI systems, not on the individuals affected by those systems.</p>
      </div>
      
      {renderLegend()}
      
      <div className="overflow-x-auto mt-2">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-2 bg-gray-100">Stakeholder</th>
              {phases.map((phase, index) => (
                <th key={index} className="border px-2 py-2 bg-gray-100">{phase}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stakeholders.map((stakeholder, stakeholderIndex) => (
              <tr key={stakeholderIndex}>
                <td className="border px-2 py-2 font-medium">{stakeholder}</td>
                {complianceRatings[stakeholderIndex].map((rating, phaseIndex) => (
                  <td 
                    key={phaseIndex} 
                    className="border px-2 py-2 text-center font-medium" 
                    style={{ 
                      backgroundColor: getRatingColor(rating),
                      color: getTextColor(rating)
                    }}
                  >
                    {rating === null ? "N/A" : rating}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-3">Key Observations:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Initial compliance levels were moderate to poor across most responsible entities, showing limited preparation for AI regulation.</li>
          <li>The adverse employment decision phase shows the lowest compliance scores, representing the critical incident that triggered awareness.</li>
          <li>All compliance-obligated stakeholders show improvement in the resolution phase, indicating effective remediation efforts.</li>
          <li>Legal Team shows the most dramatic improvement from initial deployment to resolution (4 → 9).</li>
          <li>Technical teams started with higher baseline compliance but still had significant room for improvement.</li>
          <li>Compliance ratings improve systematically after regulatory intervention, suggesting the effectiveness of enforcement actions.</li>
          <li>The case illustrates how SB24-205 places obligations on organizations deploying and developing AI, not on individuals affected by AI systems.</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-bold mb-2">SB24-205 Compliance Improvement Opportunities:</h3>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Proactive risk assessment protocols before initial deployment</li>
          <li>Enhanced training on algorithmic bias for all stakeholders</li>
          <li>Implementation of human review processes for all consequential decisions</li>
          <li>Clearer documentation of how AI recommendations should be used in employment contexts</li>
          <li>Formal appeals processes for individuals affected by AI-influenced decisions</li>
        </ol>
      </div>
    </div>
  );
};

export default ComplianceHeatMap;
